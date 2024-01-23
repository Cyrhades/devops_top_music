const home = require('../src/controllers/Home.js');
const search = require('../src/controllers/Search.js');
const register = require('../src/controllers/Register.js');


module.exports = (app) => {
    app.get('/', home.get)
    app.get('/search',  search.get)

    app.get('/inscription', register.get)
    app.post('/inscription', register.post)
}