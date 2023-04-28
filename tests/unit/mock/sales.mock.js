const request = [
  {
    "productId": 1,
    "quantity": 1
  },
  {
    "productId": 2,
    "quantity": 5
  }
];

const requestFail = [
  {
    "productId": -1,
    "quantity": 1
  },
  {
    "productId": -2,
    "quantity": 5
  }
];

const response = {
  "id": 1,
  "itemsSold": [
    {
      "productId": 1,
      "quantity": 1
    },
    {
      "productId": 2,
      "quantity": 5
    }
  ]
};

module.exports = {
  request,
  response,
  requestFail,
};