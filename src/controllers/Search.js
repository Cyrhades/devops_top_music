const apiDeezer = require("../services/deezer.js");
const apiTopMusic = require("../services/topMusic.js");
const musicRepo = require('../repositories/musics.js');

exports.get = (req, res) => {
    const api = new apiDeezer();
    const topMusic = new apiTopMusic();
    if(req.query.keyword != undefined && req.query.keyword.trim() != '') {
        api.search(req.query.keyword).then(async (result) => {
            let musics = [];
            let promises = [];   
            for(element of result.data) {                
                promises[promises.length] = await topMusic.getCover(element.album).then(async cover => {
                    musics.push({
                        id_rapid_api_deezer: element.id,
                        title: element.title,
                        preview: element.preview,
                        artist_name: element.artist.name,
                        artist_picture_medium: element.artist.name,
                        cover,
                        exists: (await musicRepo.findOne({ id_rapid_api_deezer: element.id }) ? "true" : "false")
                    });
                })
            }
            
            Promise.all(promises).then(() => {
                res.render('search', {keyword: req.query.keyword, musics});           
            })
        }).catch((result) => {
            console.log(result)
        });  
    } else {
        res.render('search')
    }
} 

exports.post = (req, res) => {
    const music = new musicRepo();
    music.id_rapid_api_deezer = req.body.id_rapid_api_deezer;
    music.title = req.body.title;
    music.artist_name = req.body.artist_name;
    music.cover = req.body.cover;
    music.preview = req.body.preview;
    music.save();
    
    res.json({
        id_rapid_api_deezer: ""+req.body.id_rapid_api_deezer,
        status : "ok",
        msg : `La musique a bien été enregistrée !`
    });
} 