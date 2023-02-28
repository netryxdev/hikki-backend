import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { connectToDatabase } from '../db';

const router = express.Router();

router.post('/register', async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Verificar se o email já está em uso
  const client = await connectToDatabase();
  const user = await client.db().collection('users').findOne({ email });

  if (user) {
    return res.status(400).json({ message: 'E-mail already registered' });
  }

  // Criptografar a senha
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Criar o usuário
  const newUser = await client.db().collection('users').insertOne({
    email,
    password: hashedPassword,
  });

  res.json(newUser.ops[0]);
});

router.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Verificar se o usuário existe
  const client = await connectToDatabase();
  const user = await client.db().collection('users').findOne({ email });

  if (!user) {
    return res.status(400).json({ message: 'Invalid email or password' });
  }

  // Verificar se a senha está correta
  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    return res.status(400).json({ message: 'Invalid email or password' });
  }

  // Criar o token JWT
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string);

  res.json({ token });
});

export default router;
