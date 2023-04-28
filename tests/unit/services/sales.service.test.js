const { expect } = require('chai');
const sinon = require('sinon');

const salesModel = require('../../../src/models/sales.model');
const salesService = require('../../../src/services/sales.service');
const mock = require('../mock/sales.mock');

describe('Testa o service de sales', () => {
  describe('Testa se sucesso', () => {

    afterEach(() => sinon.restore());

    it('register com DATA', async () => {
      sinon.stub(salesModel, 'registerSale').resolves(1)
      sinon.stub(salesModel, 'registerProduct').resolves(mock.request);
      
      const result = await salesService.register(mock.request);
      expect(result).to.be.deep.equal({
        type: null,
        statusCode: 201,
        message: {
          id: 1,
          itemsSold: mock.request,
        },
      });
    });
  });

  describe('Testa se falha', () => {
      
      afterEach(() => sinon.restore());
  
      it('register com DATA', async () => {
      sinon.stub(salesModel, 'registerSale').resolves(1)
      sinon.stub(salesModel, 'registerProduct').resolves(mock.request);
      
      const result = await salesService.register(mock.requestFail);
        expect(result).to.be.deep.equal({
          message: "Product not found",
          statusCode: 404,
          type: "PRODUCT_NOT_FOUND"
        });
    });
  });
});