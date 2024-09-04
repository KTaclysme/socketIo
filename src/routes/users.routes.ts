import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = Router();

router.get('/:id', async (req, res) => {
    const { id } = req.params
    await prisma.user.findUnique({
        where : {id: Number(id)},

    })
})

router.post('/signIn', async (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ error: 'Name is required' });
    }

    try {
        const newUser = await prisma.user.create({
            data: {
                name,
            }
        });
        res.status(201).json(newUser);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Error creating user' });
    }
})

export default router;
