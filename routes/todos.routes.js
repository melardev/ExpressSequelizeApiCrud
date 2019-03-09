const todosController = require('../controllers/todos.controller');
const router = require('express').Router();


require('./param_loaders/todos.loader').init(router);

router.get('',  todosController.getAll);
router.get('/completed',  todosController.getCompleted);
router.get('/pending',  todosController.getPending);
router.get('/:todo',  todosController.getById);
router.post('', todosController.create);
router.put('/:todo_load_id', todosController.update);
router.delete('/:todo_load_id', todosController.delete);
router.delete('', todosController.deleteAll);

module.exports = router;
