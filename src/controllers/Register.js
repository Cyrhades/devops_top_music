const userRepo = require('../repositories/users.js')
const bcrypt = require('bcryptjs')

exports.get = (req, res) => {
    if(req.session.user && req.session.user.connected && req.session.user.connected == true) {
        req.flash('error', `Vous êtes déjà connecté`);
        res.redirect('/')
        return;
    } 
    res.render('register')
}

exports.post = (req, res) => {
    if(req.session.user && req.session.user.connected && req.session.user.connected == true) {
        req.flash('error', `Vous êtes déjà connecté`);
        res.redirect('/')
        return;
    } 
    const user = new userRepo();
    user.firstname = req.body.firstname;
    user.lastname = req.body.lastname;
    user.email = req.body.email;
    user.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    user.save();
    
    req.flash('notify', `Votre compte a bien été créé !`)
    res.redirect('/');
}