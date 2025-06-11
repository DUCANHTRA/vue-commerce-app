<?php

// Extract HTTP method and parameters
$method = $_SERVER['REQUEST_METHOD'];

//Parse error: syntax error, unexpected '?'
//URL /api1.php/id/123 → $request = ['id', '123'].
$request = explode('/', trim(isset($_SERVER['PATH_INFO']) ? $_SERVER['PATH_INFO'] : '', '/'));

// Parse JSON body
$input = json_decode(file_get_contents('php://input'), true);

// DB connection
$conn = mysqli_connect('', '', '', '');
mysqli_set_charset($conn, 'utf8');

if (!$conn) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Database connection failed']);
    exit();
}

// Table and key
$table = 'products';
$fld = preg_replace('/[^a-z0-9_]+/i', '', array_shift($request));
$key = array_shift($request);

// Build column=value SET string
if (isset($input)) {
    $columns = array_map(function ($k) {
        return preg_replace('/[^a-z0-9_]+/i', '', $k);
    }, array_keys($input));

    $values = array_map(function ($v) use ($conn) {
        return $v === null ? null : mysqli_real_escape_string($conn, (string)$v);
    }, array_values($input));

    $set = '';
    for ($i = 0; $i < count($columns); $i++) {
        $set .= ($i > 0 ? ',' : '') . "`{$columns[$i]}`=" . ($values[$i] === null ? 'NULL' : "'{$values[$i]}'");
    }
}

// Main SQL logic
switch ($method) {
    case 'GET':
        $sql = "SELECT * FROM `$table`" . ($key ? " WHERE `$fld`='$key'" : '');
        break;

    case 'POST':
        $sql = "INSERT INTO `$table` SET $set";
        break;

    case 'PUT':
        $sql = "UPDATE `$table` SET $set WHERE `$fld`='$key'";
        break;

    case 'DELETE':
        if (!$key) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'Product ID is required for deletion']);
            exit();
        }

        // Check if product exists before deleting
        $check = mysqli_query($conn, "SELECT id FROM `$table` WHERE `$fld`='$key'");
        if (!$check || mysqli_num_rows($check) === 0) {
            http_response_code(404);
            echo json_encode(['success' => false, 'message' => 'No product found with the specified ID']);
            exit();
        }

        // First delete related likes
        $delete_likes = mysqli_query($conn, "DELETE FROM product_likes WHERE product_id='$key'");
        if (!$delete_likes) {
            http_response_code(500);
            echo json_encode(['success' => false, 'message' => 'Failed to delete related likes: ' . mysqli_error($conn)]);
            exit();
        }

        // Then delete the product
        $sql = "DELETE FROM `$table` WHERE `$fld`='$key'";
        break;

    default:
        http_response_code(405);
        echo json_encode(['success' => false, 'message' => 'Method not allowed']);
        exit();
}

// Run SQL
$result = mysqli_query($conn, $sql);

if ($result) {
    if ($method === 'GET') {
        $rows = [];
        while ($row = mysqli_fetch_object($result)) {
            $rows[] = $row;
        }
        echo json_encode($rows);
    } elseif ($method === 'POST') {
        echo json_encode(['success' => true, 'id' => mysqli_insert_id($conn)]);
    } else {
        $affected = mysqli_affected_rows($conn);
        echo json_encode([
            'success' => $affected > 0,
            'affected_rows' => $affected,
            'message' => $affected > 0 ? 'Operation successful' : 'No changes made'
        ]);
    }
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Query failed: ' . mysqli_error($conn)]);
}

mysqli_close($conn);
?>
