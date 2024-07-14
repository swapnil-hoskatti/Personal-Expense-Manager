const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const HOST = process.env.HOST || "localhost";
const PORT = process.env.PORT || "3000";

const { pool } = require("../middleware/db-connection");

// get all users
exports.getUsers = (req, res, next) => {
  pool.query("SELECT * FROM users", (error, results) => {
    if (error) {
      // Log the error for debugging purposes
      console.error("Error fetching users:", error);
      // Send a 500 Internal Server Error response
      // Ensure to return here to prevent further execution
      return res.status(500).json({
        message: "Error fetching users",
        error: error.message,
      });
    }
    res.status(200).json({
      count: results.rows.length,
      users: results.rows.map((user) => {
        return {
          id: user.id,
          email: user.email,
          first_name: user.first_name,
          last_name: user.last_name,
          request: {
            type: "GET",
            url: "http://" + HOST + ":" + PORT + "/api/users/" + user.id,
          },
        };
      }),
    });
  });
};

exports.createUser = (req, res, next) => {
  console.log(req.body);
  // Check if the email already exists
  pool.query(
    "SELECT * FROM users WHERE email = $1",
    [req.body.email],
    (error, results) => {
      if (error) {
        // Log the error for debugging purposes
        console.error("Error checking for existing user:", error);
        // Send a 500 Internal Server Error response
        // Ensure to return here to prevent further execution
        return res.status(500).json({
          message: "Error checking for existing user",
          error: error.message,
        });
      }
      if (results.rows.length > 0) {
        return res.status(409).json({
          message: "User with this email already exists",
        });
      }
      // Hash the password
      bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
          // Log the error for debugging purposes
          console.error("Error hashing password:", err);
          // Send a 500 Internal Server Error response
          // Ensure to return here to prevent further execution
          return res.status(500).json({
            message: "Error hashing password",
            error: err.message,
          });
        }
        const user = {
          email: req.body.email,
          username: req.body.username,
          password: hash,
          first_name: req.body.first_name,
          last_name: req.body.last_name || "",
        };
        pool.query(
          "INSERT INTO users (email, username, password, first_name, last_name) VALUES ($1, $2, $3, $4, $5) RETURNING id",
          [
            user.email,
            user.username,
            user.password,
            user.first_name,
            user.last_name,
          ],
          (error, results) => {
            if (error) {
              // Log the error for debugging purposes
              console.error("Error creating user:", error);
              // Send a 500 Internal Server Error response
              // Ensure to return here to prevent further execution
              return res.status(500).json({
                message: "Error creating user",
                error: error.message,
              });
            }
            res.status(201).json({
              message: "User created",
              user: user,
              request: {
                type: "GET",
                url:
                  "http://" +
                  HOST +
                  ":" +
                  PORT +
                  "/api/users/" +
                  results.rows[0].id,
              },
            });
          }
        );
      });
    }
  );
};

exports.loginUser = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  pool.query(
    "SELECT * FROM users WHERE username = $1",
    [username],
    (error, results) => {
      if (error) {
        throw error;
      }
      if (results.rows.length < 1) {
        return res.status(401).json({
          message: "Auth failed, user not found",
        });
      }
      bcrypt.compare(password, results.rows[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "Auth failed, password incorrect",
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              email: results.rows[0].email,
              username: results.rows[0].id,
              first_name: results.rows[0].first_name,
              last_name: results.rows[0].last_name,
            },
            process.env.JWT_KEY,
            {
              expiresIn: "1h",
            }
          );
          return res.status(200).json({
            message: "Auth successful",
            token: token,
          });
        }
        res.status(401).json({
          message: "Auth failed",
        });
      });
    }
  );
};

exports.getUser = (req, res, next) => {
  const id = req.params.userId;
  pool.query("SELECT * FROM users WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    if (results.rows.length < 1) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    res.status(200).json({
      user: results.rows[0],
      request: {
        type: "GET",
        url: "http://" + HOST + ":" + PORT + "/api/users/" + id,
      },
    });
  });
};

exports.updateUser = (req, res, next) => {
  const id = req.params.userId;
  // Hash the password
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      // Log the error for debugging purposes
      console.error("Error hashing password:", err);
      // Send a 500 Internal Server Error response
      // Ensure to return here to prevent further execution
      return res.status(500).json({
        message: "Error hashing password",
        error: err.message,
      });
    }
    const user = {
      email: req.body.email,
      password: hash,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
    };

    pool.query(
      "UPDATE users SET email = $1, password = $2, first_name = $3, last_name = $4 WHERE id = $5",
      [user.email, user.password, user.first_name, user.last_name, id],
      (error, results) => {
        if (error) {
          throw error;
        }
        res.status(200).json({
          message: "User updated",
          request: {
            type: "GET",
            url: "http://" + HOST + ":" + PORT + "/api/users/" + id,
          },
        });
      }
    );
  });
};

exports.deleteUser = (req, res, next) => {
  const id = req.params.userId;
  pool.query("DELETE FROM users WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json({
      message: "User deleted",
      request: {
        type: "POST",
        url: "http://" + HOST + ":" + PORT + "/api/users",
        body: {
          email: "String",
          password: "String",
          first_name: "String",
          last_name: "String || null",
        },
      },
    });
  });
};
