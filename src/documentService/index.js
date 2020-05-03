const PROTO_PATH = `${__dirname}/../common/document.proto`;
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const debug = require('debug')('assess-documentService');
const db = require('./db');
const config = require('../common/config');

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  arrays: true,
});
const documentProto = grpc.loadPackageDefinition(packageDefinition);

const documentService = new grpc.Server();
documentService.addService(documentProto.DocumentService.service, {
  get: (call, callback) => {
    const { ticket } = call.request;
    debug(`Get document with ticket ${ticket}`);
    db.get(ticket).then((result) => {
      if (!result) return Promise.reject(new Error({ status: 400, message: 'cannot find document with ticket' }));
      debug(`retrieved document for ticket ${ticket}`);
      callback(null, { document: JSON.stringify(result), ticket });
      return null;
    }).catch((error) => {
      debug('Retrive failed with error');
      debug(error);
      callback(error);
    });
  },
  insert: (call, callback) => {
    const document = JSON.parse(call.request.document);
    debug('Insert new document');
    db.insert(document).then((result) => {
      if (!result) return Promise.reject(new Error({ status: 500, message: 'Could not insert document' }));
      debug('Inserted new document');
      callback(null, {});
      return null;
    }).catch((error) => {
      debug('Insert failed with error');
      debug(error);
      callback(error);
    });
  },

});

documentService.bind(config.docService, grpc.ServerCredentials.createInsecure());
debug(`document service running at ${config.docService}`);
documentService.start();
