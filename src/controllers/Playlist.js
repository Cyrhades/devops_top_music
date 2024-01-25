const playlistRepo = require('../repositories/playlists.js');
const musicRepo = require('../repositories/musics.js');

exports.post = (req, res) => {

    let namePlaylist = req.body.playlist || null;
    if(namePlaylist && namePlaylist != '') {
        playlistRepo.findOne({ name: namePlaylist }).then((result) => {
            // On crée la playlist si elle n'existe pas déjà
            if(result == null) {
                const playlist = new playlistRepo();
                playlist.name = namePlaylist;
                playlist.songs = [];
                playlist.save();
            }
        })

        musicRepo.findOne({ id_rapid_api_deezer: req.body.id_rapid_api_deezer }).then((music) => {
            if(namePlaylist && music) {
                playlistRepo.findOneAndUpdate({ name: namePlaylist }, { $push: { songs: music } }).then(() => {
                    res.json({
                        status : "ok",
                        msg : `La musique a bien été ajouté à la playlist !`
                    });
                }).catch(() => {
                    res.json({
                        status : "ko",
                        msg : `Une erreur inconnue est survenue, veuillez réessayer plus tard !`
                    });               
                })
            } else {
                res.json({ status : "ko", msg : `La musique n'existe pas dans notre BDD !` });
            }
        }).catch(() =>  res.json({ status : "ko", msg : `Une erreur inconnue est survenue, veuillez réessayer plus tard !` }))
    }
} 

exports.getList = (req, res) => {

    // Renvoyer la liste des playlist existantes
    res.json({ status: 'ko', list : [] });
   
} 