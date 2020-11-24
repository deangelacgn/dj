import { expect, agent, BASE_URL } from './setup';

describe('Messages', () => {
  it('get messages page', done => {
    agent
      .get(`${BASE_URL}/messages`)
      .expect(200)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.messages).to.be.instanceOf(Array);
        res.body.messages.forEach(m => {
          expect(m).to.have.property('name');
          expect(m).to.have.property('message');
        });
        done();
      });
  });
  it('post messages', done => {
    const data = { name: 'some name', message: 'new message' };
    agent
      .post(`${BASE_URL}/messages`)
      .send(data)
      .expect(200)
      .end((err, res) => {
        if (err) { return done(err); };
        expect(res.status).to.equal(200);
        expect(res.body.messages).to.be.instanceOf(Array);
        res.body.messages.forEach(m => {
          expect(m).to.have.property('id');
          expect(m).to.have.property('name', data.name);
          expect(m).to.have.property('message', ` SAYS: ${data.message}`);
        });
        done();
      });
  });
});