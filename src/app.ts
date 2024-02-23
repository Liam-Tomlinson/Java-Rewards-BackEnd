import express, { Application, Request, Response, NextFunction } from "express";
import { router as userRoutes } from "./routes/users.routes";
import { router as shopsRoutes } from "./routes/shops.routes";
import { router as ordersRoutes } from "./routes/orders.routes";
import Stripe from 'stripe';
import * as dotenv from "dotenv";
dotenv.config();
let stripeKey:any = process.env.STRIPE_PRIV
const stripe = new Stripe(stripeKey);

const app: Application = express();
app.use(express.json());

app.use("/users", userRoutes);
app.use("/shops", shopsRoutes);
app.use("/orders", ordersRoutes);

app.post('/payment-sheet', async (req, res) => {
  // Use an existing Customer ID if this is a returning customer.
  console.log(req.body)
  const customer = await stripe.customers.create();
  const ephemeralKey = await stripe.ephemeralKeys.create(
    {customer: customer.id},
    {apiVersion: '2023-10-16'}
  );
  const paymentIntent = await stripe.paymentIntents.create({
    amount: req.body.totalCost,
    currency: 'gbp',
    customer: customer.id,
    automatic_payment_methods: {
      enabled: true,
    },
  });
  res.json({
    paymentIntent: paymentIntent.client_secret,
    ephemeralKey: ephemeralKey.secret,
    customer: customer.id,
    publishableKey: process.env.STRIPE_PUB
  });
});
app.all("/*", (req: Request, res: Response, next: NextFunction) => {
  res.status(400).send("Bad Request");
});

interface CustomError extends Error {
  code?: number;
  msg?: string;
  status?: number;
}
app.use((err: CustomError, req: Request, res: Response, next: NextFunction) => {
  if (err.code === 11000) {
    res.status(400).send(err);
  }
  if (err.status === 404) {
    res.status(404).send(err.msg);
  } 
  if (err.status === 400) {
    res.status(400).send(err.msg);
  } 
  
  else {
    console.log(res)
    res.status(500).send("internal server error");
  }
});

export default app;
