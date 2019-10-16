import jwt from 'jsonwebtoken';
import db from '../config/db.js';
import * as config from '../config/env'

const User = db.user;

export const verifyToken = (req, res, next) => {
  let token = req.headers['x-access-token'];

  if (!token) {
    return res.status(403).send({
      auth: false, message: 'No token provided.'
    });
  }

  jwt.verify(token, config.SECRET, (err, decoded) => {
    if (err) {
      return res.status(500).send({
        auth: false,
        message: err
      });
    }

    req.userId = decoded.id;

    next();
  });
}

export const isAdmin = (req, res, next) => {


  User.findByPk(req.userId)
    .then(user => {

      if(!user){
        res.status(403).send(({
          auth: false,
          message: "Authentication fail"
        }));
        return false
      }

      if (user.dataValues.role === "ADMIN") {
        next();
        return;
      }

      res.status(403).send(({
        auth: false,
        message: "Require Admin Role"
      }));

      return;

    })
}