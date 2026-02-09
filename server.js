// server.js
const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging middleware to track all endpoints
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Dummy data
const orders = [
  { orderId: "1001", status: "Shipped", eta: "2 days", items: ["Sneakers", "T-Shirt"] },
  { orderId: "1002", status: "Processing", eta: "5 days", items: ["Headphones"] },
  { orderId: "1003", status: "Delivered", eta: "Completed", items: ["T-Shirt"] },
  { orderId: "1004", status: "Shipped", eta: "1 day", items: ["Headphones", "Sneakers"] },
  { orderId: "1005", status: "Processing", eta: "3 days", items: ["T-Shirt1"] },
  { orderId: "1006", status: "Delivered", eta: "Completed", items: ["Sneakers", "T-Shirt1"] },
  { orderId: "1007", status: "Shipped", eta: "2 days", items: ["Headphones"] },
  { orderId: "1008", status: "Processing", eta: "4 days", items: ["T-Shirt"] },
  { orderId: "1009", status: "Delivered", eta: "Completed", items: ["Sneakers"] },
  { orderId: "1010", status: "Shipped", eta: "3 days", items: ["T-Shirt1", "Headphones"] },
  { orderId: "1011", status: "Processing", eta: "5 days", items: ["Sneakers", "T-Shirt"] },
  { orderId: "1012", status: "Delivered", eta: "Completed", items: ["T-Shirt1"] },
];

const products = [
  { productId: "P001", name: "Sneakers", price: 79.99, stock: 10, sizes: ["7", "8", "9", "10"], color: ["Black", "White"] },
  { productId: "P002", name: "T-Shirt", price: 19.99, stock: 25, sizes: ["S", "M", "L", "XL"], color: ["Red", "Blue", "Black"] },
  { productId: "P004", name: "T-Shirt1", price: 29.99, stock: 45, sizes: ["M", "L", "XL"], color: ["Red", "Blue", "Black", "Green"] },
  { productId: "P003", name: "Headphones", price: 129.99, stock: 5, color: ["Black", "Silver"] },
  { productId: "P005", name: "Jacket", price: 89.99, stock: 15, sizes: ["S", "M", "L", "XL"], color: ["Black", "Brown"] },
  { productId: "P006", name: "Jeans", price: 59.99, stock: 30, sizes: ["28", "30", "32", "34"], color: ["Blue", "Black"] },
  { productId: "P007", name: "Socks", price: 9.99, stock: 100, sizes: ["One Size"], color: ["White", "Black", "Gray"] },
  { productId: "P008", name: "Hat", price: 24.99, stock: 20, sizes: ["One Size"], color: ["Black", "White", "Red"] },
  { productId: "P009", name: "Gloves", price: 34.99, stock: 12, sizes: ["S", "M", "L"], color: ["Black", "Gray", "Brown"] },
  { productId: "P010", name: "Scarf", price: 39.99, stock: 8, sizes: ["One Size"], color: ["Red", "Blue", "Gray", "Black"] },
  { productId: "P011", name: "Shoes", price: 99.99, stock: 18, sizes: ["6", "7", "8", "9", "10", "11"], color: ["Black", "White", "Brown"] },
  { productId: "P012", name: "Watch", price: 199.99, stock: 5, sizes: ["One Size"], color: ["Silver", "Gold", "Black"] },
  { productId: "P013", name: "Sunglasses", price: 149.99, stock: 25, sizes: ["One Size"], color: ["Black", "Brown", "Gold"] },
  { productId: "P014", name: "Belt", price: 44.99, stock: 35, sizes: ["S", "M", "L", "XL"], color: ["Black", "Brown", "Navy"] },
];

