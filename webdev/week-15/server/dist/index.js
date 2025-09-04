"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("./routes/index"));
const db_1 = require("./config/db");
const server_port = process.env.SERVER_PORT;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(index_1.default);
db_1.connectDb
    .then(() => {
    console.log("Databse connected");
    app.listen(server_port, () => {
        console.log(`server is running on http://localhost:${server_port}`);
    });
})
    .catch((err) => {
    console.error(" Database connection error:", err.message);
    process.exit(1);
});
//# sourceMappingURL=index.js.map