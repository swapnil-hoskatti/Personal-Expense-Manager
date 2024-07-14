const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const HOST = process.env.HOST || "localhost";
const PORT = process.env.PORT || "3000";

const { pool } = require("../middleware/db-connection");

exports.getUserCards = (req, res, next) => {
  pool.query(
    "SELECT * FROM user_cards WHERE user_id = $1",
    [req.userData.userId],
    (error, results) => {
      if (error) {
        return res.status(500).json({
          message: "An error occurred while fetching user cards.",
          error: error
        });
      }
      res.status(200).json({
        message: "User cards fetched successfully.",
        userCards: results.rows
      });
    }
  );
}

exports.createUserCard = (req, res, next) => {
  const { user_id, card_id, last_four } = req.body;
  pool.query(
    "INSERT INTO user_cards ( user_id, card_id, last_four, current_limit ) VALUES ($1, $2, $3, $4) RETURNING *",
    [req.userData.userId, req.body.card_id, req.body.last_four, req.body.current_limit],
    (error, results) => {
      if (error) {
        return res.status(500).json({
          message: "An error occurred while creating user card.",
          error: error
        });
      }
      res.status(201).json({
        message: "User card created successfully.",
        userCard: results.rows[0]
      });
    }
  );
}

exports.getUserCard = (req, res, next) => {
  pool.query(
    "SELECT * FROM user_cards WHERE user_id = $1 AND id = $2",
    [req.userData.userId, req.params.userCardId],
    (error, results) => {
      if (error) {
        return res.status(500).json({
          message: "An error occurred while fetching user card.",
          error: error
        });
      }
      res.status(200).json({
        message: "User card fetched successfully.",
        userCard: results.rows[0]
      });
    }
  );
}

exports.updateUserCard = (req, res, next) => {
  const { last_four, current_limit } = req.body;
  pool.query(
    "UPDATE user_cards SET last_four = $1, current_limit = $2 WHERE user_id = $3 AND id = $4 RETURNING *",
    [req.body.last_four, req.body.current_limit, req.userData.userId, req.params.userCardId],
    (error, results) => {
      if (error) {
        return res.status(500).json({
          message: "An error occurred while updating user card.",
          error: error
        });
      }
      res.status(200).json({
        message: "User card updated successfully.",
        userCard: results.rows[0]
      });
    }
  );
}

exports.deleteUserCard = (req, res, next) => {
  pool.query(
    "DELETE FROM user_cards WHERE user_id = $1 AND id = $2",
    [req.userData.userId, req.params.userCardId],
    (error, results) => {
      if (error) {
        return res.status(500).json({
          message: "An error occurred while deleting user card.",
          error: error
        });
      }
      res.status(200).json({
        message: "User card deleted successfully."
      });
    }
  );
}