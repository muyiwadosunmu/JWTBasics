// 1. Check username, password in post(login) request
// 2. if exist create new JWT
// 3. Send back to front-end
// 4. Setup authentication so only the request with JWT can access the dashboard
const jwt = require("jsonwebtoken");
const {BadRequest} = require("../errors/badRequest");

const login = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        throw new BadRequest("Please provide Email and/or Password", 400);
    }
    // Try to keep payload small, better experience for user
    const token = jwt.sign({ username }, process.env.JWT_SECRET_KEY, {
        expiresIn: "30d",
    });
    // We could check our data validations using
    // 1. Mongoose validations
    // 2. Joi -  a package
    // 3. Check in and with the Controller
    res.status(200).json({ msg: `User, ${username} is created`, token });
};

const dashboard = async (req, res) => {
    const luckyNumber = Math.floor(Math.random() * 100);
    res
        .status(200)
        .json({
            msg: `Hello, ${req.user.username}`,
            secret: `Here is our authorized data, your lucky number is ${luckyNumber}`,
        });
};

module.exports = {
    login,
    dashboard,
};
