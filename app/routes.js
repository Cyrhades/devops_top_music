const home = require('../src/controllers/Home.js');
const search = require('../src/controllers/Search.js');
const register = require('../src/controllers/Register.js');
const auth = require('../src/controllers/Authenticate.js');
const playlist = require('../src/controllers/Playlist.js');

module.exports = (app) => {
    app.get('/', home.get)
   

    app.get('/inscription', register.get)
    app.post('/inscription', register.post)

    app.get('/connexion', auth.get)
    app.post('/connexion', auth.post)


    app.get('/admin/search',  search.get)
    app.post('/admin/search',  search.post)

    app.post('/admin/playlist/add',  playlist.post)
    app.get('/admin/playlist/list',  playlist.getList)
    
}