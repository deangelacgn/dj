import { expect, agent, BASE_URL } from './setup';

describe('Products', () => {
  let authToken;
  before( async () => {
    const registerData = {
      username: 'janedoe',
      email: 'janedoe@somemail.com',
      password: '12345',
    };
    
    await agent.post(`${BASE_URL}/user`).send(registerData);

    const loginData = {
      user_login: 'janedoe@somemail.com',
      password: '12345',
    };
    const authResponse = await agent.post(`${BASE_URL}/login`).expect(200).send(loginData);
    authToken = authResponse.body.token;
  });

  it('get products', done => {
    agent
      .get(`${BASE_URL}/products`)
      .set('Authorization', 'Bearer ' + authToken)
      .expect(200)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.products).to.instanceOf(Array);
        res.body.products.forEach(product => {
          expect(product).to.have.property('name');
          expect(product).to.have.property('available_quantity');
          expect(product).to.have.property('cost_per_unit');
        });
        done();
      });
  });
  it('post products', done => {
    const data = { name: "product name", available_quantity: 1, cost_per_unit: 12.50 };
    agent
      .post(`${BASE_URL}/products`)
      .set('Authorization', 'Bearer ' + authToken)
      .send(data)
      .expect(200)
      .end((err, res) => {
        if (err) { return done(err); };
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('id');
        expect(res.body).to.have.property('name', data.name);
        expect(res.body).to.have.property('available_quantity').which.is.a('number').above(0).and.satisfy(Number.isInteger);
        expect(res.body).to.have.property('cost_per_unit');
        done();
      });
  });
});