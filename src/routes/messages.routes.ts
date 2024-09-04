import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = Router();

router.get('/:id', async (req, res) => {
    const { id } = req.params
    await prisma.message.findMany({
        where : {id: Number(id)},
    })
})

router.post('/post', async (req, res) => {
    const { body, dateCreation, userFrom, userTo } = req.body
    await prisma.message.create({
        data : {
            body,
            dateCreation,
            userFrom,
            userTo
        }
    })
})

export default router;
