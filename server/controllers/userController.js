const User = require('../models/User');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ _id: { $ne: req.user.userId } }).select('name email');
    res.json(users);
  } catch (err) {
    console.error('Error fetching users:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.sendFriendRequest = async (req, res) => {
  try {
    const fromUserId = req.user.userId; // set from middleware
    const toUserId = req.params.id;

    console.log("👉 From:", fromUserId, "👉 To:", toUserId); // DEBUG line

    const fromUser = await User.findById(fromUserId);
    const toUser = await User.findById(toUserId);

    if (!fromUser || !toUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (toUser.friendRequests.includes(fromUserId)) {
      return res.status(400).json({ message: 'Friend request already sent' });
    }

    toUser.friendRequests.push(fromUserId);
    await toUser.save();

    res.status(200).json({ message: 'Friend request sent successfully' });
  } catch (err) {
    console.error('Send Friend Request Error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};
exports.getFriendRequests = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId)
      .populate('friendRequests', 'name email'); // ✅ Important
    res.json(user.friendRequests); // ✅ Sends populated friend request users
  } catch (err) {
    console.error('Get Friend Requests Error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.acceptFriendRequest = async (req, res) => {
  try {
    const currentUser = await User.findById(req.user.userId);
    const fromUser = await User.findById(req.params.id);

    if (!fromUser || !currentUser.friendRequests.includes(fromUser._id)) {
      return res.status(400).json({ message: 'No such request' });
    }

    currentUser.friends.push(fromUser._id);
    fromUser.friends.push(currentUser._id);

    currentUser.friendRequests = currentUser.friendRequests.filter(
      (id) => id.toString() !== fromUser._id.toString()
    );

    await currentUser.save();
    await fromUser.save();

    res.status(200).json({ message: 'Friend request accepted' });
  } catch (err) {
    console.error('Accept Friend Request Error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};
exports.getSentRequests = async (req, res) => {
  try {
    const allUsers = await User.find();
    const sentRequests = allUsers
      .filter(user => user.friendRequests.includes(req.user.userId))
      .map(user => user._id.toString());

    res.json(sentRequests); // return array of user IDs that received the request
  } catch (err) {
    console.error('Get Sent Requests Error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getFriends = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).populate('friends', 'name email');
    res.json(user.friends);
  } catch (err) {
    console.error('Get Friends Error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};