const playlistRepo = require('../repositories/playlists.js');

exports.get = (req, res) => {
    playlistRepo.find({}, {_id:1, name:1, songs:1}).then((playlists) => {
        res.render('home', {playlists});
    });
} 

exports.blindtest = (req, res) => {
    if(req.params.id != undefined) {
        playlistRepo.findOne({_id:req.params.id}, {_id:1, name:1, songs:1}).then((playlist) => {
            res.render('blindTest', {playlist});
        });
    } else {
        req.flash('error', `La playlist n'est pas disponible`)
        res.redirect('/')
    }
} 