const User = require('../models/user')
const { hashPassword, comparePassword } = require('../helpers/auth')
const jwt = require('jsonwebtoken')

const test = (req, res) => {
	res.json('test is working')
}
const registerUser = async (req, res) => {
	try {
		const { name, email, password } = req.body

		if (!name) {
			return res.json({
				error: 'Name is required',
			})
		}

		if (!password || password.length < 6) {
			return res.json({
				error: 'Password is required and should be at least 6 characters long',
			})
		}

		const exist = await User.findOne({ email })

		if (exist) {
			return res.json({
				error: 'Email is taken already',
			})
		}

		const hashedPassword = await hashPassword(password)

		const user = await User.create({
			name,
			email,
			password: hashedPassword,
		})

		return res.json(user)
	} catch (error) {
		console.log(error)
	}
}

const loginUser = async (req,res)=>{
	try {
		const {email, password} = req.body

		const user = await User.findOne({email})
		if(!user){
			return res.json({
				error:'No user found'
			})
		}

		const match = await comparePassword(password,user.password)
		if(match){
			jwt.sign({email:user.email,id:user._id,name:user.name,role:user.role},process.env.JWT_SECRET,{},(err,token)=>{
				if(err)throw err
				res.json({token})
			})
		}
		if(!match){
			res.json({
				error:'Passwords do not match'
			})
		}
	} catch (error) {
		console.log(error);
	}
}

const getProfile = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: "Unauthorized. No user found." });
        }

        res.json({
            id: req.user._id,
            name: req.user.name,
            email: req.user.email,
            createdAt: req.user.createdAt
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const logoutUser = (req, res) => {
    res.status(200).json({ message: "Logged out successfully" });
};


const editUser = async (req, res) => {
    try {
        const { name, email } = req.body;
        const userId = req.user?.id;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        user.name = name || user.name;
        user.email = email || user.email;
        await user.save();

        res.json({ message: "User profile updated successfully", user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports = {
	editUser,
	test,
	registerUser,
	loginUser,
	getProfile,
	logoutUser,
}
