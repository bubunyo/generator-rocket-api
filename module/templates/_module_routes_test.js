import HTTPStatus from 'http-status';
import request from 'supertest-as-promised';
import { nuke } from '../../../helpers/test_helpers';
import <%= module %> from '../<%= table %>.model';
import server from '../../../server';

describe('<%= module %>:Routes', async () => {
  beforeEach(async () => {
    await nuke();
  });

  it.skip('skip this test', async () => {
    const <%= table %> = await <%= module %>.create({
          //
    });

    const res = await request(server).get('/api/<%= table %>/');

    expect(res.statusCode).toBe(HTTPStatus.OK);
    expect(res.body.id).toBe(<%= table %>.id);
  });
});
