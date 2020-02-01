const express = require('express');
const router = module.exports = express.Router();
const {fetch, add, fetchByCountry, rate} = require('../controllers/pageViews');
const geoip = require('geoip-lite');
const useragent = require('useragent');
const {authorize} = require('../middlewares');

router.post('/', (req, res) => {
    const {userId, pageId, props} = req.body;
    const {browserName} = useragent.is(req.headers['user-agent']);
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const geo = geoip.lookup(ip);
    add({
        userId,
        pageId,
        browserName,
        country: geo ? geo.country : undefined,
        props: {ip, ...props}
    }).catch(error => console.error(error));
    res.end();
});


router.get('/', authorize, (req, res) => {
    const {limit, cursor, ...query} = req.query;
    fetch({query, limit: +limit, cursor})
        .then(pageViews => res.status(200).json(pageViews))
        .catch(error => {
            console.error(error);
            res.status(error.code || 500).end();
        });
});

router.get('/by-contry', authorize, (_, res) => {
    fetchByCountry()
        .then(pageViews => res.status(200).json(pageViews))
        .catch(error => {
            console.error(error);
            res.status(error.code || 500).end();
        });
});

router.get('/rate', authorize, (req, res) => {
    rate(req.query)
        .then(pageViews => res.status(200).json(pageViews))
        .catch(error => {
            console.error(error);
            res.status(error.code || 500).end();
        });
});
