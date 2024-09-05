import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getMessageById = async (id: number) => {
    return await prisma.message.findMany({
        where: { id },
    });
};

export const createMessage = async (data: { body: string, userFrom: number, userTo: number }) => {
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
