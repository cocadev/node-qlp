import db from '../config/db.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import * as config from '../config/env'

const User = db.user;
const Role = db.role;

export const signup = (req, res) => {
  
  // Save User to Database
  if(!req.body.password_digest){
    res.status(400).send({ "success": false, "message": "Password is empty!" });
    return false
  }

  User
    .create({
      uid: req.body.uid,
      email: req.body.email,
      password_digest: bcrypt.hashSync(req.body.password_digest, 8),
      role: req.body.role,
      eth_addr: req.body.eth_addr,
    })
    .then(function (user) {
      res.status(200).send({ "success": true, "message": "User registered successfully!", "user": user });
    })
    .catch(function (err) {
      res.status(400).send({ "success": false, "message": err.errors[0].message });
    })
}

export const signin = (req, res) => {
  console.log("Sign-In");

  User
    .findOne({
      where: {
        email: req.body.email
      }
    })
    .then(function (user) {
      if (!user) {
        res.status(404).send({ "success": false, message: "User not found" });
        return false
      }

      var passwordIsValid = bcrypt.compareSync(req.body.password_digest, user.password_digest);
      if (!passwordIsValid) {
        res.status(401).send({ success: false, accessToken: null, message: "Invalid Password!" });
        return false
      }

      var token = jwt.sign({ id: user.id }, config.SECRET, {
        expiresIn: 86400 // expires in 24 hours
      });

      res.status(200).send({ success: true, accessToken: token });

    })
    .catch(function (err) {
      console.log('******** err ********', err)

      res.status(400).send({ "success": false, "message": err });
    });
}

export const investorContent = (req, res) => {
  User.findOne({
    where: { id: req.userId },
    attributes: ['username', 'email', 'role'],
    // include: [{
    //   model: Role,
    //   attributes: ['id', 'username'],
    //   through: {
    //     attributes: ['userId', 'roleId'],
    //   }
    // }]
  }).then(user => {
    res.status(200).json({
      "description": "User Content Page",
      "user": user
    });
  }).catch(err => {
    res.status(500).json({
      "description": "Can not access User Page",
      "error": err
    });
  })
}

export const investorAll = (req, res) => {
  console.log(' ** request **', req.role)
  User.findAll({
    where: { role: 'INVESTOR' },
    attributes: ['uid', 'email', 'eth_addr'],
  }).then(user => {
    res.status(200).json({
      "success": true,
      "users": user
    });
  }).catch(err => {
    res.status(500).json({
      "description": "Can not access Investor Page",
      "error": err
    });
  })
}

export const adminAll = (req, res) => {
  User.findAll({
    where: { role: 'ADMIN' },
    attributes: ['uid', 'email', 'role'],
  }).then(user => {
    res.status(200).json({
      "success": true,
      "users": user
    });
  }).catch(err => {
    res.status(500).json({
      "description": "Can not access User Page",
      "error": err
    });
  })
}

export const pmAll = (req, res) => {
  console.log(' ** request **', req.role)
  User.findAll({
    where: { role: 'PM' },
    attributes: ['username', 'email', 'role'],
  }).then(user => {
    res.status(200).json({
      "success": true,
      "users": user
    });
  }).catch(err => {
    res.status(500).json({
      "description": "Can not access User Page",
      "error": err
    });
  })
}

export const adminBoard = (req, res) => {
  User.findOne({
    where: { id: req.userId },
    attributes: ['name', 'username', 'email'],
    include: [{
      model: Role,
      attributes: ['id', 'name'],
      through: {
        attributes: ['userId', 'roleId'],
      }
    }]
  }).then(user => {
    res.status(200).json({
      "description": "Admin Board",
      "user": user
    });
  }).catch(err => {
    res.status(500).json({
      "description": "Can not access Admin Board",
      "error": err
    });
  })
}

export const managementBoard = (req, res) => {
  User.findOne({
    where: { id: req.userId },
    attributes: ['name', 'username', 'email'],
    include: [{
      model: Role,
      attributes: ['id', 'name'],
      through: {
        attributes: ['userId', 'roleId'],
      }
    }]
  }).then(user => {
    res.status(200).json({
      "description": "Management Board",
      "user": user
    });
  }).catch(err => {
    res.status(500).json({
      "description": "Can not access Management Board",
      "error": err
    });
  })
}
