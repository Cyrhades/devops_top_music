const playlistRepo = require('../repositories/playlists.js');
const musicRepo = require('../repositories/musics.js');

exports.post = async (req, res) => {

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

        musicRepo.findOne({ id_rapid_api_deezer: req.body.id_rapid_api_deezer }).then((music) => {
            if(namePlaylist && music) {
                playlistRepo.findOneAndUpdate({ name: namePlaylist }, { $addToSet: { songs: music } }).then(() => {
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
    } else {
        res.json({ status : "ko", msg : `La playlist doit avoir un nom !` });
    }
} 

exports.getList = (req, res) => {
    // Renvoyer la liste des playlist existantes
    playlistRepo.find({}, { _id:0, name: 1 }).then((playlists) => {
        res.json({ status: 'ok', playlists}) 
    }).catch(() => {
        res.json({ status : "ko", msg : `Une erreur inconnue est survenue, veuillez réessayer plus tard !` });
    });
} 