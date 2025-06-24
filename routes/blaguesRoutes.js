const express = require('express');
const router = express.Router();
const blagueController = require('../controllers/blaguesController');
/**
 * @swagger
 * /api/blagues/random:
 *   get:
 *     summary: Récupère une blague aléatoire
 *     responses:
 *       200:
 *         description: Blague récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 texte:
 *                   type: string
 *                   example: "Pourquoi les développeurs n'aiment pas la nature ?"
 *                 reponse:
 *                   type: string
 *                   example: "Parce qu'il y a trop de bugs."
 */
// Récupérer une blague aléatoire - 
router.get('/random', blagueController.consulterBlagueAleatoire);
/**
 * @swagger
 * /api/blagues:
 *   get:
 *     tags: [Blagues]
 *     summary: Récupère toutes les blagues
 *     responses:
 *       200:
 *         description: Liste des blagues
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Blague'
 */
// Récupérer toutes les blagues
router.get('/', blagueController.consulterToutesBlagues);
/**
 * @swagger
 * /api/blagues:
 *   post:
 *     tags: [Blagues]
 *     summary: Ajoute une nouvelle blague
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BlagueInput'
 *     responses:
 *       201:
 *         description: Blague ajoutée avec succès
 *       400:
 *         description: Données invalides
 */
// Ajouter une nouvelle blague
router.post('/', blagueController.ajouterBlague);
/**
 * @swagger
 * /api/blagues/bulk:
 *   post:
 *     tags: [Blagues]
 *     summary: Ajoute plusieurs blagues en une seule requête
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/BlagueInput'
 *     responses:
 *       201:
 *         description: Blagues ajoutées avec succès
 *       400:
 *         description: Données invalides
 */
// Ajouter plusieurs blagues
router.post('/bulk', blagueController.ajouterPlusieursBlagues);
/**
 * @swagger
 * /api/blagues/{id}:
 *   get:
 *     tags: [Blagues]
 *     summary: Récupère une blague par son ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la blague
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Blague trouvée
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Blague'
 *       404:
 *         description: Blague non trouvée
 */
// Récupérer une blague par son ID
router.get('/:id', blagueController.consulterBlague);
/**
 * @swagger
 * /api/blagues/{id}:
 *   put:
 *     tags: [Blagues]
 *     summary: Met à jour une blague (réponse)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la blague à mettre à jour
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BlagueInput'
 *     responses:
 *       200:
 *         description: Blague mise à jour avec succès
 *       400:
 *         description: Données invalides
 *       404:
 *         description: Blague non trouvée
 */
// Mettre à jour une blague (réponse)
router.put('/:id', blagueController.mettreAJourBlague);
/**
 * @swagger
 * /api/blagues/{id}:
 *   delete:
 *     tags: [Blagues]
 *     summary: Supprime une blague
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la blague à supprimer
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Blague supprimée avec succès
 *       404:
 *         description: Blague non trouvée
 */
// Supprimer une blague
router.delete('/:id', blagueController.supprimerBlague);


module.exports = router;