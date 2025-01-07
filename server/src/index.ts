import express from "express";

const PORT = process.env.PORT ?? 3000;
const app = express();

app.get("/", (_, res) => {
  res.status(200).json({ message: "Hello, Leonardo ☺️!" });
});

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
