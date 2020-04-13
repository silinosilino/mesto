require('dotenv').config();

module.exports.DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost:27017/mestodb';
const { NODE_ENV, JWT_SECRET } = process.env;
module.exports.JWT_SECRET = NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key';
