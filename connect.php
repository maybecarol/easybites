<?php
$firstName = $_POST['firstName'];
$lastName = $_POST['lastName'];
$gender = $_POST['gender'];
$email = $_POST['email'];
$password = $_POST['password'];
$number = $_POST['number'];

// Database connection
$conn = new mysqli('localhost','root','','test');
if($conn->connect_error){
    echo "$conn->connect_error";
    die("Connection Failed : ". $conn->connect_error);
} else {
    $stmt = $conn->prepare("insert into registration(firstName, lastName, gender, email, password, number) values(?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("sssssi", $firstName, $lastName, $gender, $email, $password, $number);
    $execval = $stmt->execute();
    
    // Check if registration was successful and then redirect
    if($execval) {
        // Replace 'login.html' with the actual login page URL.
        header("Location: signup.html");
        exit; // Make sure to exit to prevent further script execution.
    } else {
        echo "Registration failed...";
    }
    
    $stmt->close();
    $conn->close();
}
?>
