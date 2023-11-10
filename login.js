/* async function hash(string) {
  const hashBuffer = await CryptoJS.SHA256(string);
  return Array.from(new Uint32Array(hashBuffer.words))
    .map((word) => word.toString(16).padStart(8, '0'))
    .join('');
}

async function loginFormSubmit(event) {
  //event.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const hashedPassword = await hash(password);
  console.log(username, password);
  try {
    // Encode the username and hashedPassword for inclusion in the URL
    const encodedUsername = encodeURIComponent(username);
    const encodedPassword = encodeURIComponent(password);
  
    // Construct the URL with query parameters
    const url = `/login?username=${encodedUsername}&password=${encodedPassword}`;
  
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.status === 200) {
      // Successful GET request handling
      window.location.href = '/redirect';
    } else {
      const data = await response.text();
      // Handle errors as needed
    }
  } catch (error) {
    console.error('Error:', error);
  }  
}
//document.getElementById('loginForm').addEventListener('submit', loginFormSubmit);
 */