const express = require('express');

const groceriesController = require('./groceriesController.js');

const router = express.Router();



//when input is saved on addItem page, send Name to groceries controller
router.get(
    '/:name',
    groceriesController.removeGroceries,
    (req, res) => {
        return res.status(200).json(res.locals); // check controller
    }
);


module.exports = router;