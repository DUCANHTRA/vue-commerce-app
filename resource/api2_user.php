<?php
// Reference:
// https://www.leaseweb.com/labs/2015/10/creating-a-simple-rest-api-in-php/

error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Content-Type: application/json");

// get the HTTP method, path and body of the request
$method = $_SERVER['REQUEST_METHOD'];
$request = isset($_SERVER['PATH_INFO']) ? explode('/', trim($_SERVER['PATH_INFO'],'/')) : [];
$input = json_decode(file_get_contents('php://input'),true);  // json string to associative array(true)

// connect to the mysql database
$conn = mysqli_connect('', '', '', '');

mysqli_set_charset($conn,'utf8');

// initialise the table name accordingly
$table = "users";

// retrieve the search key field name and value from the path
$fld = preg_replace('/[^a-z0-9_]+/i','',array_shift($request));
$key = array_shift($request);

// retrieve the data to prepare set values
if (isset ($input))  {
    $columns = preg_replace('/[^a-z0-9_]+/i','',array_keys($input));
    $values = array_map(function ($value) use ($conn) {
        if ($value===null) return null;
        return mysqli_real_escape_string($conn,(string)$value);
    },array_values($input));
}

// create SQL
$sql = "select * from `$table`"; // Default query
switch ($method) {
  case 'POST':
    // Check if this is a login or registration request
    if (isset($input['email'])) {
      // Registration request
      // Check if username already exists
      $check_sql = "SELECT * FROM `$table` WHERE username = '".$input['username']."'";
      $check_result = mysqli_query($conn, $check_sql);
      
      if (mysqli_num_rows($check_result) > 0) {
        echo json_encode([
          'success' => false,
          'message' => 'Username already exists'
        ]);
        exit;
      }
      
      // Insert new user
      $sql = "INSERT INTO `$table` (username, email, password) VALUES (
        '".$input['username']."',
        '".$input['email']."',
        '".$input['password']."'
      )";
      
      if (mysqli_query($conn, $sql)) {
        echo json_encode([
          'success' => true,
          'message' => 'Registration successful'
        ]);
      } else {
        echo json_encode([
          'success' => false,
          'message' => 'Registration failed: ' . mysqli_error($conn)
        ]);
      }
      exit;
    } else {
      // Login request
      $sql = "select * from `$table` WHERE username='".$input['username']."' and password ='".$input['password']."'";
    }
    break;
  case 'GET':
    if (isset($_GET['user_id'])) {
      $sql = "select * from `$table` WHERE id='".$_GET['user_id']."'";
    }
    break;
  default:
    // Handle other methods or do nothing
    break;
}

// execute SQL statement
$result = mysqli_query($conn,$sql);
if ($result) {
    if ($method == 'POST' && !isset($input['email'])) {
      $user = mysqli_fetch_object($result);
      if ($user) {
          echo json_encode([
              'success' => true,
              'user' => $user
          ]);
      } else {
          echo json_encode([
              'success' => false,
              'message' => 'Invalid username or password'
          ]);
      }
    } else if ($method == 'GET') {
        if (mysqli_num_rows($result) == 0) {
            echo '[]';
        } else {
            echo json_encode(mysqli_fetch_object($result));
        }
    }
}

// close mysql connection
mysqli_close($conn);
?>
