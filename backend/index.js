require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");

require("node:dns/promises").setServers(["1.1.1.1", "8.8.8.8"]);

const app = express();

app.use(cors());
app.use(express.json());
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };
mongoose.connect(process.env.MONGO_URI, clientOptions)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));


const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String
});
const PORT = process.env.PORT || 5000;  
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const User = mongoose.model("User", UserSchema);

app.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    res.json({ message: "User registered successfully" });
  } catch (error) {
    res.status(400).json({ error: "Email already exists" });
  }
});

// ====== LOGIN ======
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ error: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ error: "Wrong password" });

  // No token, just success message
  res.json({ message: `Login successful! Welcome ${user.name}` });
});

