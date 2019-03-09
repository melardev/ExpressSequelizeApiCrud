const Todo = require('./../config/sequelize.config').Todo;
const sequelize = require('./../config/sequelize.config').sequelize;
const TodoResponseDto = require('./../dtos/responses/todos/todo.dto');
const GenericResponseDto = require("../dtos/responses/shared/generic.dto");


exports.getAll = (req, res, next) => {
    return Todo.findAll({
        attributes: ['id', 'title', 'completed', 'createdAt', 'updatedAt']
    })
        .then(todos => {
            return res.json(TodoResponseDto.buildDtos(todos));
        }).catch(err => {
            throw err;
        });
};


exports.getCompleted = (req, res, next) => {
    return Todo.findAll({
        where: {completed: true},
        attributes: ['id', 'title', 'completed', 'createdAt', 'updatedAt']
    })
        .then(todos => {
            return res.json(TodoResponseDto.buildDtos(todos));
        }).catch(err => {
            return res.json(GenericResponseDto.buildWithErrorMessages(err.message));
        });
};

exports.getPending = (req, res, next) => {
    return Todo.findAll({
        where: {completed: false},
        attributes: ['id', 'title', 'completed', 'createdAt', 'updatedAt']
    })
        .then(todos => {
            return res.json(TodoResponseDto.buildDtos(todos));
        }).catch(err => {
            return res.json(GenericResponseDto.buildWithErrorMessages(err.message));
        });
};

exports.getById = (req, res, next) => {
    return res.json(TodoResponseDto.buildDetails(req.todo));
};

exports.create = function (req, res, next) {
    const {title, description, completed} = req.body;
    Todo.create({title, description, completed}).then(todo => {
        return res.status(201).json(TodoResponseDto.buildDetails(todo));
    }).catch(err => {
        return res.json(GenericResponseDto.buildWithErrorMessages(err.message));
    });
};

exports.update = function (req, res, next) {
    const {title, description, completed} = req.body;
    req.todo.title = title;

    if (description != null)
        req.todo.description = description;

    req.todo.completed = completed;

    req.todo.save().then(todo => {
        return res.json(TodoResponseDto.buildDetails(todo));
    }).catch(err => {
        return res.json(GenericResponseDto.buildWithErrorMessages(err.message));
    });
};

exports.delete = function (req, res, next) {
    req.todo.destroy().then(result => {
        return res.status(204).send();
    }).catch(err => {
        return res.status(204).send();
    });
};

exports.deleteAll = function (req, res, next) {
    Todo.destroy({
        where: {
            id: {
                [sequelize.Op.ne]: null
            }
        }
    }).then(todosDeleted => {
        return res.status(204).send();
    }).catch(err => {
        return res.json(GenericResponseDto.buildWithErrorMessages(err.message));
    });
};
