import { expect, agent, BASE_URL } from './setup';
import { clearDatabase } from './utils';

describe('Users', () => {
  clearDatabase();
  it('register user', done => {
    const newUserData = {
      name: 'John Doe',
      username: 'JohnDoe',
      email: 'johndoe@somemail.com',
      password: '12345',
    };

    agent
      .post(`${BASE_URL}/user`)
      .send(newUserData)
      .expect(200)
      .end((error, res) => {
        if(error) { return done(error); };
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('Signed up successfully!');
        expect(res.body).to.have.property('id');
        expect(res.body).to.have.property('name');
        expect(res.body).to.have.property('username');
        expect(res.body).to.have.property('email');
        expect(res.body.name).to.equal('John Doe');
        expect(res.body.username).to.equal('JohnDoe');
        expect(res.body.email).to.equal('johndoe@somemail.com');
        done();
      });
  });
  it('login using email', done => {
    const loginData = {
      user_login: 'johndoe@somemail.com',
      password: '12345',
    };
    agent
      .post(`${BASE_URL}/login`)
      .send(loginData)
      .expect(200)
      .end((error, res) => {
        if (error) { return done(error); };
        expect(res.body).to.have.property('token');
        done();
      });
  });
  it('login using username', done => {
    const loginData = {
      user_login: 'JohnDoe',
      password: '12345',
    };
    agent
      .post(`${BASE_URL}/login`)
      .send(loginData)
      .expect(200)
      .end((error, res) => {
        if(error) { return done(error); }
        expect(res.body).to.have.property('token');
        done();
      });
  });
});