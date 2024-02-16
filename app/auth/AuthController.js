const Admin = require("../api/v1/adminn/AdminModel.js");
const argon2 = require("argon2");

exports.signIn = async (req, res) => {
  try {
    const { username, password } = req.body;

    const admin = await Admin.findOne({
      where: {
        username: username,
      },
    });

    if (!admin) {
      return res.status(404).json({
        msg: "User does not exist",
      });
    }

    const passwordMatch = await argon2.verify(admin.password, password);
    if (!passwordMatch) {
      return res.status(400).json({
        msg: "Wrong password! Please try again",
      });
    }

    req.Session.userId = admin.uuid;
    const { uuid, nama_admin, role } = admin;

    res.status(200).json({
      SessionData: {
        uuid,
        nama_admin,
        role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Internal server error",
    });
  }
};

exports.getMe = async (req, res) => {
  try {
    if (!req.Session.userId) {
      return res.status(401).json({
        msg: "Please login to your account!",
      });
    }

    const admin = await Admin.findOne({
      attributes: ["uuid", "nama_admin", "role"],
      where: {
        uuid: req.Session.userId,
      },
    });

    if (!admin) {
      return res.status(404).json({
        msg: "User does not exist",
      });
    }

    res.status(200).json(admin);
  } catch (error) {
    throw new Error(error.message)
  }
};

exports.signOut = async (req, res) => {
  try {
    req.Session.destroy((err) => {
      if (err) {
        return res.status(400).json({
          msg: err.message,
        });
      }
      res.status(200).json({
        msg: "You have been signed out",
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Internal server error",
    });
  }
};