const express = require("express");
const User = require("../models/user");
const auth = require("../middleware/auth");
const router = new express.Router();

// create a new user
router.post("/users", async (req, res) => {
  const { email } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ error: "Email is already in use!" });
    }

    const user = new User(req.body);
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

// login a user

router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (e) {
    console.error(e); // Log the error for debugging
    res.status(400).send({ error: "Login failed!" });
  }
});

// logout a user

router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      (token) => token.token !== req.token
    );
    await req.user.save();
    res.send();
  } catch (e) {
    console.error(e); // Log the error for debugging
    res.status(500).send({ error: "Logout failed!" });
  }
});

// logout all sessions

router.post("/users/logoutAll", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (e) {
    console.error(e); // Log the error for debugging
    res.status(500).send({ error: "Logout from all sessions failed!" });
  }
});

// get user profile

router.get("/users/me", auth, async (req, res) => {
  res.send(req.user);
});

// update user

router.patch("/users/me", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    updates.forEach((update) => (req.user[update] = req.body[update]));
    await req.user.save();
    res.send(req.user);
  } catch (e) {
    res.status(400).send(e);
  }
});

// delete user

router.delete("/users/me", auth, async (req, res) => {
  try {
    await req.user.deleteOne();
    res
      .status(200)
      .send({ message: "User deleted successfully", user: req.user });
  } catch (error) {
    res.status(500).send({ error: "Failed to delete user" });
  }
});

module.exports = router;
