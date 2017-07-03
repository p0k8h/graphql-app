const express = require('express');
const graphqlHTTP = require('express-graphql');
const cors = require('cors');

const { printSchema } = require('graphql/utilities/schemaPrinter');
const getData = require('././graph/utils/authorization');
const upload = require('././graph/utils/upload');
const schema = require('././graph/schema');
// const schema = require('./test/newFake');

const app = express();
require('././config/mongoClient')(app);

const root = {
    ip: (args, request) => request.ip,
};

app.use(cors());
app.use('/schema', (req, res, next) => {
    res.set('Content-Type', 'text/plain');
    res.send(printSchema(schema));
    next();
});
app.post('/upload', upload);
app.use('/graphql', getData, graphqlHTTP({
    schema,
    graphiql: true,
    pretty: true,
    rootValue: root,
}));

const port = (process.env.PORT || 8080);
const server = app.listen(port, () => {
    console.log('GraphQL Server is now running on localhost:', server.address().port);
});

// used for upload route error handing
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({ messsage: err });
});
