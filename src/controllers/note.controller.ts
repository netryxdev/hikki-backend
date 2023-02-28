import { Request, Response } from 'express';
import Note from '../models/note.model';

const createNote = async (req: Request, res: Response) => {
  const { title, content } = req.body;

  try {
    const newNote = await Note.create({
      title,
      content,
      user: res.locals.user._id, // adiciona o id do usuário ao criar a nota
    });

    res.status(201).json({ note: newNote });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao criar a nota' });
  }
};

const getNotes = async (req: Request, res: Response) => {
  try {
    const notes = await Note.find({ user: res.locals.user._id });

    res.status(200).json({ notes });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar as notas' });
  }
};

export default {
  createNote,
  getNotes,
};
