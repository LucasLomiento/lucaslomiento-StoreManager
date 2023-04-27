const { expect } = require('chai');
const sinon = require('sinon');

const productsService = require('../../../src/services/products.service');
const productsModel = require('../../../src/models/products.model');
const { getAllMockWithData } = require('./mock/products.mock');

describe('Testa o service de produtos', () => {
  afterEach(() => sinon.restore());

  describe('Testa se sucesso', () => {
    it('Chamndo getAll com Data', async () => {
      sinon.stub(productsModel, 'getAll').resolves(getAllMockWithData);
      const result = await productsService.getAll();
      expect(result).to.be.deep.equal(getAllMockWithData);
    });

    it('Chamando getById com Data com id valido', async () => {
      sinon.stub(productsModel, 'getById').resolves(getAllMockWithData[0]);
      const result = await productsService.getById(1);
      expect(result).to.be.deep.equal(getAllMockWithData[0]);
    });

    it('Chamando getById com Data com id invalido', async () => {
      sinon.stub(productsModel, 'getById').resolves(null);
      const result = await productsService.getById(1);
      expect(result).to.be.deep.equal({
        type: 404,
        message: { message: 'Product not found' },
      });
    });

    it('Chamando register com Data', async () => {
      sinon.stub(productsModel, 'register').resolves({ id: 1, name: 'Produto' });
      const result = await productsService.register('Produto');
      expect(result).to.be.deep.equal({ id: 1, name: 'Produto' });
    });
  });
});