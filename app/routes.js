const search = require('../src/controllers/Search.js');

module.exports = (app) => {
    app.get('/', search.get)
    app.get('/test', (req,res) => res.render('test'))
}