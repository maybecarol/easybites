/* const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
const knex = require('knex'); // Import the Knex library

// Use middleware to parse JSON in the request body
app.use(bodyParser.json());

const db = knex({
  client: 'better-sqlite3',
  connection: {
    filename: 'users.db'
  },
  useNullAsDefault: true
});

router.get('/login.html', async (req, res) => {
  // Extract username and hashedPassword from the query parameters
  const { username, password } = req.query;

  if (!username || !password) {
    return res.status(400).json({ error: 'Missing username or hashedPassword in query parameters' });
  }

  console.log(username, password);

  try {
    const user = await db('users').where('username', username).first();

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (password === user.password) {
      // Update the session or return a success message as needed
      // For demonstration, this sends a success response
      return res.status(200).json({ message: 'Login successful' });
    }

    return res.status(401).json({ error: 'Invalid password' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Login failed' });
  }
});

app.use(router);

app.listen(5501, () => {
  console.log('Running on port 5501');
});
 */