import HTTPStatus from 'http-status';
import sequelize from 'sequelize';
import User from './user.model';


export const getUser = async (req, res) => {
  try {
    const user = await User.findById(id);
    res.send(user);
  } catch (ex) {
    console.log(ex);
    res.sendStatus(HTTPStatus.NOT_FOUND);
  }
};


export const register = async (req, res, next) => {
  try {
    const user = await User.create({
      name: req.body.name,
      password: req.body.password,
      email: invite.email,
    });

    const u = user.auth();
    return res.status(HTTPStatus.CREATED).json(u);
  } catch (ex) {
    if (err) next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });

    if (!user || !user.authenticate(req.body.password)) {
      return res.status(HTTPStatus.NOT_FOUND).json({ message: 'User not found' });
    }

    const u = user.auth();

    return res.json(u);
  } catch (ex) {
    if (err) next(err);
  }
};

