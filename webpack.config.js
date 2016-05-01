if (process.env.NODE_ENV === "production") {
    module.exports = require('./webpack.config.production');
} else {
    module.exports = require('./webpack.config.development');
}
