import { initServer } from "./configs/app.js";
import { config } from "dotenv";
import { connect } from "./configs/mongo.js";
import { defaultCategories } from "./src/category/category.controller.js";

config()
connect()
initServer() 
defaultCategories()