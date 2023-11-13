const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());


const secretKey = 'mySecretKey';


const users = [
  {
    id: 1,
    username: 'user123',
    password: 'password123',
  },
];

app.post('/users/login', (req, res) => {
  const { username, password } = req.body;

  // Find the user by username and check the password
  const user = users.find((user) => user.username === username);

  if (!user || user.password !== password) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  // Create a JWT token
  const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });

  res.json({ token });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});



export {}
