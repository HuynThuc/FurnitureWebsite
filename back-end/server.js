// server.js
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const addressRoutes = require('./routes/addressRoutes');
const orderRoutes = require('./routes/orderRoutes')

const app = express();
app.use(cors({
   origin: ["http://localhost:3000"],
   methods: ["POST", "GET", "PUT", "DELETE"],
   credentials: true
}));
app.use(express.json());

// Sử dụng routes
app.use(authRoutes);
app.use(productRoutes);
app.use(cartRoutes);
app.use(addressRoutes);
app.use(orderRoutes);

app.listen(3001, () => {
    console.log("Listening on port 3001...");
});
