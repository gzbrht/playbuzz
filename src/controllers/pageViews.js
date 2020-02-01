const model = require('../models/PageView');

exports.add = async pageView => {
    await model.insertMany([pageView]);
}

exports.fetch = async ({query, cursor, limit = 20}) => {
    if (cursor) {
        query._id = {$gte: cursor};
    }
    const results = await model
        .find(query)
        .sort({_id: -1})
        .limit(limit + 1);
    let pageViews = [];
    let next = null;
    if (results.length === limit + 1) {
        pageViews = results.slice(0, -1);
        next = results.slice(-1)[0]._id;
    } else {
        pageViews = results;
    }
    return {
        pageViews: pageViews.map(res => res.toJSON()),
        next,
    };
}

exports.fetchByCountry = async () => {
    return await model.aggregate([
        {$group: {_id: '$country', pageId: {$sum: 1}},
    }]);
};

exports.rate = async ({skip = 0, limit = 10}) => {
    return await model.aggregate([
        {
            $group: {
                _id: {pageId: "$pageId"},
                pageViewIds: {$addToSet: "$_id"},
                count: {$sum: 1},
            }
        },
        {$match: {count: {$gt: 1}}},
        {$sort: {count: -1}},
        {$limit: +skip + +limit},
        {$skip: +skip},
    ]);
};
