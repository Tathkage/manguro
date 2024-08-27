const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLList } = require('graphql');
const pool = require('../db');

const AnimeType = new GraphQLObjectType({
    name: 'Anime',
    fields: () => ({
        id: { type: GraphQLString },
        title: { type: GraphQLString },
        description: { type: GraphQLString }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        anime: {
            type: new GraphQLList(AnimeType),
            resolve(parent, args) {
                return pool.query('SELECT * FROM anime').then(res => res.rows);
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});
