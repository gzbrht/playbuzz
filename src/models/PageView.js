const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PageView = new Schema({
    userId: String,
    pageId: String,
    browserName: String,
    timestamp: {type: Number, default: Date.now()},
    country: {type: String, uppercase: true},
    props: {},
});

PageView.index({pageId: 1});
PageView.index({country: 1});
PageView.index({browserName: 1});

module.exports = mongoose.model('PageViews', PageView);
