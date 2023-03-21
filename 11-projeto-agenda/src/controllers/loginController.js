const Login = require('../models/LoginModel')

exports.index = (req, res) => {
    if (req.session.user) return res.render('login-logado')
    return res.render('login')
}
exports.register = async (req, res) => {
    try {
        const login = new Login(req.body)
        await login.register()

        if (login.errors.length > 0) {
            req.flash('erros', login.errors)
            req.session.save(function() {
                return res.redirect('/login/index')
            })
            return
        }

        req.flash('success', 'Usuário criado com sucesso')
        req.session.save(function() {
            return res.redirect('/login/index')
        })
        return

    } catch(err) {
        console.log(err)
        return res.render('404')
    }
}
exports.login = async (req, res) => {
    try {
        const login = new Login(req.body)
        await login.login()

        if (login.errors.length > 0) {
            req.flash('erros', login.errors)
            req.session.save(function() {
                return res.redirect('/login/index')
            })
            return
        }     

        req.flash('success', 'Login efetuado com sucesso.')
        req.session.user = login.user
        req.session.save(function() {
            return res.redirect('/login/index')
        })
        return

    } catch(err) {
        console.log(err)
        return res.render('404')
    }
}
exports.logout = async (req, res) => {
    req.session.destroy()
    res.redirect('/')
}