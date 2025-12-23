require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
const _CONST = require("./app/config/constant");

// ================= MIDDLEWARE =================
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static("public"));

// ================= INIT DB TABLES =================
require("./app/models/createTables");

// ================= MYSQL CONNECT =================
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456",
    database: "goalguard",
});

db.connect((err) => {
    if (err) {
        console.error("MySQL connection error:", err);
    } else {
        console.log("Connected to MySQL.");
    }
});

// ================= ROUTES =================

// 🔹 AUTH / USER
const authRoute = require("./app/routers/auth");
const userRoute = require("./app/routers/user");

// 🔹 PAYMENT
const paypalRoute = require("./app/routers/paypal");          // PayPal (cũ)
const vnpayRoute = require("./app/routers/payment.route");          // VNPay (mới)

// 🔹 OTHER MODULES
const dashboardRouter = require("./app/routers/dashboardRouter");
const FieldTypeRouter = require("./app/routers/fieldTypeRouter");
const AreaRouter = require("./app/routers/areaRouter");
const CourtRouter = require("./app/routers/courtRouter");
const ProductTypeRouter = require("./app/routers/productTypeRouter");
const ProductRouter = require("./app/routers/productRouter");
const tournamentRouter = require("./app/routers/tournament");
const tournamentResultRouter = require("./app/routers/tournamentResult");
const bookingRouter = require("./app/routers/bookingRouter");
const orderRouter = require("./app/routers/orderRouter");
const statisticsRouter = require("./app/routers/statisticsRouter");
const residenceRulesRoutes = require("./app/routers/residenceRulesRoutes");
const notificationRoutes = require("./app/routers/notificationRoutes");
const newsRouter = require("./app/routers/newsRouter");
const employeeRouter = require("./app/routers/employee");
const reviewRouter = require("./app/routers/reviewRoutes");
const servicePaymentRouter = require("./app/routers/servicePayment.route");
const chatbotRouter = require('./app/routers/chatRouter');
// ================= USE ROUTES =================
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);

// 💰 PAYMENT
app.use("/api/payment", paypalRoute);   // PayPal
app.use("/api/vnpay", vnpayRoute);       // VNPay

app.use("/api/dashboard", dashboardRouter);
app.use("/api/field-types", FieldTypeRouter);
app.use("/api/areas", AreaRouter);
app.use("/api/courts", CourtRouter);
app.use("/api/product-types", ProductTypeRouter);
app.use("/api/products", ProductRouter);
app.use("/api/tournaments", tournamentRouter);
app.use("/api/tournament-results", tournamentResultRouter);
app.use("/api/booking", bookingRouter);
app.use("/api/orders", orderRouter);
// app.use("/api/service-orders", serviceOrderRouter);
app.use("/api/statistics", statisticsRouter);
app.use("/api/residence-rules", residenceRulesRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/news", newsRouter);
app.use("/api/employee", employeeRouter);
app.use("/api/reviews", reviewRouter);
app.use("/api/service-payment", servicePaymentRouter);
app.use('/api/chatbot', chatbotRouter);


// ================= START SERVER =================
const PORT = process.env.PORT || _CONST.PORT;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