const accounts = [
  { userId: "U100", name: "Alice", email: "alice@example.com", loyaltyPoints: 120 },
  { userId: "U101", name: "Bob", email: "bob@example.com", loyaltyPoints: 50 },
  { userId: "U102", name: "cob", email: "cob@example.com", loyaltyPoints: 60 },
  { userId: "U103", name: "dob", email: "dob@example.com", loyaltyPoints: 90 },
  { userId: "U104", name: "eob", email: "eob@example.com", loyaltyPoints: 150 },
  { userId: "U105", name: "fob", email: "fob@example.com", loyaltyPoints: 75 },
  { userId: "U106", name: "gob", email: "gob@example.com", loyaltyPoints: 110 },
  { userId: "U107", name: "hob", email: "hob@example.com", loyaltyPoints: 95 },
  { userId: "U108", name: "iob", email: "iob@example.com", loyaltyPoints: 140 },
  { userId: "U109", name: "job", email: "job@example.com", loyaltyPoints: 65 },
  { userId: "U110", name: "kob", email: "kob@example.com", loyaltyPoints: 130 },
  { userId: "U111", name: "lob", email: "lob@example.com", loyaltyPoints: 85 },
  { userId: "U112", name: "mob", email: "mob@example.com", loyaltyPoints: 155 },
  { userId: "U113", name: "nob", email: "nob@example.com", loyaltyPoints: 45 },
  { userId: "U114", name: "oob", email: "oob@example.com", loyaltyPoints: 120 },
];

// Endpoints

// 1️⃣ Order Status
app.get("/api/order-status/:orderId", (req, res) => {
  const { orderId } = req.params;
  const order = orders.find(o => o.orderId === orderId);
  if (order) return res.json(order);
  return res.status(404).json({ error: "Order not found" });
});

// Product Info (FULL details by Product Name)
app.get("/api/product-info/name/:productName", (req, res) => {
  const { productName } = req.params;

  const product = products.find(
    p => p.name.toLowerCase() === productName.toLowerCase()
  );

  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  res.json({
    productId: product.productId,
    name: product.name,
    price: product.price,
    availableStock: product.stock,
    availableSizes: product.sizes || [],
    availableColors: product.color || []
  });
});

app.get("/api/product-info", (req, res) => {
  let { name } = req.query;

  if (!name) {
    return res.status(400).json({ error: "Product name required" });
  }

  name = name.toLowerCase().trim();

  const product = products.find(
    p => p.name.toLowerCase() === name
  );

  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  res.json(product);
});

// 3️⃣ Payment Status
app.get("/api/payment-status/:orderId", (req, res) => {
  const { orderId } = req.params;
  const order = orders.find(o => o.orderId === orderId);
  if (order) return res.json({ orderId, paymentStatus: "Paid" });
  return res.status(404).json({ error: "Order not found" });
});

// 8️⃣ List all products (ID + Name)
app.get("/api/products", (req, res) => {
  const productList = products.map(p => ({
    productId: p.productId,
    name: p.name
  }));

  res.json(productList);
});

// 9️⃣ List all orders (ID + Status)
app.get("/api/orders", (req, res) => {
  const orderList = orders.map(o => ({
    orderId: o.orderId,
    status: o.status
  }));

  res.json(orderList);
});

// 4️⃣ Return / Refund
app.post("/api/return-request", (req, res) => {
  const { orderId, reason } = req.body;
  const order = orders.find(o => o.orderId === orderId);
  if (!order) return res.status(404).json({ error: "Order not found" });
  return res.json({ orderId, status: "Return requested", reason, refundETA: "5-7 business days" });
});

// 5️⃣ Account Details
app.get("/api/account/:userId", (req, res) => {
  const { userId } = req.params;
  const account = accounts.find(a => a.userId === userId);
  if (account) return res.json(account);
  return res.status(404).json({ error: "Account not found" });
});

// 6️⃣ Product Recommendations
app.get("/api/recommendation/:userId", (req, res) => {
  const { userId } = req.params;
  // Dummy recommendation logic
  return res.json({
    userId,
    recommendations: ["T-Shirt", "Headphones", "Sneakers"]
  });
});

// 7️⃣ General Health Check
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date() });
});

// 🔟 Place an Order
app.post("/api/order", (req, res) => {
  const { userId, items } = req.body;

  // Basic validation
  if (!userId || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: "userId and items are required" });
  }

  // Optional: check if user exists
  const userExists = accounts.find(a => a.userId === userId);
  if (!userExists) {
    return res.status(404).json({ error: "User not found" });
  }

  // Generate new orderId
  const newOrderId = (Number(orders[orders.length - 1].orderId) + 1).toString();

  const newOrder = {
    orderId: newOrderId,
    status: "Processing",
    eta: "5 days",
    items
  };

  // Save order
  orders.push(newOrder);

  res.status(201).json({
    ...newOrder,
    message: "Order placed successfully"
  });
});


// Start server
const PORT = 3000;
app.listen(PORT, () => console.log(`ShopEase API running on port ${PORT}`));
