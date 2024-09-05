import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/jwt.utils';

const prisma = new PrismaClient();

export const register = async (req: Request, res: Response): Promise<void> => {
  const { name, password } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({ where: { name } });
    if (existingUser) {
      res.status(400).json({ error: 'name already in use' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        password: hashedPassword,
      },
    });

    const token = generateToken(user.id);

    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { name, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { name },
    });

    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ error: 'Invalid password' });
      return;
    }

    const token = generateToken(user.id);

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};
