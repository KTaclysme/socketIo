import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = Router();

router.get('/users/:id', async (req, res) => {
    const { id } = req.params
    const user = await prisma.user.findUnique({
        where : {id: Number(id)},

    })
})

router.post('/users/signIn', async (req, res) => {
    const { id, name, dateCreation } = req.body
    const user = await prisma.user.create({
        data : {
            id,
            name,
            dateCreation
        }
    })
})

export default router;
