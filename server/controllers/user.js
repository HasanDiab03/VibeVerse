import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ message: "User doesn't exist" });
    }
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    const token = await jwt.sign(
      { email, id: existingUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    delete existingUser.password;
    return res.status(200).json({ token, profile: existingUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const signUp = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already Exists" });
    }
    const hashedPassword = await bcrypt.hash(
      password,
      await bcrypt.genSalt(10)
    );
    const user = await User.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    });
    const token = await jwt.sign(
      { email, id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    delete user.password;
    // console.log(user);
    return res.status(200).json({ token, profile: user });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
