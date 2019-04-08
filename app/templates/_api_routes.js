import { Router } from 'express';
import UserRouter from '../user/user.routes';
import { version } from '../../../package.json';

const apiRouter = Router();

// get version number of  the api
apiRouter.get('/', (req, res) => {
  res.json({ version });
});

apiRouter.use('/user', UserRouter);

export default apiRouter;
