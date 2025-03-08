require("dotenv").config();
const express = require("express");
const mysql = require("mysql");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

// MySQL Connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

db.connect((err) => {
    if (err) throw err;
    console.log("MySQL Connected...");
});

// Multer Storage Configuration
const storage = multer.diskStorage({
    destination: "./uploads/",
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage: storage });

// ---------------------- Product Routes ---------------------- //

// Add Product with Multiple Images
app.post("/products", upload.array("images", 5), (req, res) => {
    const { name, price } = req.body;
    const imagePaths = req.files.map((file) => `/uploads/${file.filename}`).join(",");

    const sql = "INSERT INTO products (name, price, images) VALUES (?, ?, ?)";
    db.query(sql, [name, price, imagePaths], (err, result) => {
        if (err) return res.status(500).json({ status: 500, error: err });

        res.status(201).json({
            status: 201,
            data: {
                message: "Data has been added successfully",
            },
        });
    });
});

// Get All Products with Images (Paginated Response)
app.get("/products", (req, res) => {
    const sql = "SELECT * FROM products";
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ status: 500, error: err });

        results.forEach((product) => {
            product.images = product.images.split(",");
        });

        res.json({
            status: 201,
            data: {
                current_page: 1,
                data: results,
                total: results.length,
            },
        });
    });
});

// Update Product
app.put("/products/:id", upload.array("images", 5), (req, res) => {
    const { name, price } = req.body;
    const { id } = req.params;
    let sql = "UPDATE products SET name = ?, price = ? WHERE id = ?";
    let params = [name, price, id];

    if (req.files.length > 0) {
        const imagePaths = req.files.map((file) => `/uploads/${file.filename}`).join(",");
        sql = "UPDATE products SET name = ?, price = ?, images = ? WHERE id = ?";
        params = [name, price, imagePaths, id];
    }

    db.query(sql, params, (err) => {
        if (err) return res.status(500).json({ status: 500, error: err });

        res.json({
            status: 201,
            data: { message: "Product updated successfully" },
        });
    });
});

// Delete Product
app.delete("/products/:id", (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM products WHERE id = ?";
    db.query(sql, [id], (err) => {
        if (err) return res.status(500).json({ status: 500, error: err });

        res.json({
            status: 201,
            data: { message: "Product deleted successfully" },
        });
    });
});

// ---------------------- carts Routes ---------------------- //

// Add Product to carts (User ID Hardcoded to 1)
app.post("/carts", (req, res) => {
    const { product_id, quantity } = req.body;
    const user_id = 1; // Hardcoded user ID

    const sql =
        "INSERT INTO carts (user_id, product_id, quantity) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE quantity = quantity + ?";
    db.query(sql, [user_id, product_id, quantity, quantity], (err) => {
        if (err) return res.status(500).json({ status: 500, error: err });

        res.status(201).json({
            status: 201,
            data: { message: "Product has been added to carts successfully" },
        });
    });
});

// Get carts Items
app.get("/carts", (req, res) => {
    const sql = `
        SELECT c.id, c.user_id, p.name, p.price, c.quantity, p.images
        FROM carts c
        JOIN products p ON c.product_id = p.id
        WHERE c.user_id = 1
    `;
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ status: 500, error: err });

        results.forEach((item) => {
            item.images = item.images.split(",");
        });

        res.json({
            status: 201,
            data: {
                current_page: 1,
                data: results,
                total: results.length,
            },
        });
    });
});

// ---------------------- Start Server ---------------------- //

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
