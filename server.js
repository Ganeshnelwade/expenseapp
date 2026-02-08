// =================== EXPENSE TRACKER BACKEND ===================

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// =================== MONGODB CONNECTION ===================
// Using your Atlas connection string
const MONGODB_URI = "mongodb+srv://ganeshnelwade773_db_user:G@nesh123@cluster0.tdzkdvt.mongodb.net/expenses?retryWrites=true&w=majority";

mongoose.connect(MONGODB_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));


// =================== EXPENSE SCHEMA ===================
const ExpenseSchema = new mongoose.Schema({
    date: String,
    category: String,
    amount: Number,
    note: String
});

const Expense = mongoose.model("Expense", ExpenseSchema);

// =================== API ROUTES ===================

// Add a new expense
app.post("/expenses", async (req, res) => {
    try {
        const expense = new Expense(req.body);
        await expense.save();
        res.status(201).send({ message: "Expense saved successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Error saving expense" });
    }
});

// Get all expenses
app.get("/expenses", async (req, res) => {
    try {
        const expenses = await Expense.find();
        res.status(200).send(expenses);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Error fetching expenses" });
    }
});

// =================== START SERVER ===================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

