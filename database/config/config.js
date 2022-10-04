module.exports = {
  "development": {
    "username": "root",
    "password": "cenco",
    "database": "ecommerce",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "port" : "3306",
    "logging": false
  },
  "test": {
    "username": "root",
    "password": "cenco",
    "database": "ecommerce_test",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "port" : "3306",
    "logging": false
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
