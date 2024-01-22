const home = require('../src/controllers/Home.js');
const search = require('../src/controllers/Search.js');

module.exports = (app) => {
    app.get('/', home.get)
    app.get('/search',  search.get)
}