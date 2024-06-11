const express = require('express');
const cors = require('cors');
const connectDB = require('./src/dbConfig/connect');
const app = express();
const User = require('./src/schema/schema');
const AdminUpi=require('./src/schema/schema')
app.use(express.json());
app.use(cors()); // Enable CORS for all routes

connectDB();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/user', async (req, res) => {
    try {
        const { username, phoneNumber, amount } = req.body;
        const newUser = new User({
            username,
            phoneNumber,
            amount
        });
        await newUser.save();
        res.json({ message: "New user created", userId: newUser._id, user: newUser });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error" });
    }
});

app.post('/user/:id/bet', async (req, res) => {
    try {
        const { id } = req.params;
        const { Betamount, number } = req.body;
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        user.Betamount = Betamount;
        user.number = number;
        await user.save();
        res.json({ message: "Bet amount and number updated", user });
    } catch (err) {
        console.error('Error updating bet:', err);
        res.status(500).json({ message: "Server error" });
    }
});

app.get('/check-winner', async (req, res) => {
    try {
        const winningPhoneNumber = '+918791862428';
        const winningUser = await User.findOne({ phoneNumber: winningPhoneNumber });

        if (!winningUser) {
            return res.status(404).json({ message: "Winning user not found" });
        }

        const winningNumber = winningUser.number;
        const winningUsers = await User.find({ number: winningNumber, phoneNumber: { $ne: winningPhoneNumber } });

        if (winningUsers.length > 0) {
            res.json({ message: "You won", winners: winningUsers });
        } else {
            res.json({ message: "No winners found" });
        }
    } catch (err) {
        console.error('Error checking winner:', err);
        res.status(500).json({ message: "Server error" });
    }
});

//100 amount to be submitted

app.post('/user/:id/amount', async (req, res) => {
    try {
        const { id } = req.params;
        const { amount, utrNumber } = req.body;
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        user.amount = amount;
        user.utrNumber = utrNumber;
        user.status = 'Waiting for approval';
        await user.save();
        res.json({ message: "Amount and UTR Number updated", user });
    } catch (err) {
        console.error('Error updating amount:', err);
        res.status(500).json({ message: "Server error" });
    }
});

app.get('/allusers', async (req, res) => {
    try {
        const users = await User.find({}, 'username phoneNumber Betamount number');
        res.json(users);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error" });
    }
});
app.post('/admin/upiid', async (req, res) => {
    try {
        const { upiId } = req.body;

        // Check if there is already an admin UPI ID document
        let adminUpi = await AdminUpi.findOne();

        if (!adminUpi) {
            adminUpi = new AdminUpi({ upiId });
        } else {
            adminUpi.upiId = upiId;
        }

        await adminUpi.save();
        res.json({ message: "Admin UPI ID saved successfully", adminUpi });
    } catch (err) {
        console.error('Error saving Admin UPI ID:', err);
        res.status(500).json({ message: "Server error" });
    }
});
// Route to get UPI ID
app.get('/admin/upiid', async (req, res) => {
    try {
        const adminUpi = await AdminUpi.findOne();

        if (!adminUpi) {
            return res.status(404).json({ message: "Admin UPI ID not found" });
        }

        res.json({ upiId: adminUpi.upiId });
    } catch (err) {
        console.error('Error fetching Admin UPI ID:', err);
        res.status(500).json({ message: "Server error" });
    }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});