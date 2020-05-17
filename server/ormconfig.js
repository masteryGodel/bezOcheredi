require('dotenv').config({ path: '.env' });

module.exports = {
  name: 'default',
  type: 'postgres',
  host: process.env.DATABASE_HOST || 'localhost',
  port: +process.env.DATABASE_PORT || 54320,
  username: process.env.DATABASE_USERNAME || 'bezOcheredi',
  password: process.env.DATABASE_PASSWORD || 'bezOcheredi',
  database: process.env.DATABASE_NAME || 'bezOcheredi',
  synchronize: process.env.NODE_ENV === 'development',
  dropSchema: false,
  logging: true,
  entities: ['dist/**/*.entity.js'],
};
