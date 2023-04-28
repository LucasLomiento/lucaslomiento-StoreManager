const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/models/connection');
const salesModel = require('../../../src/models/sales.model');

describe('Testa o model de sales', () => {
  describe('Testa se sucesso', () => {

    afterEach(() => sinon.restore());

    it('registerSale com DATA', async () => {
      sinon.stub(connection, 'execute').resolves([{
        fieldCount: 0,
        affectedRows: 1,
        insertId: 1,
        info: '',
        serverStatus: 2,
        warningStatus: 0
      }]);
      
      const result = await salesModel.registerSale();
      expect(result).to.be.equal(1);
    });

    it('registerProduct com DATA', async () => {
      sinon.stub(connection, 'execute').resolves([{
          fieldCount: 0,
          affectedRows: 1,
          insertId: 0,
          info: '',
          serverStatus: 2,
          warningStatus: 0
        }]);
      
      const result = await salesModel.registerProduct(12, 1, 2);
      expect(result).to.be.an('array').deep.equal([{
        affectedRows: 1,
        fieldCount: 0,
        info: "",
        insertId: 0,
        serverStatus: 2,
        warningStatus: 0
      }]);
    });
  });
});