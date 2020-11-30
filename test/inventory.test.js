import { expect, agent, BASE_URL } from './setup';

describe('Inventory', () => {
  it('get products', done => {
    agent
      .get(`${BASE_URL}/inventory`)
      .expect(200)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.inventory).to.instanceOf(Array);
        res.body.inventory.forEach(product => {
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
      .post(`${BASE_URL}/inventory`)
      .send(data)
      .expect(200)
      .end((err, res) => {
        if (err) { return done(err); };
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('product_id');
        expect(res.body).to.have.property('name', data.name);
        expect(res.body).to.have.property('available_quantity').which.is.a('number').above(0).and.satisfy(Number.isInteger);
        expect(res.body).to.have.property('cost_per_unit');
        done();
      });
  });
});