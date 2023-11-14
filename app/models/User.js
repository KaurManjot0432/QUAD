const connection = require("../database/quadDb");

class User {
  constructor(user) {
    this.user_name = user.user_name;
    this.phone_number = user.phone_number;
    this.email = user.email;
    this.password = user.password;
  }

  static async createUserTable() {
    const createUserTableQuery = `
      CREATE TABLE IF NOT EXISTS User (
        user_id INT AUTO_INCREMENT PRIMARY KEY,
        user_name VARCHAR(255),
        phone_number VARCHAR(10),
        email VARCHAR(255) UNIQUE,
        password VARCHAR(255)
      )
    `;
    try {
      await connection.execute(createUserTableQuery);
    } catch (err) {
      throw err;
    }
  }

  static async insert(newUser) {
    try {
      const res = await connection.execute(
        "INSERT INTO User (user_name, phone_number, email, password) VALUES (?, ?, ?, ?)",
        [newUser.user_name, newUser.phone_number, newUser.email, newUser.password]
      );
      return { user_id: res[0].insertId, ...newUser };
    } catch (err) {
      throw err;
    }
  }

  static async findUserByEmail(userEmail) {
    try {
      const res = await connection.query("SELECT * FROM User WHERE email = ?", [userEmail]);
      return res;
    } catch (err) {
      console.log("error: ", err);
      throw err;
    }
  }

  static async findUserById(userId) {
    try {
      const res = await connection.query("SELECT * FROM User WHERE user_id = ?", [userId]);
      return res;
    } catch (err) {
      console.log("error: ", err);
      throw err;
    }
  }
}

module.exports = User;
