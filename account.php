<?php
// Start the session
session_start();

// Initialize the first name
$firstName = "Guest";

if (isset($_SESSION['id'])) {
    // Establish a database connection (You should include your database credentials)
    $conn = new mysqli('localhost', 'root', '', 'test');

    // Check for a successful connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $userId = $_SESSION['id'];

    // Use a prepared statement to fetch the first name
    $sql = "SELECT firstName FROM registration WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $userId);

    if ($stmt->execute()) {
        $stmt->store_result();

        if ($stmt->num_rows > 0) {
            // Fetch the first name
            $stmt->bind_result($fetchedFirstName);
            $stmt->fetch();
            $firstName = $fetchedFirstName;
        } else {
            echo "No rows found for user ID: $userId";
        }
    } else {
        echo "Database query execution failed: " . $conn->error;
    }

    // Close the prepared statement
    $stmt->close();

    // Close the database connection
    $conn->close();
}

echo json_encode(['firstName' => $firstName]);

?>
