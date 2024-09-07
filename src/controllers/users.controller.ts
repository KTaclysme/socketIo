import { PrismaClient, User } from "@prisma/client";


const prisma = new PrismaClient();

export const getUserNameById = async (id: number): Promise<string | null> => {
    const user = await prisma.user.findUnique({
        where: { id },
        select: { name: true }
    });
    return user ? user.name : null;
};

export const addFriend = async (userId: number, friendName: string) => {
    const user = await prisma.user.findUnique({
        where: { id: userId }
    });

    if (!user) {
        throw new Error('Utilisateur non trouvé');
    }

    const friend = await prisma.user.findUnique({
        where: { name: friendName }
    });

    if (!friend) {
        throw new Error('Ami non trouvé');
    }

    const existingFriendship = await prisma.user.findFirst({
        where: {
            id: userId,
            friends: {
                some: { id: friend.id }
            }
        }
    });

    if (existingFriendship) {
        throw new Error('Vous êtes déjà amis avec cet utilisateur');
    }

    await prisma.user.update({
        where: { id: userId },
        data: {
            friends: {
                connect: { id: friend.id }
            }
        }
    });

    await prisma.user.update({
        where: { id: friend.id },
        data: {
            friends: {
                connect: { id: userId }
            }
        }
    });
};

export const getFriend = async (userId: number) => {
    return await prisma.user.findUnique({
        where: { id: userId },
        include: { friends: true }
    });
};

export const getAllFriends = async (userId: number) => {
    return await prisma.user.findMany({
        where: {
            friendOf: {
                some: {
                    id: userId
                }
            }
        }
    });
};

export const getUserByName = async (name: string): Promise<User | null> => {
    return await prisma.user.findUnique({
        where: { name },
    });
};

export const updateUser = async (userId: number, sockerId: string): Promise<User | null> => {
    return await prisma.user.update({
        where: { id: userId }, 
        data: { sockerId } 
    });
};

export const getUserById = async (id: number) => {
    return await prisma.user.findUnique({
        where: { id },
    });
};

export const getAllUsers = async () => {
    return await prisma.user.findMany();
};

export const addUser = async (name: string, password: string) => {
    return await prisma.user.create({
        data : {
            name,
            password
        }
    })
}

