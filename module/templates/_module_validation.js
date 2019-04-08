import Joi from 'joi';

export default {
  create<%= module %>: {
    body: {
      // email: Joi.string().email().required(),
      // password: Joi.string().min(6).max(60).required(),
    },
  },
  update<%= module %>: {
    body: {
      // email: Joi.string().email(),
      // password: Joi.string().min(6).max(60),
    },
  },
};
