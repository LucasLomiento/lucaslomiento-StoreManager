const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);
const { expect } = chai;


const salesController = require('../../../src/controllers/sales.controller');
const salesService = require('../../../src/services/sales.service');

describe('Testa o controller de produtos', () => {
  afterEach(() => sinon.restore());

  describe('Testa se sucesso', () => {
    it('register com DATA', async () => {
      sinon.stub(salesService, 'register').resolves({
        type: null,
        statusCode: 201,
        message: {
          id: 1,
          itemsSold: [
            {
              "productId": 1,
              "quantity": 1
            }]
        },
      });
      const req = { body: { name: 'Produto' } };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      await salesController.register(req, res);
      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.been.calledWith({
        id: 1,
        itemsSold: [{ productId: 1, quantity: 1 }]
      });
    });
  });

  describe('Testa se erro', () => {
    it('register com DATA', async () => {
      sinon.stub(salesService, 'register').resolves({
        type: 'PRODUCT_NOT_FOUND',
        statusCode: 404,
        message: 'Product not found',
      });
      const req = { body: { name: 'Produto' } };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      await salesController.register(req, res);
      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.been.calledWith({ message: 'Product not found' });
    });
  });
});