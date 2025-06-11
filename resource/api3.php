<?php

// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Database connection
$conn = mysqli_connect('', '', '', '');
mysqli_set_charset($conn,'utf8');

if (!$conn) {
    error_log("Database connection failed: " . mysqli_connect_error());
    http_response_code(500);
    echo json_encode(array(
        "success" => false,
        "error" => "Database connection failed",
        "message" => mysqli_connect_error()
    ));
    exit();
}

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Handle GET request
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Get request parameters
    $category = null;
    if (isset($_GET['category'])) {
        $category = mysqli_real_escape_string($conn, $_GET['category']);
    }
    
    $limit = null;
    if (isset($_GET['limit'])) {
        $limit = (int)$_GET['limit'];
    }
    
    $categories = false;
    if (isset($_GET['categories']) && $_GET['categories'] === 'true') {
        $categories = true;
    }

    // Log request parameters
    $categoryLog = 'null';
    if (isset($category)) {
        $categoryLog = $category;
    }
    
    $limitLog = 'null';
    if (isset($limit)) {
        $limitLog = $limit;
    }
    
    $categoriesLog = 'false';
    if ($categories) {
        $categoriesLog = 'true';
    }
    
    error_log("Request parameters - category: " . $categoryLog . ", limit: " . $limitLog . ", categories: " . $categoriesLog);

    // Build SQL query
    if ($categories) {
        $sql = "SELECT DISTINCT category FROM products ORDER BY category";
    } else if ($category) {
        $sql = "SELECT * FROM products WHERE category = '$category'";
        if ($limit) {
            $sql .= " LIMIT $limit";
        }
    } else {
        $sql = "SELECT * FROM products";
        if ($limit) {
            $sql .= " LIMIT $limit";
        }
    }

    error_log("Executing SQL query: " . $sql);
    $result = mysqli_query($conn, $sql);
    
    if ($result) {
        $data = array();
        while ($row = mysqli_fetch_assoc($result)) {
            $data[] = $row;
        }
        
        error_log("Query returned " . count($data) . " rows");
        
        if (empty($data)) {
            $message = "No products found for this category";
            if ($categories) {
                $message = "No categories found";
            }
            echo json_encode(array(
                "success" => true,
                "data" => array(),
                "message" => $message
            ));
        } else {
            echo json_encode(array(
                "success" => true,
                "data" => $data
            ));
        }
    } else {
        error_log("Error in api3.php: " . mysqli_error($conn));
        http_response_code(500);
        echo json_encode(array(
            "success" => false,
            "error" => "Query failed",
            "message" => mysqli_error($conn)
        ));
    }
} else {
    http_response_code(405);
    echo json_encode(array(
        "success" => false,
        "error" => "Method not allowed",
        "message" => "Only GET requests are allowed"
    ));
}

mysqli_close($conn);
?> 