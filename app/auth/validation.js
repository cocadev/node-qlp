export const signUp = (req, res, next) => {
  var password = req.body.password_digest
  if (!password) { res.status(400).send({ "success": false, "message": "Password is empty" }); return; }
  next();
}

export const signIn = (req, res, next) => {
  var email = req.body.email
  var password = req.body.password_digest
  if (!email) { res.status(400).send({ "success": false, "message": "Email is empty" }); return; }
  if (!password) { res.status(400).send({ "success": false, "message": "Password is empty" }); return; }
  next();
}