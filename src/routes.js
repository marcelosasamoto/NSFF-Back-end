const express  = require("express");
const routes = express.Router();

const UserController = require('./controllers/UserController');

routes.get("/user", UserController.index);
routes.post("/user",UserController.store);
routes.get("/user/:id",UserController.show);
routes.put("/user/:id",UserController.update);
routes.delete("/user/:id",UserController.destroy);
module.exports  = routes;