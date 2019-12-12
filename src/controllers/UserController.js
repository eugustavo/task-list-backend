const User = require('../models/User');

module.exports = {
    async store(req, res){
        const { email, password } = req.body;

        if(await User.findOne({ email: email})){
            return res.json({ message: 'E-mail já cadastrado!'});
        }
        const response = await User.create({
            email,
            password
        });
        return res.status(200).json(response);

    },

    async show(req, res){
        const users = await User.find();
        return res.status(200).json(users);
    },

    async update(req, res){
        const { user_id } = req.headers;
        const { email, password } = req.body;

        if(!user_id){
            return res.status(404).json({ message: 'Usuário não existe ou não está logado!'});
        }

        if(await User.findOne({ email:email })){
            return res.status(400).json({ message: 'Este e-mail já está cadastrado!'});
        }

        if(!email){
            await User.findByIdAndUpdate({ _id:user_id }, { password });
            return res.status(200).json({ message: 'Senha alterada com sucesso!'});
        }
        if(!password){
            await User.findByIdAndUpdate({ _id:user_id }, { email });
            return res.status(200).json({ message: 'E-mail alterado com sucesso!'});
        }

        await User.findByIdAndUpdate({ _id:user_id }, {
            email,
            password
        });
        return res.status(200).json({ message: 'Usuário alterado com sucesso!'});
    },

    async destroy(req, res){
        const { user_id } = req.headers;

        await User.findByIdAndDelete({ _id:user_id });
        return res.status(200).json({ message: 'Usuário deletado!' });
    }
}