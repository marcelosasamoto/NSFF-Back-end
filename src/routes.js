const express  = require("express");
const routes = express.Router();

const UserController = require('./controllers/UserController');
const CardController = require('./controllers/CardController');

routes.get("/user", UserController.index);
routes.post("/user",UserController.store);
routes.get("/user/:id",UserController.show);
routes.put("/user/:id",UserController.update);
routes.delete("/user/:id",UserController.destroy);


routes.post("/user/:id/addcard",CardController.addCard);
routes.put("/user/:id/updatecard",CardController.updateCard);
routes.delete("/user/:id/deletecard",CardController.deletecard);
routes.get("/user/:id/card",CardController.showcard);
module.exports  = routes;