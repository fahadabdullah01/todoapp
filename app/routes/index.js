const todoRoutes = require('./todo');

module.exports = function (app, db) {
    todoRoutes(app, db);
}