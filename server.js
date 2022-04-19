const express = require('express');
const { pool, client } = require('./app/config/postgres');
const testRouter = require('./app/route/testRouter');

const nodeServerBoot = async () => {
    const app = express();
    const port = process.env.PORT || 3000;

    //try connecting to database, see if it works
    //postgres docker container maps 4321 port into 5432.
    await client.connect()
        .then(() => {
            console.log(`pg database connected`);
        })
        .catch((err) => {
            throw err;
        });
    await client.end();


    //set basic middlewares
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    //routers
    app.use('/test', testRouter);

    app.get('/', (req, res) => {
        res.send("hello world!!!!!");
    });

    //global error handler
    app.use((err, req, res, next) => {
        console.log("this is error handler");
        console.log(err);
        res.send(err.message);
    });

    //listener
    app.listen(port, () => {
        console.log(`server is listening at localhost:${port}`);
    });
}

nodeServerBoot();