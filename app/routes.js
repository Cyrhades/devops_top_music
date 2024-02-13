const home = require('../src/controllers/Home.js');
const search = require('../src/controllers/Search.js');
const register = require('../src/controllers/Register.js');
const auth = require('../src/controllers/Authenticate.js');
const playlist = require('../src/controllers/Playlist.js');
const song = require('../src/controllers/Song.js');


module.exports = (app) => {
    app.get('/', home.get)
    app.get('/blindtest/:id', home.blindtest)

    app.get('/inscription', register.get)
    app.post('/inscription', register.post)

    app.get('/connexion', auth.get)
    app.post('/connexion', auth.post)
    app.get('/deconnexion', auth.deconnect)


    app.get('/admin/search',  search.get)
    app.post('/admin/search',  search.post)

    app.get('/admin/playlist', playlist.get)

    app.get('/admin/playlist/add', playlist.add)
    app.post('/admin/playlist/add',  playlist.post)
    app.get('/admin/playlist/list',  playlist.getJsonList)
    
    app.get('/admin/playlist/delete/:id', playlist.delete)
    
    app.get('/admin/playlist/edit/:id', playlist.edit)
    app.post('/admin/playlist/edit/:id', playlist.editAddSong)


    app.get('/admin/song', song.get)
    app.get('/admin/song/delete/:id', song.delete)

    app.get('/admin/song/edit/:id', song.getEdit)
    app.post('/admin/song/edit/:id', song.postEdit)
}