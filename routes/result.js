const express = require('express');
const router = express.Router();
const results = require('../app').results;
const peopleWhoChecked = [];
/* GET result page. */
router.get('/', function(req, res, next) {

    let santa = req.query.santa;
    let receiver = getPerson(santa);
    let shouldcontinue = true;
    for(let i = 0; i < peopleWhoChecked.length; i++){
        if(peopleWhoChecked[i] === santa) {
            shouldcontinue = false;
            res.render('already_seen');
        }
    }
    if (shouldcontinue) {
        res.render('result', {santa: santa, person: receiver});
        peopleWhoChecked.push(santa);
    }
});

const getPerson = function(santa) {
    if (!Object.values(results).includes(santa)) {
        return null;
    }
    else {
        let returnObject = results[santa];
        // results[santa] = null;
        return returnObject;
    }
}

module.exports = router;
