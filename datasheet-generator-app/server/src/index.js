
import express from "express";
import fileUpload from "express-fileupload";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import uploadRouter from "./routes/uploadRouter.js";
import exportRouter from "./routes/exportRouter.js";

const app = express();
app.use(cors());
app.use(fileUpload({ createParentPath: true }));
app.use(express.json());

app.use("/api/upload", uploadRouter);
app.use("/api/export", exportRouter);

// serve React build
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const buildDir  = path.join(__dirname, "../../client/dist");
app.use(express.static(buildDir));
app.get("*", (_, res) => res.sendFile(path.join(buildDir, "index.html")));

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>console.log("Server listening on", PORT));
