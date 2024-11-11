const {get} = require("mongoose");
const adminModel = require("../Model/adminModel");
const bcrypt = require("bcryptjs");

// const Adminsign = async (req, res) => {
//   console.log(req.body);
//   try {
//     const { username, password, email } = req.body;
//     if (!username || !password || !email) {
//       res.status(400).send({ message: "Kindly fill all fields" });
//     } else {
//       const existadmin = await adminModel.findOne({ email: email });
//       console.log(existadmin);
//       if (existadmin) {
//         res.status(402).send({ message: "Admin already exist", status: false });
//       } else {
//         const hashpassword = await bcrypt.hash(password, 10);
//         console.log(hashpassword);
//         const newadmin = await adminModel.create({
//           username,
//           email,
//           password,
//         });
//         if (newadmin) {
//           res
//             .status(200)
//             .send({ message: "Admin signup successful", status: true });
//         }
//       }
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({ message: error.message, status: false });
//   }
// };

const Adminsign = async (req, res) => {
    console.log(req.body);
    try {
      const { username, password, email } = req.body;
      if (!username || !password || !email) {
        return res.status(400).send({ message: "Kindly fill all fields" });
      }
      
      const existadmin = await adminModel.findOne({ email: email });
      console.log(existadmin);
      
      if (existadmin) {
        return res.status(402).send({ message: "Admin already exists", status: false });
      } 
      
      const hashpassword = await bcrypt.hash(password, 10);
      console.log(hashpassword);
      
      const newadmin = await adminModel.create({
        username,
        email,
        password: hashpassword, 
      });
      
      if (newadmin) {
        return res.status(200).send({ message: "Admin signup successful", status: true });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: error.message, status: false });
    }
  };
  
const Logadmin = async (req, res) => {
  const { username, email, password } = req.body;
  console.log(password);

  if (!username || !email || !password) {
    res.status(400).send({ message: "input cannot be empty", status: false });
  } else {
    try {
      const admin = await adminModel.findOne({ email: email });

      console.log(admin);
      if (!admin) {
        res
          .status(402)
          .send({
            message: "You are not a registered user; pls sign up",
            status: false,
          });
      } else {
        const correctpassword = await bcrypt.compare(password, admin.password);
        if (!correctpassword) {
          res
            .status(405)
            .send({ message: "incorrect password", status: false });
        } else {
          res
            .status(200)
            .send({ message: "login successful", admin, status: true });
        }
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: error.message, status: false });
    }
  }
};

module.exports = { Adminsign, Logadmin };
