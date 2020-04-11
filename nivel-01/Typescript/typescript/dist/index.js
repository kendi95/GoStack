"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var server = express_1.default();
server.get("/", function (req, res) {
    return res.status(200).json({ message: "Hello Rocketseat!" });
});
server.listen(3030, function () {
    console.log("🚀 Server is running...");
});
