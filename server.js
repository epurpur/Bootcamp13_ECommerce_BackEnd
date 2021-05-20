const express = require('express');
const routes = require('./routes');
const sequelize = require('./config/connection');

//initialize express
const app = express();
const PORT = process.env.PORT || 3002;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//turn on routes
app.use(routes);

// sync sequelize models to the database, then turn on the server
// sequelize.sync creates new tables according to the schema specified in the model.
// this schema is found in models/index.js
// new tables are created according to the schema defined in each model file
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`App now running on port ${PORT}`));
});