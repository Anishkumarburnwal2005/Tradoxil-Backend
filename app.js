if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const url = process.env.MONGO_URL;

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3002;

const bodyParser = require("body-parser");
const cors = require("cors");

const Holding = require("./models/holding");
const Position = require("./models/position");
const Order = require("./models/order");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

main()
  .then(() => {
    console.log("Databse was connected successfully");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(url);
}

// const sampleHoldings = [
//   {
//     name: "BHARTIARTL",
//     qty: 2,
//     avg: 538.05,
//     price: 541.15,
//     net: "+0.58%",
//     day: "+2.99%",
//   },
//   {
//     name: "HDFCBANK",
//     qty: 2,
//     avg: 1383.4,
//     price: 1522.35,
//     net: "+10.04%",
//     day: "+0.11%",
//   },
//   {
//     name: "HINDUNILVR",
//     qty: 1,
//     avg: 2335.85,
//     price: 2417.4,
//     net: "+3.49%",
//     day: "+0.21%",
//   },
//   {
//     name: "INFY",
//     qty: 1,
//     avg: 1350.5,
//     price: 1555.45,
//     net: "+15.18%",
//     day: "-1.60%",
//     isLoss: true,
//   },
//   {
//     name: "ITC",
//     qty: 5,
//     avg: 202.0,
//     price: 207.9,
//     net: "+2.92%",
//     day: "+0.80%",
//   },
//   {
//     name: "KPITTECH",
//     qty: 5,
//     avg: 250.3,
//     price: 266.45,
//     net: "+6.45%",
//     day: "+3.54%",
//   },
//   {
//     name: "M&M",
//     qty: 2,
//     avg: 809.9,
//     price: 779.8,
//     net: "-3.72%",
//     day: "-0.01%",
//     isLoss: true,
//   },
//   {
//     name: "RELIANCE",
//     qty: 1,
//     avg: 2193.7,
//     price: 2112.4,
//     net: "-3.71%",
//     day: "+1.44%",
//   },
//   {
//     name: "SBIN",
//     qty: 4,
//     avg: 324.35,
//     price: 430.2,
//     net: "+32.63%",
//     day: "-0.34%",
//     isLoss: true,
//   },
//   {
//     name: "SGBMAY29",
//     qty: 2,
//     avg: 4727.0,
//     price: 4719.0,
//     net: "-0.17%",
//     day: "+0.15%",
//   },
//   {
//     name: "TATAPOWER",
//     qty: 5,
//     avg: 104.2,
//     price: 124.15,
//     net: "+19.15%",
//     day: "-0.24%",
//     isLoss: true,
//   },
//   {
//     name: "TCS",
//     qty: 1,
//     avg: 3041.7,
//     price: 3194.8,
//     net: "+5.03%",
//     day: "-0.25%",
//     isLoss: true,
//   },
//   {
//     name: "WIPRO",
//     qty: 4,
//     avg: 489.3,
//     price: 577.75,
//     net: "+18.08%",
//     day: "+0.32%",
//   },
// ];

// app.get("/addH", (req, res) => {
//   sampleHoldings.forEach((sampleHolding) => {
//     let newHolding = new Holding({
//       name: sampleHolding.name,
//       qty: sampleHolding.qty,
//       avg: sampleHolding.avg,
//       price: sampleHolding.price,
//       net: sampleHolding.net,
//       day: sampleHolding.day,
//     });

//     newHolding.save();
//   });

//   res.send("Working Good!");
// });

// const positions = [
//   {
//     product: "CNC",
//     name: "EVEREADY",
//     qty: 2,
//     avg: 316.27,
//     price: 312.35,
//     net: "+0.58%",
//     day: "-1.24%",
//     isLoss: true,
//   },
//   {
//     product: "CNC",
//     name: "JUBLFOOD",
//     qty: 1,
//     avg: 3124.75,
//     price: 3082.65,
//     net: "+10.04%",
//     day: "-1.35%",
//     isLoss: true,
//   },
// ];

// app.get("/addP", (req, res) => {
//   positions.forEach((position) => {
//     let newPosition = new Position({
//       product: position.product,
//       name: position.name,
//       qty: position.qty,
//       avg: position.avg,
//       price: position.price,
//       net: position.net,
//       day: position.day,
//       isLoss: position.isLoss,
//     });

//     newPosition.save();
//   });

//   res.send("Done");
// });

app.get("/showAllheadings", async (req, res) => {
  let allHoldings = await Holding.find({});
  res.send(allHoldings);
});

app.get("/showAllpositions", async (req, res) => {
  let allPositions = await Position.find({});
  res.send(allPositions);
});

app.get("/showAllorders", async (req, res) => {
  let allOrders = await Order.find({});
  res.send(allOrders);
});

app.post("/newOrder", (req, res) => {
  let newOrder = new Order({
    name: req.body.name,
    qty: req.body.qty,
    price: req.body.price,
    mode: req.body.mode,
  });

  newOrder.save();

  res.send("New order added");
});

app.listen(PORT, () => {
  console.log("You are listening on the port 8080");
});
