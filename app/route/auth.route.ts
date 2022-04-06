import * as authJwt from '../auth/verifyJwtToken';
import * as valid from '../auth/validation';
import * as controller from '../controller/auth.controller';

export default function(app) {
  
  app.post('/api/auth/signup', [valid.signUp], controller.signup);
  app.post('/api/auth/signin', [valid.signIn], controller.signin);
  app.get('/api/test/investor', [authJwt.verifyToken], controller.investorContent);
  app.get('/api/test/admin', [authJwt.verifyToken, authJwt.isAdmin], controller.adminBoard);
  app.get('/api/investors', [authJwt.verifyToken], controller.investorAll);
  app.get('/api/admins', [authJwt.verifyToken, authJwt.isAdmin], controller.adminAll);

}