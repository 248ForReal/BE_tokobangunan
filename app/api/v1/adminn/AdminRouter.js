const express = require("express");
const { verifyUser, adminRole, kasirRole } = require("../../../middleware/AuthUser.js");
const {
  index,
  find,
  create,
  update,
  destroy
} = require("./AdminController.js");

const router = express.Router();

router.get("/users", verifyUser, adminRole, index);
router.get("/users/:id", verifyUser, adminRole, find);
router.post("/users", verifyUser, adminRole,create);
router.patch("/users/:id", verifyUser, kasirRole, update);
router.delete("/users/:id", verifyUser, adminRole, destroy);

module.exports = router;