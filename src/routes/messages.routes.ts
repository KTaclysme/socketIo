import { Router } from 'express';
import { getMessageById, createMessage } from '../controllers/messages.controller';

const router = Router();

router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const messages = await getMessageById(Number(id));
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching messages' });
    }
});

router.post('/post', async (req, res) => {
    const { body, dateCreation, userFrom, userTo } = req.body;

    try {
        const newMessage = await createMessage({ body, userFrom, userTo }); 
        res.status(201).json(newMessage);
    } catch (error) {
        res.status(500).json({ error: 'Error creating message' });
    }
});

export default router;
