import 'dotenv/config';

const PORT = process.env.PORT || 3254;

import express, { Application } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import { prisma } from "./lib/prisma";
import passport from './config/passaport';

import './config/passaport.ts';
const app: Application = express();

app.use(cors({ origin: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan("dev"));

app.use(compression());

app.use(passport.initialize());

app.use(require("./routes"));

app.listen(PORT, () => {
  console.log(
    `\n ⚡-  HTTP server running in: \n💻 -  http://localhost:${PORT}  or \n🌎 -  http://192.168.99.114:${PORT}\n`
  );
});

const spinner = ["|", "/", "-", "\\"];
let spinnerI = 0;

process.on("SIGINT", async () => {
  const interval = setInterval(() => {
    process.stdout.write(
      `\r${spinner[spinnerI]} | Fechando o Servidor Aguarde...`
    );
    spinnerI = (spinnerI + 1) % spinner.length;
  }, 100);

  prisma.$disconnect();

  setTimeout(() => {
    clearInterval(interval);
    console.log("\n\nAplicativo encerrado.");
    process.exit(0);
  }, 2000);
});
