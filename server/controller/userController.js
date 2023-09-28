import userModal from "../model/userModal.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createCookie } from "../utils/createCookie.js";

export const validateUser = async function (req, res) {
  try {
    const { name } = req.payload;

    // check does user exist in User

    const userExists = await userModal.findOne({
      name,
    });

    if (!userExists) {
      return res.status(400).json({ error: `Name does not exists ` });
    }

    return res.status(200).json({ success: "Authenticated user" });
  } catch (error) {
    console.log(error);

    return res.status(400).json({ error: error.message });
  }
};

export const register = async function (req, res) {
  try {
    const { name,email,  password } = req.body;

    // check does user exist in User

    const userExists = await userModal.findOne({
      email,
    });

    if (userExists) {
      return res.status(400).json({ error: `Email already exists ` });
    }
    // encrypting the password

    const encryptedPassword = bcrypt.hashSync(password, 12);

    // creating the user

    const newUser = await userModal.create({
      name,
      email,
      password: encryptedPassword,
    });

    //generating token

    const token = jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
        name,
      },
      process.env.JWT_SECRET
    );

    createCookie(res, token);

    return res.status(200).json({ success: "successfully created" });
  } catch (error) {
    console.log(error);

    return res.status(400).json({ error: error.message });
  }
};

export const login = async function (req, res) {
  try {
    const { name, password } = req.body;

    // check does user exist in User

    const isValidUser = await userModal.findOne({
      name,
    });

    if (!isValidUser) {
      return res.status(400).json({ error: "Invalid password" });
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      isValidUser.password
    );

    if (!isPasswordCorrect) {
      return res.status(400).json({
        message: "Incorrect email or password",
      });
    }

    const token = jwt.sign(
      {
        name,
      },
      process.env.JWT_SECRET
    );

    createCookie(res, token);

    return res.status(200).json({ success: "successfully logged in" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: error.message });
  }
};

export const logout = async function (req, res) {
  try {
    createCookie(res, "");

    return res.status(200).json({ message: "success" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: error.message });
  }
};
