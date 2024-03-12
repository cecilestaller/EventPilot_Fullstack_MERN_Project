import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// design pattern: factory function -> produces jwt auth middleware
