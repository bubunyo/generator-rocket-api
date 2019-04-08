import app from './server';
import constants from './config/constants';

app.listen(constants.PORT, () => {
  console.log(`Listening on port ${constants.PORT}`);
});

export default app;
