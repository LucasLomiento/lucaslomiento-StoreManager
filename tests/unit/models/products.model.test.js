const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/models/connection');
const productsModel = require('../../../src/models/products.model');
const { getAllMockWithData } = require('./mock/products.mock');

describe('Testa o model de produtos', () => {
  describe('Testa se sucesso', () => {

    afterEach(() => sinon.restore());

    it('Chamando getAll com DATA', async () => {
      sinon.stub(connection, 'execute').resolves([getAllMockWithData]);
      
      const result = await productsModel.getAll();
      expect(result).to.be.deep.equal(getAllMockWithData);
    });

    it('Chamando getAll sem DATA', async () => {
      sinon.stub(connection, 'execute').resolves([[]]);
      
      const result = await productsModel.getAll();
      expect(result).to.be.an('array').to.be.empty;
    });

    it('Chamando getById com DATA', async () => {
      sinon.stub(connection, 'execute').resolves([getAllMockWithData]);
      
      const result = await productsModel.getById(1);
      expect(result).to.be.deep.equal(getAllMockWithData[0]);
    });

    it('Chamando getById sem DATA', async () => {
      sinon.stub(connection, 'execute').resolves([[]]);
      
      const result = await productsModel.getById(1);
      expect(result).to.be.an('undefined');
    });
  });

  describe('Testa se erro', () => {
      
    afterEach(() => sinon.restore());
  
    it('Chamando getAll com erro', async () => {
      sinon.stub(connection, 'execute').throws(new Error('Erro de conexão'));
      
      try {
        await productsModel.getAll();
        expect.fail();
      } catch (error) {
        expect(error.message).to.be.equal('Erro de conexão');
      }
    });
  
    it('Chamando getById com erro', async () => {
      sinon.stub(connection, 'execute').throws(new Error('Erro de conexão'));
        
      try {
        await productsModel.getAll();
        expect.fail();
      } catch (error) {
        expect(error.message).to.be.equal('Erro de conexão');
      }
    });
  });
});