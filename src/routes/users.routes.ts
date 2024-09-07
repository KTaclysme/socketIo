import { Router } from 'express';
import {getUserById, addUser, getUserByName, getAllUsers} from '../controllers/users.controller'

const router = Router();

router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const user = await getUserById(Number(id));
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({error: 'Unavaible user id'})
    }   
})

router.get('/', async (req, res) => {
    try {
        const users = await getAllUsers(); 
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Unable to fetch users' });
    }   
});

router.get('/name/:name', async (req, res) => {
    try {
        const user = await getUserByName(req.params.name);
        if (user) {
            res.json({ id: user.id });
        } else {
            res.status(404).json({ message: 'Utilisateur non trouvé.' });
        }
    } catch (error) {
        console.error('Erreur lors de la recherche de l\'utilisateur:', error);
        res.status(500).json({ message: 'Erreur interne du serveur.' });
    }
});

router.post('/signIn', async (req, res) => {
    const { name, password } = req.body;

    if (!name) {
        return res.status(400).json({ error: 'unavaible name' });
    }

    try {
        const newUser = await addUser(String(name), String(password))
        res.status(201).json(newUser);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Error creating user' });
    }
})

export default router;
