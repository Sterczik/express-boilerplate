if(process.env.NODE_ENV == 'production') {
  module.exports = {dbURI: process.env.DB_URI};
} else {
  module.exports = {dbURI: process.env.DEV_DB_URI};
}
