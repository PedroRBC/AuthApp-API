import { Router } from "express";
import * as jwt from 'jsonwebtoken';
import * as bcrypt from "bcrypt";
import * as process from 'node:process'
const routes = Router();
import passport from './config/passaport';
import { Request, Response, NextFunction } from 'express'
import { prisma } from "./lib/prisma";

interface UserPayload {
  id: string,
  username: string,
  password: string,
  admin: boolean
}

const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization!.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as UserPayload

    req.user = decoded
    next();
  } catch (error) {
    return res.status(401).json({
      message: 'Auth failed'
    });
  }
};


routes.get('/profile', checkAuth, async (req, res) => {
  const userData = await prisma.user.findUnique({
    where: {
      id: req.user.id
    }
  })


  res.json(userData);
});

routes.post('/login', passport.authenticate('local', { session: false }), (req, res) => {
  // Emitir token de acesso

  const token = jwt.sign({ id: req.user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});


routes.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    // Verifica se o nome de usuário ou email já estão sendo usados
    const existingUser = await prisma.user.findUnique({
      where: { username }
    });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already in use' });
    }
    // Continua o processo de registro
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { username, password: hashedPassword }
    });
    res.json({ message: 'User created' });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = routes;
