var express = require('express');
var router = express.Router();
var JOI = require('joi');
var joi = require('../schemas/joi.validation');
var BigQuery = require('@google-cloud/bigquery');
var datastore = require('@google-cloud/datastore')({
    projectId: 'superb-watch-172816',
    keyFilename: './MyProject-bbc9fa271136.json'
});

/* GET users listing. */
router.get('/retrive', function(req, res, next) {
    var data = [];
    var id = req.query.id;
    console.log(id);
    var key = datastore.key(['User50records', id]);

    datastore.get(key, function(err, resp) {
        console.log(resp);
        data.push(resp);
        res.send(data);
    })
});




/* GET users listing using runQuery. */
router.get('/retrive/runQuery', function(req, res, next) {
    //var userId = req.query.userId;
    var limit = req.query.limit;
    var offset = req.query.offset;
    var fields = req.query.fields;
    var query = '';
    //const datastore = this.datastore;


    //if(limit && offset && userId){
    //console.log("in loop"+limit+offset+fields);
    //const query = datastore.createQuery('User50records').filter('userId', 'in', ['AAA4136', 'AAA1969']);
    //const pageSize = 1;
    if (limit) {
        var lim = limit;
    } else {
        lim = 0;
    }

    if (offset) {
        var off = offset;
    } else {
        off = 0;
    }

    if (fields) {
        console.log("in fields");
        query = datastore.createQuery('User50records')

            .limit(parseInt(lim))
            .offset(parseInt(off))
            .select(fields);

    } else {
        console.log("not in fields");
        query = datastore.createQuery('User50records')

            .limit(parseInt(lim))
            .offset(parseInt(off));
    }
    datastore.runQuery(query)
        .then((results) => {
            const tasks = results[0];


            tasks.forEach((task) => {

                const taskKey = task[datastore.KEY];
                //console.log(taskKey.id, task);
            });
            joiValidation(tasks, joi, function(response) {
                console.log("here");


                res.send(response);
            })
        })
        .catch((err) => {
            console.error('ERROR:', err)
            res.send(err)
        });



});

router.get('/get', function(req, res, next) {
    console.log("newloop");
    var userId = req.query.userId;
    var query = "";
    console.log(userId);
    if (userId)

    {
        query = datastore.createQuery('User50records')
            .filter('userId', '=', userId);
    } else {
        console.log("no userid");
        query = datastore.createQuery('User50records');
    }
    datastore.runQuery(query)
        .then((results) => {
            const tasks = results[0];
            tasks.forEach((task) => {
                const taskKey = task[datastore.KEY];
                console.log(taskKey.id, task);
            });
            joiValidation(tasks, joi, function(response) {
                console.log("here");


                res.send(response);
            })

        })
        .catch((err) => {
            console.error('ERROR:', err)
            res.send(err)
        });


    //.select(['fullName']);


});

var joiValidation = function(response, joi, callback) {
    JOI.validate(JSON.stringify(response), joi, function(err, value) {

        if (err) {
            callback(err);
        } else {
            callback(value);
        }
    });
};


module.exports = router;