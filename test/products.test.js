import { expect, agent, BASE_URL } from './setup';
import { clearDatabase, createUser } from './utils';

describe('Products', () => {
  let authToken;

  clearDatabase();
  createUser((token) => {
    authToken = token;
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
  it('search products', done => {

    const searchQueryData = {
      search_pattern: 'produ',
      num_results: 1,
      offset: 0,
    };

    agent
      .get(`${BASE_URL}/searchProduct`)
      .set('Authorization', 'Bearer ' + authToken)
      .query(searchQueryData)
      .expect(200)
      .end((error, res) => {
        if(error) { return done(error); };
        expect(res.status).to.equal(200);
        const searchResults = res.body;
        searchResults.forEach(searchResult => {
          expect(searchResult).to.have.property('id');
          expect(searchResult).to.have.property('name', 'product name'),
          expect(searchResult).to.have.property('available_quantity', 1);
          expect(searchResult).to.have.property('cost_per_unit', '12.50');
        });
        done();
      });
  });
});