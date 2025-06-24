const express = require('express');
const cors = require('cors');
const app = express();
const blaguesRoutes = require('./routes/blaguesRoutes');  

app.use(express.json());  
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
}));

app.use('/api/blagues', blaguesRoutes); 

app.listen(5000, () => {
  console.log('Le serveur écoute sur le port 5000');
});
