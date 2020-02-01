const express = require('express');
const router = module.exports = express.Router();
const {fetch, add, fetchByCountry, rate} = require('../controllers/pageViews');
const geoip = require('geoip-lite');
const useragent = require('useragent');
const {authorize} = require('../middlewares');
const {withPromise} = require('./util');

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


router.get('/', authorize, withPromise(async req => {
    const {limit, cursor, ...query} = req.query;
    return await fetch({query, limit: +limit, cursor});
}));

router.get('/by-contry', authorize, withPromise(async () => {
    return await fetchByCountry();
}));

router.get('/rate', authorize, withPromise(async req => {
    return await rate(req.query);
}));
