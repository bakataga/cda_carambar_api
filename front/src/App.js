import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [blague, setBlague] = useState('');
  const [reponse, setReponse] = useState('');
  const [showReponse, setShowReponse] = useState(false);
  const [error, setError] = useState('');
  const [newBlague, setNewBlague] = useState('');
  const [newReponse, setNewReponse] = useState('');
  const [success, setSuccess] = useState('');
  const [allBlagues, setAllBlagues] = useState([]);

  const getBlagueAleatoire = async () => {
    try {
      setError('');
      setSuccess('');
      setShowReponse(false);
      const response = await axios.get('http://localhost:5000/api/blagues/random');

      if (response.data && response.data.texte && response.data.reponse) {
        setBlague(response.data.texte);
        setReponse(response.data.reponse);
      } else {
        throw new Error("Les données reçues sont invalides.");
      }
    } catch (error) {
      setError('Erreur lors de la récupération de la blague.');
      console.error('Erreur:', error.response || error);
    }
  };

  const postBlague = async () => {
    try {
      setError('');
      setSuccess('');
      if (!newBlague || !newReponse) {
        setError("Veuillez remplir les deux champs !");
        return;
      }

      const response = await axios.post('http://localhost:5000/api/blagues', {
        texte: newBlague,
        reponse: newReponse,
      });

      if (response.status === 201) {
        setSuccess("La blague a été ajoutée avec succès !");
        setNewBlague('');
        setNewReponse('');
      } else {
        throw new Error("Erreur lors de l'ajout de la blague.");
      }
    } catch (error) {
      setError('Erreur lors de l’ajout de la blague.');
      console.error('Erreur:', error.response || error);
    }
  };

  const getAllBlagues = async () => {
    try {
      setError('');
      setSuccess('');
      const response = await axios.get('http://localhost:5000/api/blagues');

      if (response.data) {
        setAllBlagues(response.data);
      } else {
        throw new Error("Les données reçues sont invalides.");
      }
    } catch (error) {
      setError('Erreur lors de la récupération des blagues.');
      console.error('Erreur:', error.response || error);
    }
  };

  return (
    <div>
      <h1>Carambar !</h1>
      <button onClick={getBlagueAleatoire}>Cliquez pour une blague</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}

      {blague && (
        <div>
          <p><strong>Blague : </strong>{blague}</p>
          {!showReponse && (
            <button onClick={() => setShowReponse(true)}>Réponse</button>
          )}
          {showReponse && <p><strong>Réponse : </strong>{reponse}</p>}
        </div>
      )}

      <div style={{ marginTop: '20px' }}>
        <h2>Ajouter une nouvelle blague</h2>
        <input
          type="text"
          placeholder="Entrez la blague"
          value={newBlague}
          onChange={(e) => setNewBlague(e.target.value)}
          style={{ marginRight: '10px', width: '300px' }}
        />
        <input
          type="text"
          placeholder="Entrez la réponse"
          value={newReponse}
          onChange={(e) => setNewReponse(e.target.value)}
          style={{ marginRight: '10px', width: '300px' }}
        />
        <button onClick={postBlague}>Poster la blague</button>
      </div>

      <div style={{ marginTop: '20px' }}>
        <h2>Voir toutes les blagues</h2>
        <button onClick={getAllBlagues}>Afficher toutes les blagues</button>
        <ul>
          {allBlagues.map((b, index) => (
            <li key={index}>
              <p><strong>Blague : </strong>{b.texte}</p>
              <p><strong>Réponse : </strong>{b.reponse}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
