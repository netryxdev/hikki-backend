import mongoose, { Schema, Document } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator'

interface User extends Document {
    name: string;
    email: string;
    password: string;
}

const UserSchema: Schema = new mongoose.Schema<User>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

UserSchema.plugin(uniqueValidator, { message: 'O campo {PATH} deve ser único.'})

export default mongoose.model<User>('User', UserSchema);

