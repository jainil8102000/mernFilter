const express = require('express');
const connectDB = require('./config/db');
const app = express();

//Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

// IGNORE app.use(express.static('public'))
app.get('/', (req, res) => res.send('API Running'))

//Define Routes
app.use('/api/users', require('./routes/api/users'))
app.use('/api/auth', require('./routes/api/auth'))
app.use('/api/profile', require('./routes/api/profile'))
app.use('/api/posts', require('./routes/api/post'))
app.use('/api/news', require('./routes/api/news'))


const PORT = process.env.PORT || 5000;


app.listen(PORT, () => console.log(`server started on ${PORT}`));