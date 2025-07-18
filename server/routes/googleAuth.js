
const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const router = express.Router();
const EMAIL_DOMAIN = '@sece.ac.in';

// ✅ This route starts the OAuth flow
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    hd: 'sece.ac.in', // Optional: restrict to SECE domain
  })
);

// ✅ This handles the OAuth callback
router.get(
  '/google/callback',
  passport.authenticate('google', {
    session: false,
    failureRedirect: '/',
  }),
  (req, res) => {
    const userEmail = req.user.email.toLowerCase().trim();

    if (!userEmail.endsWith(EMAIL_DOMAIN)) {
      return res.status(403).send('Only @sece.ac.in emails are allowed');
    }

    const token = jwt.sign({ userId: req.user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    const user = {
      name: req.user.name,
      email: req.user.email,
    };

    const userEncoded = encodeURIComponent(JSON.stringify(user));

    res.redirect(`http://localhost:5173/oauth-success?token=${token}&user=${userEncoded}`);
  }
);

module.exports = router;
