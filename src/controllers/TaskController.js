const Task = require('../models/Task');
const User = require('../models/User');

module.exports = {
    async store(req, res){
        const { user_id } = req.headers;
        const { name, description } = req.body;

        if(!user_id){
            return res.status(404).json({ message: 'Usuário não logado ou não existe!'});
        }
        const response = await Task.create({
            name,
            description,
            status: true,
            user: user_id
        });
        return res.status(200).json(response);
    },

    async index(req, res){
        const { user_id } = req.headers;
        if(!user_id){
            return res.status(404).json({ message: 'Usuário não logado ou não existe!'});
        };
        const response = await Task.find({ user:user_id }).populate('user');

        return res.status(200).json(response);
    },

    async update(req, res){
        const { task_id, user_id } = req.headers;
        const { name, description } = req.body;
        const aux = await Task.findOne({ user:user_id });

        if(!task_id || !user_id){
            return res.status(404).json({ message: 'Usuário não está logado ou Tarefa não existe!'});
        }
        if(aux.user != user_id){
            return res.status(400).json({ message: 'Usuário não é proprietario desta tarefa!'})
        }
        if(!name){
            const response = await Task.findByIdAndUpdate({ _id:task_id }, { description });
            return res.status(200).json(response);
        }
        if(!description){
            const response = await Task.findByIdAndUpdate({ _id:task_id }, { name });
            return res.status(200).json(response);
        }

        const response = await Task.findByIdAndUpdate({ _id:task_id }, {
            name,
            description
        });
        return res.status(200).json(response);
    },

    async destroy(req, res){
        const { task_id, user_id } = req.headers;
        const aux = await Task.findOne({ user:user_id });

        if(!task_id || !user_id){
            return res.status(404).json({ message: 'Usuário ou Tarefa não existem!'});
        }
        if(aux.user != user_id){
            return res.status(400).json({ message: 'Usuário não é proprietario desta tarefa!'});
        }
        await Task.findByIdAndDelete({ _id:task_id });
        return res.status(200).json({ message: 'Tarefa exluída com sucesso!'});

    }
}