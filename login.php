<?php
// Get user input
$email = $_POST['email'];
$password = $_POST['password'];

// Database connection
$conn = new mysqli('localhost', 'root', '', 'test');
if ($conn->connect_error) {
    echo "$conn->connect_error";
    die("Connection Failed: " . $conn->connect_error);
} else {
    // Check if the user exists in the database
    $stmt = $conn->prepare("SELECT id, password FROM registration WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();
    $stmt->close();

    if ($result->num_rows === 1) {
        // User with the provided email exists
        $user = $result->fetch_assoc();
    
        // Verify the password
        if ($password === $user['password']) {
            // Passwords match, user is authenticated
            session_start();
            $_SESSION['id'] = $user['id']; // Set the user's ID in the session
            // Redirect to a protected page or home page
            header("Location: search.html");
            exit;
        } else {
            echo "Invalid password";
        }
    } else {
        echo "User not found";
    }    

    $conn->close();
}
?>