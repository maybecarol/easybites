<?php
// Include your database connection code here

// Check if the request is a POST request
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get the user ID and recipe ID from the request
    $user_id = $_POST['user_id']; // Replace with how you retrieve the user ID (e.g., from session)
    $recipe_id = $_POST['recipe_id']; // Replace with how you retrieve the recipe ID from the frontend

    // Insert the favorite recipe into the database
    $stmt = $conn->prepare("INSERT INTO fav_recipes (user_id, recipe_id) VALUES (?, ?)");
    $stmt->bind_param("ii", $user_id, $recipe_id);

    if ($stmt->execute()) {
        // Favorite recipe added successfully
        echo json_encode(['message' => 'Favorite recipe added successfully']);
    } else {
        // Error adding favorite recipe
        echo json_encode(['error' => 'Failed to add favorite recipe']);
    }

    $stmt->close();
    $conn->close();
}
?>
