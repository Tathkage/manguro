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

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        username: { type: GraphQLString },
        password: { type: GraphQLString },
        email:    {type: GraphQLString}    
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: new GraphQLList(UserType),
            resolve(parent, args) {
                return pool.query('SELECT * FROM users').then(res => res.rows);
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        createUser: {
            type: UserType,
            args: {
                username: { type: GraphQLString },
                email: { type: GraphQLString },
                password: { type: GraphQLString }
            },
            async resolve(parent, args) {
                const { username, email, password } = args;
                const result = await pool.query(
                  'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
                  [username, email, password]
                );
                return result.rows[0];
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});
