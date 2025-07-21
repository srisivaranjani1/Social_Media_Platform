require('dotenv').config();
const express = require('express');
const cors = require('cors');
const passport = require('passport'); // ✅ Make sure passport is explicitly required
const connectDB = require('./config/db');
require('./config/passport'); // ✅ Loads passport strategy

const app = express();

// ✅ Connect to MongoDB
connectDB();

// ✅ Middleware
app.use(cors());
app.use(express.json());
app.use(passport.initialize()); // ✅ Required for Passport to work

app.use((req, res, next) => {
  console.log(`[REQ] ${req.method} ${req.url}`);
  next();
});

// ✅ Routes
app.use('/api', require('./routes/auth'));
app.use('/api/auth', require('./routes/googleAuth'));
app.use('/api', require('./routes/userRoutes'));


// ✅ Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
