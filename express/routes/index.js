var express = require('express');

// MongoDB API interface
var router = express.Router();
const { MongoClient, ObjectId } = require('mongodb');
var url = 'mongodb://secschools:0UjJsiN7OqDdk3MvlTEBW9pCmzWD2PDwC0hTAs31WUH0YbuX7hs1cNNkGDGEaXoOFzsgce3nwKDNACDbeyBCeQ%3D%3D@secschools.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@secschools@';
var db;
MongoClient.connect(url, function (err, client) {
    db = client.db('schoolsDB');
    console.log("schoolsDB connected");
    console.log("Express running at http://localhost:3000/");
});
module.exports = router;


/* RESTful API ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/* Display all records */
router.get('/api/allschools', async function (req, res) {

    let results = await db.collection("schools").find().toArray()

    console.log(results[0])

    res.json(results);
});

// GET an record in JSON by {id in query parameters}
router.get('/api/schools/:id', async function (req, res) {

    if (!ObjectId.isValid(req.params.id))
        return res.status(404).send(`Unable to find the requested resource! with id: ${req.params.id}`);

    let result = await db.collection("schools").findOne({ _id: ObjectId(req.params.id) });

    if (!result)
        return res.status(404).send(`Unable to find the requested resource! with id: ${req.params.id}`);

    res.json(result);

});

/** INSERT a new record by
 *  - req.body.school
 */
router.post('/api/schools', async function (req, res) {

    let result = await db.collection("schools").insertOne(req.body);

    res.json({result});
});

/** UPDATE a single record by {path parameters}, with {req.body}
*  - :id: internal MongoDB ObjectId
*  - req.body: representation of school record
**/
router.put('/api/schools/:id', async function (req, res) {

    if (!ObjectId.isValid(req.params.id))
        return res.status(404).send(`Unable to find the requested resource! with id: ${req.params.id}`);

    var result = await db.collection("schools").findOneAndReplace({ _id: ObjectId(req.params.id) }, req.body);

    if (!result.value)
        return res.status(404).send(`Unable to find the requested resource! with id: ${req.params.id}`);

    res.send(`School record updated with id: ${req.params.id}`);
});


/** Delete a single Booking by {path parameters}
 *  - :id: internal MongoDB ObjectId
 */
router.delete('/api/schools/:id', async function (req, res) {

    if (!ObjectId.isValid(req.params.id))
        return res.status(404).send(`Unable to find the requested resource! with id: ${req.params.id}`);

    let result = await db.collection("schools").findOneAndDelete({ _id: ObjectId(req.params.id) })

    if (!result.value)
        return res.status(404).send(`Unable to find the requested resource! with id: ${req.params.id}`);

    return res.status(204).send(`School record deleted with id: ${req.params.id}`);

});

/**
 * HANDLE search form with pagination by {req.query}
 * 
 * Useful exact match query values:
 *  - district: String
 *  - student_gender: String
 *  - religion: String
 *  - school_type: String
 * 
 * Match by regex query values:
 *  - school_name: String
 *  - transportation: String
 * 
 * Functional parameters:
 *  - perPage: Int
 *  - page: Int
 *  - count: Int, = total count of all relevant records
 * 
 * 
 * Can use dynamic Vue component to show search result
 * ------------/vuecli/src/router/index.js
 * Add route, and reuse search result, by passing route.params.district to props
 * {path: '/district/:district', component: District, props: true },
 * 
 */
router.get('/api/search', async function (req, res) {

    var params = new URLSearchParams(req.query);
    params.delete('page');

    var whereClause = {};

    if (req.query.transportation)
        whereClause.direct_public_transportation_to_school
            = { $regex: req.query.transportation };

    if (req.query.school_name)
        whereClause.school_name
            = { $regex: req.query.school_name };

    if (req.query.district)
        // whereClause["$or"] = [
        //     { district: req.query.district },
        //     { other_districts: { $regex: req.query.district } }
        // ]
        whereClause.district = req.query.district;

    if (req.query.student_gender)
        whereClause.student_gender = req.query.student_gender;

    if (req.query.religion)
        whereClause.religion = req.query.religion;

    if (req.query.school_type)
        whereClause.school_type = req.query.school_type;

    var perPage = Math.max(req.query.perPage, 10) || 10;

    var results = await db.collection("schools").find(whereClause, {
        limit: perPage,
        skip: perPage * (Math.max(req.query.page - 1, 0) || 0),
    }
    ).toArray();

    var count = await db.collection("schools").find(whereClause).count();

    var pages = Math.ceil(await db.collection("schools").countDocuments(whereClause) / perPage);

    return res.json({ schools: results, pages: pages, perPage: perPage, count: count, query: req.query });
});


