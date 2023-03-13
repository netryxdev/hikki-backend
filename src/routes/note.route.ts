import express, { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { isAuthenticated } from '../middleware/auth.middleware';
import { connectToDatabase } from '../db';
import Note from '../models/note.model';

const router = express.Router();

router.get('/', isAuthenticated, async (req, res) => {
  const { user } = req.body;
  // const client = await connectToDatabase();
  // const notes = await client;
  const result = Note.find({ user: new ObjectId(user.id) });

  res.json(result);
});

router.post('/', isAuthenticated, async (req, res) => {
  // const { user, body } = req.body;
  const note = new Note({
    title: req.body.title,
    content:req.body.content,
    autor: req.params.ObjectId
  })
  const client = await connectToDatabase();

  const postNote = new Note({
    title: req.body.title,
    content: req.body.content
  });

  
  });

  res.json(note.ops[0]);
});

export default router;
