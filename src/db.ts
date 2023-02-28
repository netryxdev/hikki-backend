import { MongoClient } from 'mongodb';

const uri = 'mongodb://localhost:27017/mydatabase';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectToDatabase(): Promise<MongoClient> {
  try {
    await client.connect();
    console.log('Conexão com o MongoDB estabelecida');
  } catch (err) {
    console.error('Erro ao conectar ao MongoDB', err);
  }
}

export { connectToDatabase, client };
