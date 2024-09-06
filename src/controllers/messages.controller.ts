import { PrismaClient } from '@prisma/client';
import { getUserById } from './users.controller';

const prisma = new PrismaClient();

export const getMessageById = async (id: number) => {
    return await prisma.message.findMany({
        where: { id },
    });
};

export const createMessage = async (data: { body: string, userFrom: number, userTo: number }) => {
    const userFrom = await getUserById(data.userFrom);

    if (!userFrom) {
        throw new Error(`User with ID ${data.userFrom} not found`);
    }

    return await prisma.message.create({
        data: {
            body: data.body,
            userFrom: {
                connect: { id: data.userFrom },  
            },
            userTo: {
                connect: { id: data.userTo },
            }
        },
    });
};
