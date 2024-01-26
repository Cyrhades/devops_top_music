const musicRepo = require('../repositories/musics.js');

exports.get = (req, res) => {
    musicRepo.find({}).then((songs) => {
        res.render('song', {songs});
    });
} 


exports.delete = (req, res) => {
    musicRepo.findOneAndDelete({_id: req.params.id}).then((song) => {
        req.flash('notify', `Le son "${song.title}" de "${song.artist_name}" a bien été supprimé`)
        res.redirect('/admin/song');
    });
} 