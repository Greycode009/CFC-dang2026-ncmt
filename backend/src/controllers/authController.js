import User from "../models/userModel.js";


async function register(req, res) {
    try {
        const { fullName, email, phoneNumber, password, } = req.body;

        if(!fullName || !email || !phoneNumber || !password) {
            return res.status(400).json({ 
                message: "Please provide all required fields" 
            });
        }

        const existingUser = await User.findOne({ 
            where: 
            { 
                username
            } 
        });

        if (existingUser) {
            return res.status(400).json({ 
                message: "Username already exists" 
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            fullName,
            email,
            phoneNumber,
            password: hashedPassword
        });

    }catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({ 
            message: "Internal server error" 
        });
    }
}


export {
    register
}