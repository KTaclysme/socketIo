import { PrismaClient, User } from "@prisma/client";


const prisma = new PrismaClient();

export const getUserNameById = async (id: number): Promise<string | null> => {
    const user = await prisma.user.findUnique({
        where: { id },
        select: { name: true }
    });
    return user ? user.name : null;
};

export const getUserByName = async (name: string): Promise<User | null> => {
    return await prisma.user.findUnique({
        where: { name },
    });
};

export const updateUser = async (userId: number, sockerId: string): Promise<User | null> => {
    return await prisma.user.update({
        where: { id: userId }, // Identifier l'utilisateur par ID
        data: { sockerId } // Mettre à jour le champ sockerId
    });
};

export const getUserById = async (id: number) => {
    return await prisma.user.findUnique({
        where: { id },
    });
};

export const addUser = async (name: string, password: string) => {
    return await prisma.user.create({
        data : {
            name,
            password
        }
    })
}

