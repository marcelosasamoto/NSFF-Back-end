const express  = require("express");
const routes = express.Router();
const SessionController = require('./controllers/SessionController');
const UserController = require('./controllers/UserController');
const CardController = require('./controllers/CardController');
const Category = require('./controllers/Category');
const IAController = require('./controllers/IAController');
const authMiddleware = require('./middleware/auth');

routes.post("/create",UserController.store);
routes.post("/login",SessionController.Login);

routes.post("/analise",Category.analise_array);  //API do nsff aberto
routes.get("/user", UserController.index);

routes.use(authMiddleware);
routes.get("/user/:id",UserController.show);
routes.put("/user/:id",UserController.update);
routes.delete("/user/:id",UserController.destroy);


routes.post("/user/:id/addcard",CardController.addCard);
routes.put("/user/:id/updatecard",CardController.updateCard);
routes.delete("/user/:id/deletecard",CardController.deletecard);
routes.get("/user/:id/card",CardController.showcard);

routes.post("/user/:id/category",Category.category);
routes.get("/user/:id/extrato",Category.extrato);
routes.get("/user/:id/analise",Category.analise);
routes.post("/user/:id/graph", IAController.graph);

module.exports  = routes;