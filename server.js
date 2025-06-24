const express = require('express');
const cors = require('cors');
const app = express();
const blaguesRoutes = require('./routes/blaguesRoutes');  
const { swaggerUi, specs } = require('./swagger/swagger');
const sequelize = require('./config/db');  

app.use(express.json());  
app.use(cors({
  origin: 'http://localhost:3000', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
}));

sequelize.authenticate()
  .then(() => {
    console.log('Connexion à la base de données réussie');
  })
  .catch((err) => {
    console.error('Impossible de se connecter à la base de données:', err);
  });

sequelize.sync({ force: false })
  .then(() => {
    console.log("La base de données a été synchronisée !");
  })
  .catch((err) => {
    console.error("Erreur de synchronisation : ", err);
  });

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use('/api', blaguesRoutes);  

app.listen(5000, () => {
  console.log("Le serveur écoute sur le port 5000");
});

module.exports = app;
