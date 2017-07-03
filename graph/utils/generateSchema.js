const {
    introspectionQuery,
    printSchema,
} = require('graphql/utilities');
const { graphql } = require('graphql');
const fs = require('fs');
const path = require('path');

const schema = require('./../schema');

const dir = path.join(__dirname, './../../schema');
const file1 = './../../schema/schema.json';
const file2 = './../../schema/schema.graphql';

const generateSchema = () => graphql(schema, introspectionQuery).then((result) => {
    if (fs.existsSync(dir)) {
        fs.writeFileSync(
            path.join(__dirname, file1),
            JSON.stringify(result, null, 2));
        fs.writeFileSync(
            path.join(__dirname, file2),
            printSchema(schema));
    } else {
        fs.mkdirSync(dir);
        fs.writeFileSync(
            path.join(__dirname, file1),
            JSON.stringify(result, null, 2));
        fs.writeFileSync(
            path.join(__dirname, file2),
            printSchema(schema));
    }
    process.exit(0);
}).catch((err) => {
    console.log('ERROR introspecting schema: ', err);
});

generateSchema();
