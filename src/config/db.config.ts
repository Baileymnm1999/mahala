export default {
  HOST: process.env.DB_HOST || "localhost",
  USER: process.env.DB_USER || "root",
  PASSWORD: process.env.DB_PASSWORD || "123456",
  DB: process.env.DB_NAME || "testdb",
  dialect: process.env.DB_DIALECT || "mysql",
  pool: {
    max: Number(process.env.DB_POOL_MAX) || 5,
    min: Number(process.env.DB_POOL_MIN) || 0,
    acquire: Number(process.env.DB_POOL_ACQUIRE) || 30000,
    idle: Number(process.env.DB_POOL_IDLE) || 10000,
  },
};
