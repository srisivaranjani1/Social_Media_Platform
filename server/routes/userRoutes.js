const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
//const { getFriendRequests } = require('../controllers/userController');
const {
  getAllUsers,
  sendFriendRequest,
  getFriendRequests,
  acceptFriendRequest,
  getSentRequests,
  getFriends
} = require('../controllers/userController');

router.get('/users', authMiddleware, getAllUsers);
router.post('/send-request/:id', authMiddleware, sendFriendRequest);
router.get('/friend-requests', authMiddleware, getFriendRequests);
router.post('/accept-request/:id', authMiddleware, acceptFriendRequest);
router.get('/sent-requests', authMiddleware, getSentRequests);
router.get('/friends', authMiddleware, getFriends);

module.exports = router;

