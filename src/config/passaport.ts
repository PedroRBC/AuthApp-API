import * as passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import * as bcrypt from "bcrypt";

import { prisma } from "../lib/prisma";

passport.use(
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
    },
    async (username, password, done) => {
      try {
        // Verifique se o usuário existe no banco de dados
        // e se a senha fornecida é válida
        const user = await prisma.user.findUnique({
          where: {
            username
          },
        });
        if (!user) {
          return done(null, false, {
            message: "Incorrect username or password",
          });
        }
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {

          return done(null, false, {
            message: "Incorrect username or password",
          });
        }


        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

export default passport;