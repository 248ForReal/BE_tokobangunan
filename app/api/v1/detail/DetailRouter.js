const express = require("express");
const { verifyUser } = require("../../../middleware/AuthUser.js");
const {
    index,
    find,
    create,
    update,
    destroy
} = require("./DetailController.js");

const router = express.Router();

router.get('/detail', verifyUser, index);
router.get('/detail/:id', verifyUser, find);
router.post('/detail', verifyUser, create);
router.patch('/detail/:id', verifyUser, update);
router.delete('/detail/:id', verifyUser, destroy);

module.exports = router;