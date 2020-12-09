import { expect, agent, BASE_URL } from './setup';
import { clearDatabase, createUser, populateDatabase } from './utils';

describe('Products', () => {
  let authToken;

  clearDatabase();
  populateDatabase();

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
      .get(`${BASE_URL}/products/search`)
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
  it('search pagination and ordering', async() => {
    const searchQueries = [ {
      search_pattern: " ",
      num_results: 3,
      offset: 0,
    },
    {
      search_pattern: " ",
      num_results: 3,
      offset: 3,
    },
    {
      search_pattern: " ",
      num_results: 6,
      offset: 0,
    }];

    const searchResults = [];

    for (const searchQuery of searchQueries) {
      const searchQueryResponse = await agent
        .get(`${BASE_URL}/products/search`)
        .set('Authorization', 'Bearer ' + authToken)
        .query(searchQuery)
        .expect(200);
      searchResults.push(searchQueryResponse.body);
    }

    expect(searchResults[0].length).to.equal(3);
    expect(searchResults[1].length).to.equal(3);
    expect(searchResults[2].length).to.equal(6);

    const firstSearchResults = searchResults[2].slice(0, 3);
    const secondSearchResults = searchResults[2].slice(3);

    expect(searchResults[0]).to.eql(firstSearchResults);
    expect(searchResults[1]).to.eql(secondSearchResults);
  });
});