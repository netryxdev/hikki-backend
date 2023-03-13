import mongoose, { Document, Model, Schema, ConnectOptions } from 'mongoose';

const uri = 'mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority';

async function connectToDatabase() {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions);
    console.log('Conexão com o MongoDB estabelecida');
  } catch (err) {
    console.error('Erro ao conectar ao MongoDB', err);
  }
}

export { connectToDatabase };

