const home = require('../src/controllers/Home.js');
const search = require('../src/controllers/Search.js');
const register = require('../src/controllers/Register.js');
const auth = require('../src/controllers/Authenticate.js');


module.exports = (app) => {
    app.get('/', home.get)
    app.get('/search',  search.get)
    app.post('/search',  search.post)

    app.get('/inscription', register.get)
    app.post('/inscription', register.post)

    app.get('/connexion', auth.get)
    app.post('/connexion', auth.post)
}