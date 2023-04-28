const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/models/connection');
const productsModel = require('../../../src/models/products.model');
const { getAllMockWithData } = require('../mock/products.mock');

describe('Testa o model de produtos', () => {
  describe('Testa se sucesso', () => {

    afterEach(() => sinon.restore());

    it('getAll com DATA', async () => {
      sinon.stub(connection, 'execute').resolves([getAllMockWithData]);
      
      const result = await productsModel.getAll();
      expect(result).to.be.deep.equal(getAllMockWithData);
    });

    it('getAll sem DATA', async () => {
      sinon.stub(connection, 'execute').resolves([[]]);
      
      const result = await productsModel.getAll();
      expect(result).to.be.an('array').to.be.empty;
    });

    it('getById com DATA', async () => {
      sinon.stub(connection, 'execute').resolves([getAllMockWithData]);
      
      const result = await productsModel.getById(1);
      expect(result).to.be.deep.equal(getAllMockWithData[0]);
    });

    it('getById sem DATA', async () => {
      sinon.stub(connection, 'execute').resolves([[]]);
      
      const result = await productsModel.getById(1);
      expect(result).to.be.an('undefined');
    });

    it('register com DATA', async () => {
      sinon.stub(connection, 'execute').resolves([{
        fieldCount: 0,
        affectedRows: 1,
        insertId: 1,
        info: '',
        serverStatus: 2,
        warningStatus: 0
      }]);
      
      const result = await productsModel.register('Produto');
      expect(result).to.be.an('object').to.have.all.keys('id', 'name');
      expect(result).to.be.deep.equal({ id: 1, name: 'Produto' });  
    });
  });

  describe('Testa se erro', () => {
      
    afterEach(() => sinon.restore());
  
    it('getAll com erro', async () => {
      sinon.stub(connection, 'execute').throws(new Error('Erro de conexão'));
      
      try {
        await productsModel.getAll();
        expect.fail();
      } catch (error) {
        expect(error.message).to.be.equal('Erro de conexão');
      }
    });
  
    it('getById com erro', async () => {
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