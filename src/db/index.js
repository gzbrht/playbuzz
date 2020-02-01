const mongoose = require('mongoose');
const url = `mongodb://localhost/playbuzz`;
exports.connect = async () => {
    await mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    });
};
