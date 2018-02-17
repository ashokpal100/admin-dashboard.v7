module.exports = function() {
    var client = 'src',
        clientApp = './src/app'
        dist = 'dist',
        docs = 'documentation';
    var config = {
        client: client,
        dist: dist,
        index: client + "/index.html",
    };
    return config;
};