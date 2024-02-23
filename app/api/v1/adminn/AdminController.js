const Admin = require("./AdminModel.js");
const argon2 = require("argon2");

exports.index = async (req, res) => {
  try {
    const response = await Admin.findAll({
      attributes: ['nama_admin', 'username', 'role']
    });
    res.status(200).json({
      data: response
      
    })
    
  } catch (error) {
    res.status(500).json({
      msg: error.message
    });
  }
};

exports.find = async (req, res) => {
  try {
    const response = await Admin.findOne({
      attributes: ['id', 'nama_admin', 'username', 'password', 'role'],
      where: {
        id: req.params.id // Menggunakan id sebagai primary key
      }
    });
    res.status(200).json({
      data: response
    });
  } catch (error) {
    res.status(500).json({
      msg: error.message
    });
  }
};


exports.create = async (req, res) => {
  const { nama_admin, username, password, role } = req.body;

  const hashPassword = await argon2.hash(password);

  try {
    await Admin.create({
      nama_admin: nama_admin,
      username: username,
      password: hashPassword,
      role: role
    });
    res.status(201).json({
      msg: "Admin successfully registered!"
    });
  } catch (error) {
    res.status(400).json({
      msg: error.message
    });
  }
};

exports.update = async (req, res) => {
  const admin = await Admin.findOne({
    where: {
      id: req.params.id // Menggunakan id sebagai primary key
    }
  });

  if (!admin) {
    return res.status(404).json({
      msg: "Admin does not exist"
    });
  }

  const { nama_admin, username, password, confirmPassword, role } = req.body;
  let hashPassword;

  if (password === "" || password === null) {
    hashPassword = admin.password;
  } else {
    hashPassword = await argon2.hash(password);
  }

  if (password !== confirmPassword) {
    return res.status(400).json({
      msg: "Password and Confirm Password do not match!"
    });
  }

  try {
    await Admin.update(
      {
        nama_admin: nama_admin,
        username: username,
        password: hashPassword,
        role: role
      },
      {
        where: {
          id: admin.id // Menggunakan id sebagai primary key
        }
      }
    );
    res.status(200).json({
      msg: "Admin updated!"
    });
  } catch (error) {
    res.status(400).json({
      msg: error.message
    });
  }
};

exports.destroy = async (req, res) => {
  const admin = await Admin.findOne({
    where: {
      id: req.params.id // Menggunakan id sebagai primary key
    }
  });

  if (!admin) {
    return res.status(404).json({
      msg: "Admin does not exist"
    });
  }

  try {
    await Admin.destroy({
      where: {
        id: admin.id // Menggunakan id sebagai primary key
      }
    });
    res.status(200).json({
      msg: "Admin deleted!"
    });
  } catch (error) {
    res.status(400).json({
      msg: error.message
    });
  }
};