/**
 * GET IMAGE LINK by redirect by {path parameters}
 * - :name: school name (exact match)
 * /api/images/:name path to /public/images/pic/{name}.jpg
 **/
router.get("/api/images/:name", async function (req, res) {
    const newurl = `/images/pic/${req.params.name}.jpg`
    return res.redirect(newurl)
});

/**(Internal use) Get distinct values and its count by {req.params}
 *  - :search: 
 *    Useful and common values include:
 * 
 *  -- district: ["Kowloon City","Yau Tsim  Mong","Kwai Tsing","Tuen Mun","Wong Tai Sin","Sha Tin",
 *              "Sai Kung","Tsuen Wan","Islands","North","Sham Shui Po","Eastern","Wan Chai",
 *              "Yuen Long","Southern","Central & Western","Kwun Tong","Tai Po"]
 * 
 *  -- student_gender: ["Boys","Girls","Co-ed"]
 * 
 *  -- religion: ["Protestantism / Christianity","Not Applicable","Catholicism",
 *              "Buddhism","Taoism","Others","Confucianism","Islam"]
 * 
 *  - -school_type: ["DSS","Aided","Gov't","CAPUT"]
 * 
 *  // Sample output: [
  { _id: 'Kowloon City', count: 35 },
  { _id: 'Yau Tsim  Mong', count: 17 },
  { _id: 'Kwai Tsing', count: 31 },
  { _id: 'Tuen Mun', count: 37 },
  { _id: 'Wong Tai Sin', count: 23 },
  { _id: 'Sha Tin', count: 43 },
  { _id: 'Sai Kung', count: 26 },
  { _id: 'Tsuen Wan', count: 13 },
  { _id: 'Islands', count: 10 },
  { _id: 'North', count: 20 },
  { _id: 'Sham Shui Po', count: 26 },
  { _id: 'Eastern', count: 30 },
  { _id: 'Wan Chai', count: 17 },
  { _id: 'Yuen Long', count: 39 },
  { _id: 'Southern', count: 15 },
  { _id: 'Central & Western', count: 11 },
  { _id: 'Kwun Tong', count: 33 },
  { _id: 'Tai Po', count: 20 }
]
 */

router.get("/api/distinct/:search", async function (req, res) {
    let result = await db.collection("schools").aggregate([
        {
            '$group': {
                '_id': `$${req.params.search}`,
                'count': {
                    '$sum': 1
                }
            }
        }
    ]).toArray();

    return res.send(result)
});

/**
 * (Internal use) Delete all records
 * */

router.get("/api/deletemany", async function (req, res) {
    let result = await db.collection('schools').deleteMany()
    return res.json(result)
})

router.get("/api/district_school_type_group", async function (req, res) {
    let result = await db.collection("schools").aggregate([
        {
            "$group": {
                "_id": {
                    "district": "$district",
                    "school_type": "$school_type"
                },
                "count": {
                    "$sum": 1
                }
            }
        },
        {
            $project: {
                district: '$_id.district',
                school_type: '$_id.school_type',
                count: '$count',
                _id: 0
            }
        },
        {
            $sort: {
                count: -1,
                district: 1,
                school_type: 1
            }
        }
    ]).toArray();

    return res.json(result)
})

router.get("/api/pieChart", async function (req, res) {
    let result = await db.collection("schools").aggregate([
        {
            $group: {
                _id: {
                    school_type: "$school_type"
                },
                count: {
                    "$sum": 1
                }
            }
        },
        {
            $project: {
                school_type: '$_id.school_type',
                count: '$count',
                _id: 0
            }
        },
        {
            $sort: {
                count: -1,
                school_type: 1
            }
        }
    ]).toArray();

    return res.send(result)
})

