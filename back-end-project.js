const express = require('express');
const axios = require('axios');

const app = express();

// Get all books – Using async callback function
app.get('/books', async (req, res) => {
  const response = await axios.get('https://www.googleapis.com/books/v1/volumes');

  res.json(response.data);
});

// Search by ISBN – Using Promises
app.get('/books/isbn/:isbn', async (req, res) => {
  const isbn = req.params.isbn;

  const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=<span class="math-inline">\{isbn\}\`\);
res\.json\(response\.data\);
\}\);
// Search by Author – Using Promises
app\.get\(\'/books/author/\:author\', async \(req, res\) \=\> \{
const author \= req\.params\.author;
const response \= await axios\.get\(\`https\://www\.googleapis\.com/books/v1/volumes?q\=</span>{author}`);

  res.json(response.data);
});

// Search by Title – Using Promises
app.get('/books/title/:title', async (req, res) => {
  const title = req.params.title;

  const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${title}`);

  res.json(response.data);
});

// Get book Review
app.get('/books/review/:userId/:reviewId', async (req, res) => {
  const { userId, reviewId } = req.params;

  const bookReview = await BookReview.findOne({
    reviewer_id: userId,
    review_id: reviewId
  });

  if (!bookReview) {
    res.status(404).json({ message: 'Book review not found' });
    return;
  }

  try {
    res.json({ message: 'Book review found', bookReview });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Register New user – Using Promises
app.post('/users', async (req, res) => {
  const { name, email, password } = req.body;

  const newUser = new User({
    name,
    email,
    password
  });

  try {
    await newUser.save();
    res.json({ message: 'User created', newUser });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Login as a Registered user – Using Promises
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    email,
    password
  });

  if (!user) {
    res.status(401).json({ message: 'Invalid credentials' });
    return;
  }

  res.json({ message: 'User logged in', user });
});

// Add/Modify a book review – Using Promises
app.put('/books/review/:userId/:reviewId', async (req, res) => {
  const { userId, reviewId, review_title, review_text } = req.body;

  const bookReview = await BookReview.findOne({
    reviewer_id: userId,
    review_id: reviewId
  });

  if (!bookReview) {
    res.status(404).json({ message: 'Book review not found' });
    return;
  }

  try {
    bookReview.review_title = review_title;
    bookReview.review_text = review_text;
    await bookReview.save();
    res.json({ message: 'Book review updated', bookReview });
  } catch (err) {
    res.status(500).json(err);
  }
