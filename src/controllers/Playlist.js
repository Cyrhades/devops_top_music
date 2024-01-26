const playlistRepo = require('../repositories/playlists.js');
const musicRepo = require('../repositories/musics.js');

exports.post = async (req, res) => {
    let error = null;
    let success = null;
    let namePlaylist = req.body.playlist || null;
    if(namePlaylist && namePlaylist != '') {
        await playlistRepo.findOne({ name: namePlaylist }).then(async (result) => {
            // On crée la playlist si elle n'existe pas déjà
            if(result == null) {
                const playlist = new playlistRepo();
                playlist.name = namePlaylist;
                playlist.songs = [];
                await playlist.save();
            }
        })

        if(typeof req.body.id_rapid_api_deezer != 'undefined') {
            musicRepo.findOne({ id_rapid_api_deezer: req.body.id_rapid_api_deezer }).then((music) => {
                if(namePlaylist) {
                        playlistRepo.findOneAndUpdate({ name: namePlaylist }, { $addToSet: { songs: music } }).then(() => {
                        success =  `La musique a bien été ajouté à la playlist !`;
                    }).catch(() => {
                        error = `Une erreur inconnue est survenue, veuillez réessayer plus tard !`;               
                    })
                } else {
                    error = `La musique n'existe pas dans notre BDD !`;
                }
            }).catch(() => { error = `Une erreur inconnue est survenue, veuillez réessayer plus tard !`})
        }
    } else {
        error = `La playlist doit avoir un nom !`;
    }

    if(req.body.is_ajax && req.body.is_ajax == "1") {
        if(error != null) {
            res.json({status : "ko",  msg : error });
        } else {
            res.json({status : "ok",  msg : success });
        }        
    } else {
        if(error != null) {
            req.flash('error', error);
        } else {
            req.flash('notify', success);
        }
        res.redirect('/admin/playlist');
    }
} 

exports.getJsonList = (req, res) => {
    // Renvoyer la liste des playlist existantes
    playlistRepo.find({}, { _id:0, name: 1 }).then((playlists) => {
        res.json({ status: 'ok', playlists}) 
    }).catch(() => {
        res.json({ status : "ko", msg : `Une erreur inconnue est survenue, veuillez réessayer plus tard !` });
    });
} 


exports.get = (req, res) => {
    playlistRepo.find({}, {_id:1, name:1, songs:1}).then((playlists) => {
        res.render('playlist', {playlists});
    });
} 

exports.add = (req, res) => {
    res.render('playlist/add');
} 

exports.delete = (req, res) => {
    playlistRepo.findOneAndDelete({_id: req.params.id}).then((playlist) => {
        req.flash('notify', `La playlist "${playlist.name}" a bien été supprimé`)
        res.redirect('/admin/playlist');
    });
} 