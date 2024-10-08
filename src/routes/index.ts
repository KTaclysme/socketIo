import { Router } from 'express';
import userRoutes from './users.routes';
import messageRoutes from './messages.routes'
import authRoutes from './auth.routes'

const router = Router();

router.get('/', (req, res) => {
  res.send('Bienvenue à l\'API de messagerie');
});

router.use('/users', userRoutes);
router.use('/messages', messageRoutes);
router.use('/auth', authRoutes);

export default router;
