const Blague = require('../models/blagues');
const sequelize = require('../config/db');  


  const ajouterBlague = async (req, res) => {
  try {
    const { texte, reponse } = req.body;  
    const nouvelleBlague = await Blague.create({ texte, reponse });  
    res.status(201).json(nouvelleBlague);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

  const consulterToutesBlagues= async (req, res) => {
    try {
      const blagues = await Blague.findAll();
      res.status(200).json(blagues);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
const mettreAJourBlague = async (req, res) => {
  try {
    const { id } = req.params;  
    const { reponse } = req.body;  

    const blague = await Blague.findByPk(id);  

    if (!blague) {
      return res.status(404).json({ message: 'Blague non trouvée' });
    }

    blague.reponse = reponse;
    await blague.save();  

    res.status(200).json(blague);  
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

  const consulterBlague = async (req, res) => {
    try {
      const blague = await Blague.findByPk(req.params.id);
      if (blague) {
        res.status(200).json(blague);
      } else {
        res.status(404).json({ message: 'Blague non trouvée' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

 const consulterBlagueAleatoire = async (req, res) => {
  try {
    const blague = await Blague.findOne({
      order: sequelize.fn('RANDOM') 
    });

    console.log('Blague récupérée:', blague);

    if (!blague) {
      console.log('Aucune blague trouvée');
      return res.status(404).json({ message: 'Aucune blague trouvée' });
    }

    return res.status(200).json(blague); 

  } catch (error) {
    console.error('Erreur lors de la récupération de la blague:', error);
    return res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
}

   


  const ajouterPlusieursBlagues = async (req, res) => {
  try {
    const blagues = req.body.blagues; 
    if (!Array.isArray(blagues)) {
      return res.status(400).json({ message: "Le corps doit être un tableau de blagues." });
    }
    const nouvellesBlagues = await Blague.bulkCreate(blagues);
    res.status(201).json(nouvellesBlagues);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

 const supprimerBlague = async (req, res) => {
    try {
      const id = req.params.id;  
      const blague = await Blague.findByPk(id);  
      
      if (!blague) {
        return res.status(404).json({ message: 'Blague non trouvée' });
      }

      await blague.destroy(); 
      res.status(200).json({ message: 'Blague supprimée avec succès' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

module.exports = {
  consulterBlagueAleatoire,
  supprimerBlague,
  ajouterPlusieursBlagues,
  consulterBlague,
  mettreAJourBlague,
  consulterToutesBlagues,
  ajouterBlague
};

