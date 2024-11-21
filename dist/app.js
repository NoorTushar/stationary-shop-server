"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
// parsers
app.use(express_1.default.json());
app.use(express_1.default.raw());
app.use(express_1.default.text());
app.use((0, cors_1.default)());
// app.use("/api/v1/students", StudentRoutes);
app.get("/", (req, res) => {
    res.send("Hello from the server");
});
exports.default = app;
