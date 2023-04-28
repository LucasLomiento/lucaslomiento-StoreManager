const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);
const { expect } = chai;


const productsController = require('../../../src/controllers/products.controller');
const productsService = require('../../../src/services/products.service');
const { getAllMockWithData } = require('../mock/products.mock');

describe('Testa o controller de produtos', () => {
  afterEach(() => sinon.restore());

  describe('Testa se sucesso', () => {
    it('Chamando getAll com Data', async () => {
      sinon.stub(productsService, 'getAll').resolves(getAllMockWithData);
      const req = {};
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      await productsController.getAll(req, res);
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.been.calledWith(getAllMockWithData);
    });

    it('Chamando getById com Data com id valido', async () => {
      sinon.stub(productsService, 'getById').resolves(getAllMockWithData[0]);
      const req = { params: { id: 1 } };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      await productsController.getById(req, res);
      expect(res.status).to.been.calledWith(200);
      expect(res.json).to.been.calledWith(getAllMockWithData[0])
    });

    it('Chamando getById com Data com id invalido', async () => {
      sinon.stub(productsService, 'getById').resolves({
      type: 404, message: { message: 'Product not found' },
    });
      const req = { params: { id: 1 } };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      await productsController.getById(req, res);
      expect(res.status).to.been.calledWith(404);
      expect(res.json).to.been.calledWith({ message: 'Product not found' })
    });

    it('Chamando register com Data', async () => {
      sinon.stub(productsService, 'register').resolves({ id: 1, name: 'Produto' });
      const req = { body: { name: 'Produto' } };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      await productsController.register(req, res);
      expect(res.status).to.been.calledWith(201);
      expect(res.json).to.been.calledWith({ id: 1, name: 'Produto' })
    });
  });
});