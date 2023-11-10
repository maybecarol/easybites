document.addEventListener('DOMContentLoaded', function() {
    // Get a reference to the usernamePlaceholder element
    const usernamePlaceholder = document.getElementById('usernamePlaceholder');

    // Function to fetch user's name
    function fetchUserName() {
        fetch('account.php')
            .then(response => response.json())
            .then(data => {
                // Log the fetched data for debugging
                console.log(data);

                // Update the usernamePlaceholder with the fetched name
                usernamePlaceholder.textContent = 'Welcome, ' + data.firstName + '!';
            })
            .catch(error => {
                console.error('Error fetching username:', error);
            });
    }

    // Attach the fetchUserName function to the "Account" link if it exists
    const accountLink = document.getElementById('accountLink'); // Replace with the actual ID of your "Account" link

    if (accountLink) {
        accountLink.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent the default link behavior
            fetchUserName();
        });
    }

    // Fetch the user's name when the page loads
    fetchUserName();
});
