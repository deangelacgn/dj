import { expect, agent, BASE_URL } from './setup';
import { clearDatabase, createUser } from './utils';

describe('Shopping Cart', () => {
  let authToken;

  clearDatabase();
  createUser((token) => {
    authToken = token;
  });

  it('list items', done => {
    agent
      .get(`${BASE_URL}/shoppingCart`)
      .set('Authorization', 'Bearer ' + authToken)
      .expect(200)
      .end((error, res) => {
        if(error) { return done(error); };
        expect(res.status).to.equal(200);
        const itemsInCart = res.body;
        itemsInCart.forEach(item => {
          expect(item).to.have.property('id');
          expect(item).to.have.property('quantity');
        });
        done();
      });
  });
  it('add item', done => {
    const itemData = { id: 1, quantity: 50 };
    agent
      .post(`${BASE_URL}/shoppingCart`)
      .set('Authorization', 'Bearer ' + authToken)
      .send(itemData)
      .end((error, res) => {
        if(error) { return done(error); };
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('id', 1);
        expect(res.body).to.have.property('quantity', 50);
        done();
      });
  });
  it('update item', done => {
    const itemData = { id: 1, quantity: 20 };
    agent
      .put(`${BASE_URL}/shoppingCart`)
      .set('Authorization', 'Bearer ' + authToken)
      .expect(200)
      .send(itemData)
      .end((error, res) => {
        if(error) { return done(error); };
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('id', 1);
        expect(res.body).to.have.property('quantity', 20);
        done();
      });
  });
  it('delete item', done => {
    const itemData = { id: 1 , clearEverything: false };
    agent
      .delete(`${BASE_URL}/shoppingCart`)
      .set('Authorization', 'Bearer ' + authToken)
      .expect(200)
      .send(itemData)
      .end((error, res) => {
        if(error) { return done(error); };
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('id');
        expect(res.body).to.have.property('quantity');
        done();
      });
  });
});