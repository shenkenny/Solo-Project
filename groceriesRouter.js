const express = require('express');

const groceriesController = require('./groceriesController.js');

const router = express.Router();

//handle get request to results page... controller should return array of results
router.get(
    '/:categoryName',
    groceriesController.getResults,
    (req, res) => {
        // console.log(res);
        // return res.status(200).json(res.locals.results);
        return res.status(200).json(res.locals.results);
    }
)


module.exports = router;