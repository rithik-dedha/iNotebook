const express = require("express");
const User = require("../models/User");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser")
const JWT_SECRET = "This world is a fucking bitch, you need to be a bitch too. Be the biggest bitch you can be. Fuck all.";


// ROUTE 1: create a User using: POST "/api/auth/createuser", it doesn't require Auth
router.post(
  "/createuser",
  [
    body("email", "please enter a valid email").isEmail(),
    body("name", "enter a valid name").isLength({ min: 3 }),
    body("password", "password must be 5 characters long").isLength({ min: 5 }),
  ],
  async (req, res) => {
    let success = false
    // if there are errors, return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }

    // check whether the user with this email exists already
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ success, error: "Sorry a user with this email already exists" });
      }

      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });

      const data = {
        user: {
          id: user.id,
        },
      };

      const authToken = jwt.sign(data, JWT_SECRET);
      //   console.log(authToken)
      //   .then(user => res.json(user))
      //   .catch(err => console.log(err))
      //   res.json({error: 'Please enter a unique value for email', message: err.message})
      // res.send(req.body) // prints on the response console
      success = true
      res.json({ success, authToken }); // sending response
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some error");
    }
  }
);

// ROUTE 2: create a User using: POST "/api/auth/login", it doesn't require Auth
router.post(
  "/login",
  [
    body("email", "please enter a valid email").isEmail(),
    body("password", "password cannot be blank").exists(),
  ],
  async (req, res) => {

    let success = false

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body; //destructuring
    try {
      let user = await User.findOne({ email });

      // user is not there in the database
      if (!user) {
        return res
          .status(400)
          .json({ error: "Chutiya, it is a wrong credentials" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        success = false
        return res.status(400).json({ success, error: "Chutiya, it is a wrong credentials" });
      }

      const data = {
        user: {
          id: user.id,
        },
      };

      const authToken = jwt.sign(data, JWT_SECRET);
      success = true
      res.json({ success, authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  }
);

// We are going to create a middleware right now.
// Middleware is a FUNCTION that is called whenever someone puts a request in getUser

// ROUTE 3: Get logged in user detail using: POST "/api/auth/getuser", it requires login
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user)
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
