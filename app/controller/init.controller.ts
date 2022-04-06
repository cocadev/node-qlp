import db from '../config/db.js';
import bcrypt from 'bcryptjs';
import { InitialDB } from '../config/initial-db'

const User = db.user;

export const init = async(req, res) => {

  /////////////////////////////////////////////// User and Profile init ///////////////////////////////////////////////////
  await InitialDB.AUTH.map((item) => User.create({
    username: item.username,
    email: item.email,
    password: bcrypt.hashSync(item.password, 8),
    rule: item.rule
  }).then(() => {
    // return res.status(200).send({ "success": true, "message": "DB INFO Created!" });
  })
  )
  return res.status(200).send({ "success": true, "message": "DB INFO Created!" });
  /////////////////////////////////////////////// General init ///////////////////////////////////////////////////


}

