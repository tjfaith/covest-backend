import express from "express";
const router = express.Router();

const userController = require("../controllers/userController");

router.get("/", userController.get_all_users);

module.exports = router;
