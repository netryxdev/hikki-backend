import mongoose, { Date } from 'mongoose';

interface Note {
  title: string;
  content: string;
  autor: mongoose.Schema.Types.ObjectId | string;
  createdAt: Date;
}

const noteSchema = new mongoose.Schema<Note>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    autor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now}
  },
  { timestamps: true }
);

const Note = mongoose.model<Note>('Note', noteSchema);

export default Note;
