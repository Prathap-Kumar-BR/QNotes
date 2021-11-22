import express from "express";
import dotenv from "dotenv";
import connectDB from "./server/config/db.js";
import colors from "colors";
import path from "path";
import noteRoutes from "./server/routes/noteRoutes.js";
import userRoutes from "./server/routes/userRoutes.js";
import { errorHandler, notFound } from "./server/middleware/errorMiddleware.js";

dotenv.config();
connectDB();

const app = express(); // main thing

app.use(express.json()); // to accept json data

app.use("/api/notes", noteRoutes);
app.use("/api/users", userRoutes);

// --------------------------deployment------------------------------
if (process.env.NODE_ENV === "production") {
  app.use("/", express.static("client/build"));

  app.get("/*", (req, res) =>
    res.sendFile(path.join(__dirname, "/client/build/index.html"))
  );
}
// --------------------------deployment------------------------------

// Error Handling middlewares
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 4000;

app.listen(PORT, console.log(`Server running  on port ${PORT}..`.yellow.bold));
