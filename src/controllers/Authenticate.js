const userRepo = require('../repositories/users.js')
const bcrypt = require('bcryptjs')

exports.get = (req, res) => {
    if(req.session.user && req.session.user.connected && req.session.user.connected == true) {
        req.flash('error', `Vous êtes déjà connecté`);
        res.redirect('/')
        return;
    } 
    
    res.render('auth')      
}


exports.post = (req, res) => {
    if(req.session.user && req.session.user.connected && req.session.user.connected == true) {
        req.flash('error', `Vous êtes déjà connecté`);
        res.redirect('/')
        return;
    } 
    userRepo.findOne({ email :req.body.email }).then((user) => {
        if(user) {
            if(bcrypt.compareSync(req.body.password, user.password)) {
                req.session.user = {
                    firstname: user.firstname,
                    lastname: user.lastname,
                    email: user.email,
                    connected: true
                };
                req.flash('notify', `Vous êtes maintenant connecté`);
                res.redirect('/')
                return;
            }
        }
        res.render('auth', {error: `L'identification a échoué`, email:req.body.email })        
    })
}

exports.deconnect = (req, res) => {
    if(req.session.user == undefined || req.session.user.connected == undefined || req.session.user.connected == false) {
        req.flash('error', `Vous n'êtes pas connecté`);
    } else {
        req.session.user = null;
        req.flash('notify', `Vous êtes maintenant déconnecté`);
    }
    res.redirect('/')
}
