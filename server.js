const NodeRestServer = require('node-rest-server');

const routeConfig = {
  '/loads_profile': {
    method: 'GET',
    status: 200,
    controller: async (requestData) => {
      // requestData.method will be GET
      return { status: 200, payload: { data: 'Async data' } };
    },
  },
};

NodeRestServer(routeConfig);