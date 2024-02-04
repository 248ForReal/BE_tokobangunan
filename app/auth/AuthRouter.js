const express = require("express");
const {
  signIn,
  getMe,
  signOut
} = require("./AuthController.js");

const router = express.Router();

router.get("/me", getMe);
router.post("/signin", signIn);
router.delete("/signout", signOut);

module.exports = router;