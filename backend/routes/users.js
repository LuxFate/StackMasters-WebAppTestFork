// routes/users.js
const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users');
const authenticateToken = require('../middleware/auth');
const checkRole = require('../middleware/role');
const { exportMarksToExcel } = require('../models/marks'); //for marks

// Create a new user
router.post('/create', usersController.create);

// Read all users
router.get('/users', authenticateToken, checkRole(['admin']), usersController.read);

// Update a user
router.put('/update/:id', authenticateToken, checkRole(['admin']), usersController.update);

// Delete a user
router.delete('/delete/:id', authenticateToken, checkRole(['admin']), usersController.delete);

// Login
router.post('/login', usersController.login);

// Example protected route
//will send users to their soecific dashboard content
// Protected route example (only accessible by logged-in users)
router.get('/dashboard', authenticateToken, checkRole(['admin', 'lecturer', 'student']), (req, res) => {
    if (req.user.role === 'admin') {
        res.send('Admin Dashboard Content');
    } else if (req.user.role === 'lecturer') {
        res.send('Lecturer Dashboard Content');
    } else if (req.user.role === 'student') {
        res.send('Student Dashboard Content');
    } else {
        res.status(403).send('Access denied');
    }
});
// Route to get marks exported
//admin and lecturer can export marks
router.get('/exportMarks', authenticateToken, checkRole(['admin', 'lecturer']), async (req, res) => {
    try {
        await exportMarksToExcel(res);
    } catch (error) {
        res.status(500).send('Error exporting marks data.');
    }
});

module.exports = router;
