import { Router } from 'express';
import validate from 'express-validation';
import * as c from './<%= table %>.controller';
import v from './<%= table %>.validation';
import { authJwt } from '../../config/passport';

const <%= module %>Router = Router();

<%= module %>Router.get('/:id', authJwt, c.get<%= module %>);
<%= module %>Router.post('/', validate(v.create<%= module %>), c.create<%= module %>);
<%= module %>Router.patch('/:id', validate(v.update<%= module %>), authJwt, c.update<%= module %>);
<%= module %>Router.delete('/:id', authJwt, c.delete<%= module %>);

export default <%= module %>Router;
