require("dotenv").config();
const connection = require("../config/db");
const jwt = require("jsonwebtoken");

exports.getAllusers = async (req, res) => {
  try {
    const [result] = await connection.execute("SELECT * FROM user_data");
    return res
      .status(200)
      .json({
        staus: 201,
        message: "user data fetched successfully",
        result: result,
      });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({
        staus: 501,
        message: "Something went wrong. Contact Support.",
        error,
      });
  }
};

exports.createUser = async (req, res) => {
  const { username, password, contact } = req.body;
  try {
    const [result] = await connection.execute( "INSERT INTO user_data (username, password, contact) VALUES (?, ?, ?)",
      [username, password, contact]
    );

    const userId = result.insertId;
    const token = jwt.sign(
      { userId },
      process.env.SECRET_KEY || "mySecretKey2022",
      { expiresIn: "1h" }
    );
    res.status(200).json({ message: "User registered successfully", token });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error registering user", error: error.message });
  }
};

exports.verifUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const [result] = await connection.execute(
      "SELECT * FROM user_data WHERE username = ? AND password = ?",
      [username, password]
    );
    const token = jwt.sign({ username: username, password: password }, "key", { expiresIn: "1hr",});
    res
      .status(200)
      .json({
        status: 201,
        message: "User verified successfully",
        result: token,
      });
  } catch (error) {
    res
      .status(500)
      .json({ message: "User verified failed ", error: error.message });
  }
};
