const apiDeezer = require("../src/services/deezer.js");
const apiTopMusic = require("../src/services/topMusic.js")
module.exports = (app) => {
    app.get('/', (req, res) => {
        const api = new apiDeezer();
        const topMusic = new apiTopMusic();
        if(req.query.keyword != undefined && req.query.keyword.trim() != '') {
            api.search(req.query.keyword).then((result) => {
                let musics = [];
                let promises = [];                
                for(element of result.data) {
                    promises[promises.length] = topMusic.getCover(element.album).then(cover => {
                        musics.push({
                            title: element.title,
                            preview: element.preview,
                            cover
                        });
                    })
                }

                console.log(promises);
                Promise.all(promises).then(() => {
                    res.render('home', {keyword: req.query.keyword, musics});           
                })
            }).catch((result) => {
                console.log(result)
            });  
        } else {
            res.render('home')
        }
    })
}