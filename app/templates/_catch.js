import HTTPStatus from 'http-status';


const errors = (app) => {
  app.use((err, req, res, next) => {
    res.status(err.status || HTTPStatus.INTERNAL_SERVER_ERROR)
          .json({ ...err });
  });
};

const status404 = (app) => {
  app.use((req, res) => {
    res.status(404)
      .json({ msg: `Cannot ${req.method} to ${req.url}` });
  });
};


export { errors, status404 };
