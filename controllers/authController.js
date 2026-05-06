const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


exports.register = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const user = new User({
            username: req.body.username,
            password: hashedPassword
        });

        await user.save();
        res.json({message: "User registered"});


    } catch (err) {
        res.status(500).json({ error: err.message});
    }
};

exports.login = async (req, res) => {
    try {
        const user = await User.findOne ({ username: req.body.username });

        if (!user) {
            return res.status(400).json({message: "User not found"});
        }

        const isMatch = await bcrypt.compare(req.body.password, user.password);

        if (!isMatch) {
            return res.status(400).json({message: "Invalid Password"});
        }

        const token = jwt.sign(
            { id: user._id },
            "SECRET_KEY",
            { expiresIn: "1h"}
        );

        res.json ({ token });

    } catch (err) {
        res.status(500).json({error: err.message});
    }
};