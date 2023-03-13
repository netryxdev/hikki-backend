import mongoose from "mongoose";
import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { connectToDatabase } from '../db';
import User from "../models/user.model";

const router = express.Router();

router.post('/register', async (req, res, next) => {
    bcrypt.hash(req.body.password,10)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                password: hash
            });
            user.save()
        })
})

export default router;
