const User = require('../models/User');

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const user = await User.findOne({ email });
        if (!user || user.password !== password) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        
        return res.status(200).json({
            message: 'Login successful',
            user: { id: user._id, name: user.name, email: user.email, role: user.role }
        });
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.studentLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const user = await User.findOne({ email, role: 'student' });
        // Instead of strict role checking (since they may not have roles seeded properly), we can just check email/password, but let's strictly check role for accuracy.
        if (!user || user.password !== password) {
            return res.status(401).json({ message: 'Invalid student credentials' });
        }
        
        return res.status(200).json({
            message: 'Student login successful',
            user: { id: user._id, name: user.name, email: user.email, role: user.role }
        });
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.companyLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const user = await User.findOne({ email, role: 'company' });
        if (!user || user.password !== password) {
            return res.status(401).json({ message: 'Invalid company credentials' });
        }
        
        return res.status(200).json({
            message: 'Company login successful',
            user: { id: user._id, name: user.name, email: user.email, role: user.role }
        });
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};
