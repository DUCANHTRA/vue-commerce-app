<?php
// Reference:
// https://www.leaseweb.com/labs/2015/10/creating-a-simple-rest-api-in-php/

// get the HTTP method, path and body of the request
$method = $_SERVER['REQUEST_METHOD'];
$request = explode('/', trim(isset($_SERVER['PATH_INFO']) ? $_SERVER['PATH_INFO'] : '', '/'));

//POST Input
$input = json_decode(file_get_contents('php://input'),true);

//Connect to the mysql database
$conn = mysqli_connect('', '', '', '');

if (!$conn) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Database connection failed']);
    exit();
}

mysqli_set_charset($conn,'utf8');

//Initialise the table name accordingly
$table = "product_likes";

// retrieve the search key field name and value from the path
$fld = preg_replace('/[^a-z0-9_]+/i','',array_shift($request));
$key = array_shift($request);

// retrieve the data to prepare set values
if (isset ($input))  {
    $columns = preg_replace('/[^a-z0-9_]+/i','',array_keys($input));
    
    //Extract Column name and values from POST Request
    $values = array_map(function ($value) use ($conn) {
        if ($value===null) return null;
        return mysqli_real_escape_string($conn,(string)$value);
    },array_values($input));

    //POST Input --> Build SQL String
    $set = '';
    for ($i=0;$i<count($columns);$i++) {
        $set.=($i>0?',':'').'`'.$columns[$i].'`=';
        $set.=($values[$i]===null?'NULL':'"'.$values[$i].'"');
    }
}

// create SQL based on HTTP method
switch ($method) {
    case 'GET':
        $sql = "SELECT * FROM `$table`".($key ? " WHERE $fld='$key'" : ''); 
        break;
    case 'POST':
        // For likes, we'll increment the likes_count
        if (isset($input['product_id'])) {
            $product_id = mysqli_real_escape_string($conn, $input['product_id']);
            // Check if product exists in likes table
            $check_sql = "SELECT * FROM `$table` WHERE product_id = '$product_id'";
            $check_result = mysqli_query($conn, $check_sql);
            
            //Error handling for product existence check
            if (!$check_result) {
                http_response_code(500);
                echo json_encode(['success' => false, 'message' => 'Error checking product existence: ' . mysqli_error($conn)]);
                exit();
            }
            
            if (mysqli_num_rows($check_result) > 0) {
                // Product exists, increment likes
                $sql = "UPDATE `$table` SET likes_count = likes_count + 1 WHERE product_id = '$product_id'";
            } else {
                // Product doesn't exist, create new entry with 0 likes
                $sql = "INSERT INTO `$table` (product_id, likes_count) VALUES ('$product_id', 0)";
            }
        } else {
            $sql = "INSERT INTO `$table` SET $set";
        }
        break;
    case 'PUT':
        $sql = "UPDATE `$table` SET $set WHERE ".($key ? "$fld='$key'" : "0=1"); 
        break;
    case 'DELETE':
        $sql = "DELETE FROM `$table` WHERE ".($key ? "$fld='$key'" : "0=1"); 
        break;
    default:
        http_response_code(405);
        echo json_encode(['success' => false, 'message' => 'Method not allowed']);
        exit();
}

// execute SQL query statement
$result = mysqli_query($conn, $sql);

if (!$result) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Query failed: ' . mysqli_error($conn)]);
    exit();
}

//Return Result
if ($method == 'GET') {
    $rows = [];
    while ($row = mysqli_fetch_object($result)) {
        $rows[] = $row;
    }
    echo json_encode($rows);
} elseif ($method == 'POST') {
    if (isset($input['product_id'])) {
        // For likes update, return the new count
        $product_id = mysqli_real_escape_string($conn, $input['product_id']);
        $count_query = "SELECT likes_count FROM `$table` WHERE product_id = '$product_id'";
        $count_result = mysqli_query($conn, $count_query);
        if ($count_row = mysqli_fetch_object($count_result)) {
            echo json_encode(['success' => true, 'likes_count' => $count_row->likes_count]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Failed to get updated likes count']);
        }
    } else {
        echo json_encode(['success' => true, 'id' => mysqli_insert_id($conn)]);
    }
} else {
    echo json_encode(['success' => true, 'affected_rows' => mysqli_affected_rows($conn)]);
}

// close mysql connection
mysqli_close($conn);
?> 