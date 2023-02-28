import express, { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { isAuthenticated } from '../auth/auth.middleware';
import { connectToDatabase } from '../db';

const router = express.Router();

router.get('/', isAuthenticated, async (req, res) => {
  const { user } = req.body;
  const client = await connectToDatabase();
  const notes = await client
    .db()
    .collection('notes')
    .find({ user: new ObjectId(user.id) })
    .toArray();

  res.json(notes);
});

router.post('/', isAuthenticated, async (req, res) => {
  const { user, body } = req.body;
  const client = await connectToDatabase();

  const note = await client.db().collection('notes').insertOne({
    ...body,
    user: new ObjectId(user.id),
  });

  res.json(note.ops[0]);
});

export default router;
