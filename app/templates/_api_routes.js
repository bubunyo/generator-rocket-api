import { Router } from 'express';
import { version } from '../../../package.json';
import UserRouter from '../user/user.routes';

// Declare Router
const apiRouter = Router();

// get version number of  the api
apiRouter.get('/', (req, res) => {
  res.json({ version });
});

// Plug module routers
apiRouter.use('/user', UserRouter);

//

export default apiRouter;
