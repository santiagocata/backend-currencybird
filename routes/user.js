const express = require("express");
const router = express.Router();
const { User, Token } = require("../models");
const tokenCreator = require("../utils/tokenCreator");

router.post("/register", (req, res, next) => {
  if (req.body.token) {
    Token.findOne({ where: { token: req.body.token } }).then((data) => {
      if (data) {
        User.create({ ...req.body, cash: 5000 })
          .then((user) => {
            User.findByPk(data.userId)
              .then((user) => {
                user.invitationSuccess();
                Token.destroy({ where: { token: req.body.token } });
              })
              .then(() => {
                res.sendStatus(200);
              });
          })
          .catch((error) =>
            res
              .status(400)
              .send(`El email ingresado ya se encuentra registrado`)
          );
      } else {
        res.status(401).send(`El link al que ha ingresado ya no es válido, será redirigido`);
      }
    });
  } else {
    User.create(req.body)
      .then((user) => {
        res.sendStatus(200);
      })
      .catch((error) =>
        res.status(400).send(`El email ingresado ya se encuentra registrado`)
      );
  }
});

router.post("/token", (req, res, next) => {
  User.findOne({ where: { email: req.body.email } })
    .then((user) => {
      Token.create({ token: tokenCreator(), userId: user.id }).then((data) => {
        res.send({ token: data.token });
      });
    })
    .catch((error) =>
      res.status(400).send("El email ingresado no se encuentra registrado")
    );
});

router.get("/", (req, res, next) => {
  User.findAll()
    .then((users) => {
      res.send(users);
    })
    .catch((error) => res.status(400).send(error));
});

module.exports = router;
