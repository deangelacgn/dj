import { expect, agent, BASE_URL } from './setup';

describe('Index page test', () => {
  it('gets base url', (done) => {
    agent
      .get(`${BASE_URL}/`)
      .expect(200)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('hello environment variable');
        done();
      });
  });
});
