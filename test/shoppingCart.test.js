import { expect, agent, BASE_URL } from './setup';
import { clearDatabase, createUser, populateDatabase } from './utils';

describe('Shopping Cart', () => {
  let authToken;

  clearDatabase();
  populateDatabase();

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
          expect(item).to.have.property('product_id');
          expect(item).to.have.property('quantity');
        });
        done();
      });
  });
  it('add item', done => {
    const itemData = { quantity: 50 };
    const productId = 1;
    agent
      .post(`${BASE_URL}/shoppingCart/${productId}`)
      .set('Authorization', 'Bearer ' + authToken)
      .send(itemData)
      .end((error, res) => {
        if(error) { return done(error); };
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('quantity', 50);
        done();
      });
  });
  it('update item', done => {
    const itemData = { quantity: 20 };
    const productId = 1;
    agent
      .put(`${BASE_URL}/shoppingCart/${productId}`)
      .set('Authorization', 'Bearer ' + authToken)
      .expect(200)
      .send(itemData)
      .end((error, res) => {
        if(error) { return done(error); };
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('quantity', 20);
        done();
      });
  });
  it('delete item', done => {
    const productId = 1;
    agent
      .delete(`${BASE_URL}/shoppingCart/${productId}`)
      .set('Authorization', 'Bearer ' + authToken)
      .expect(200)
      .end((error, res) => {
        if(error) { return done(error); };
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('quantity');
        done();
      });
  });
  it('delete nonexistent item id', done => {
    const productId = 15;
    agent
      .delete(`${BASE_URL}/shoppingCart/${productId}`)
      .set('Authorization', 'Bearer ' + authToken)
      .expect(404)
      .end((error, res) => {
        if(error) { return  done(error); };
        expect(res.status).to.equal(404);
        expect(res.body).to.have.property('message', 'Item id does not exist!');
        done();
      });
  });
});