const config = {
  username: 'user',
  password: 'password1',
  mongodb: 'ds263108.mlab.com:63108/assessment-168',
  docService: 'localhost:3002',
  statusService: 'http://localhost:3003',
};
config.mongoUri = `mongodb://${config.username}:${config.password}@${config.mongodb}`;
module.exports = config;
