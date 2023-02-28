import express from 'express';
import { connectToDatabase } from './db';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoute from './routes/auth.route';
import noteRoute from './routes/note.route';

dotenv.config();

const app = express();

// Configurar a conexão com o Mongoose
// mongoose.connect(process.env.MONGODB_URI as string, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// Testar Conexão com o banco de dados
async function startServer() {
  try {
    await connectToDatabase();
    console.log('API iniciada e conectada ao MongoDB');

    app.listen(PORT, () => {
      console.log(`Servidor iniciado na porta ${PORT}`);
    });
  } catch (err) {
    console.error('Erro ao iniciar o servidor', err);
  }
}

startServer();

// requisicao teste
app.get('/', async (req, res) => {
  const client = await connectToDatabase();
  const collection = client.db().collection('myCollection');
  const result = await collection.find().toArray();
  res.json(result);
});

// Middlewares globais
app.use(express.json());
app.use(cors());

// Rotas
app.use('/api/auth', authRoute);
app.use('/api/notes', noteRoute);

// Iniciar o servidor
const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Servidor iniciado na porta ${PORT}`);
// });
