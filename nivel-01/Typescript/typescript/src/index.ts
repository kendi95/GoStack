import express from "express";
import { hellhoWorld } from "./routes";

const server = express();

server.get("/", hellhoWorld);

server.listen(3030, () => {
	console.log("🚀 Server is running...");
});
