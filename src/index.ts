import express from 'express';
import categoryRouter from "./routes/category.route"
import orderRouter from "./routes/order.route"
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use("/api/v1/category", categoryRouter)
app.use("/api/v1/order", orderRouter)

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
