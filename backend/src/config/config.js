const config = {
    secret: '9238fSf9fAKckj332Knaksnf9012ADSN',
    env: process.env.ENV,
    port: 3000,
    db: {
       /* dbUrl: 'mongodb://127.0.0.1:27017',
        dbName: 'diploma',
        dbHost: 'localhost',
        dbPort: 27017,  */
        dbUrl: 'mongodb+srv://users:8fxBDG3!@diplom.bgd2y.mongodb.net/?retryWrites=true&w=majority&appName=Diplom',
        dbName: 'api',
    },
    userCommentActions: {
        like: 'like',
        dislike: 'dislike',
        violate: 'violate',
    },
    requestTypes: {
        order: 'order',
        consultation: 'consultation',
    }
};

module.exports = config;

 