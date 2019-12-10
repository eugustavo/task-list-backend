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
        const { id } = req.query;
        const { email, password } = req.body;

        if( await User.findOne({ email: email })){
            return res.json({ message: 'E-mail já cadastrado!'})
        }

        if(!password){
            await User.findByIdAndUpdate({ _id:id }, {
                email,
            });
            return res.status(200).json({ message: 'E-mail alterado com sucesso!'});
        }

        await User.findByIdAndUpdate({ _id:id }, {
            email,
            password
        });

        return res.status(200).json({ message: 'Usuário alterado com sucesso!'});
    },

    async destroy(req, res){
        const { id } = req.query;

        await User.findByIdAndDelete({ _id:id });
        return res.status(200).json({ message: 'Usuário deletado!' });
    }
}