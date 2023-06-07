const User = require("../model/user.model");
const jwt = require("express-jwt");

exports.getUsers = async (req, res) => {
  try {
    console.log("user");
    const user = await User.find({});
    res.json({ data: user }).status(200);
  } catch (e) {
    console.log(e);
    res.json({ error: `Error Occured, ${e}` }).status(500);
  }
};

exports.getUser = async (req, res) => {
  try {
    const { _id } = req.body;
    const user = await User.findOne({ _id: _id });
    res.json({ data: user }).status(200);
  } catch (e) {
    console.log(e);
    res.json({ error: `Error Occured, ${e}` }).status(500);
  }
};

exports.registerUser = async (req, res) => {
  try {
    const { name, contact, password, email } = req.body;
    console.log("contact");
    const userAlready = await User.findOne({
      email,
    });

    if (userAlready) {
      return res.json({ error: `User Already Found` }).status(403);
    }

    const user = await new User({
      name: name,
      contact,
      password,
      email,
    }).save();

    res.json({ data: user }).status(200);
  } catch (e) {
    console.log(e);
    res.json({ error: `Error Occured, ${e}` }).status(500);
  }
};

exports.loginUser = async (req, res) => {
  try {
    const secretKey = "123456-1234567";
    const { password, email } = req.body;
    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res.json({ error: `User Not Found` }).status(404);
    }

    if (!user.authentication(password)) {
      return res.json({ error: `Password Not Correct` }).status(401);
    }

    const token = jwt.sign(
      {
        _id: user._id,
        email,
        password,
      },
      secretKey
    );

    res.json({ token }).status(200);
  } catch (e) {
    console.log(e);
    res.json({ error: `Error Occured, ${e}` }).status(500);
  }
};
