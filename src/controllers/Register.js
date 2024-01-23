const userRepo = require('../repositories/users.js')

exports.get = (req, res) => {
    res.render('register')
}

exports.post = (req, res) => {
    const user = new userRepo();
    user.firstname = req.body.firstname;
    user.lastname = req.body.lastname;
    user.email = req.body.email;
    user.password = req.body.password;
    user.save();
    
    req.flash('notify', `Votre compte a bien été créé !`)
    res.redirect('/');
}