require('dotenv').config({ path: '.env' });

module.exports = {
  name: 'default',
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: +process.env.DATABASE_PORT,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: process.env.NODE_ENV === 'development',
  dropSchema: false,
  logging: true,
  entities: ['dist/**/*.entity.js'],
};
