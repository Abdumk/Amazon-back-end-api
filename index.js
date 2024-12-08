// start by instaling npm i express cors stripe dotenv these are essential for back-end

const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv');
dotenv.config() // these consig method used to read file in dotenv file
const stripe = require("stripe")(process.env.STRIPE_KEY)


const app = express();

app.use(cors({ origin: true }));

app.use(express.json());
// http://127.0.0.1:5001/clone-2fb4a/us-central1/api
// thunder client is extension used to see disply with out browser
app.get("/", (req, res) => {
    res.status(200).json({
        Message:"success"
    })
})
// example in server working is show payment complite 400 file the data in thunder extension
// http://127.0.0.1:5001/clone-2fb4a/us-central1/api{add these /payment/create?total = 400}

// app.post("/payment/create", async (req, res) => {
//     const total = req.query.total;
//     if (total > 0) {
//      console.log("payment complite",total);
//      res.send(total)
//     }
//   });

app.post("/payment/create", async (req, res) => {
    const total = parseInt(req.query.total);
    if (total > 0) {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: "usd"
      });
      console.log(paymentIntent); // these console show send us object from these we get clien_secreate,amount....
      
      res.status(201).json({
        clientSecret: paymentIntent.client_secret,
      });
    } else {
      res.status(403).json({
        message: "total must be greater than 0",
      });
    }
  });

app.listen(5000,(err)=>{
if(err)  err
console.log("Amazon server Runing on PORT:5000, http://localhost:5000");


})
