import { Router } from 'express';
import userRoutes from './user.routes';

const router = Router();

router.get('/', (req, res) => {
  res.send('Bienvenue à l\'API de messagerie');
});

router.use('/users', userRoutes);

export default router;
