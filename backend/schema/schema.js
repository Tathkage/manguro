const { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLSchema, GraphQLList } = require('graphql');
const pool = require('../db');

const AnimeType = new GraphQLObjectType({
    name: 'Anime',
    fields: () => ({
        anime_id: { type: GraphQLInt },
        name: { type: GraphQLString },
        cover_image: { type: GraphQLString },
        episode_duration: { type: GraphQLInt },
        episode_count: { type: GraphQLInt },
        start_date: { type: GraphQLString },
        end_date: { type: GraphQLString },
        year: { type: GraphQLInt },
        season: { type: GraphQLString },
        animation_studio: { type: GraphQLString },
        format: { type: GraphQLString },
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        anime: {
            type: new GraphQLList(AnimeType),
            async resolve(parent, args) {
                try {
                    const result = await pool.query('SELECT * FROM public.anime');
                    return result.rows;
                }
                catch (err) {   
                    console.error('Error fetching anime data:', err);
                    throw new Error('Error fetching anime data');
                }
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAnime: {
            type: AnimeType,
            args: {
                anime_id: { type: GraphQLInt },
                name: { type: GraphQLString },
                cover_image: { type: GraphQLString },
                episode_duration: { type: GraphQLInt },
                episode_count: { type: GraphQLInt },
                start_date: { type: GraphQLString },
                end_date: { type: GraphQLString },
                year: { type: GraphQLInt },
                season: { type: GraphQLString },
                animation_studio: { type: GraphQLString },
                format: { type: GraphQLString },
            },
            async resolve(parent, args) {
                try {
                    const query = `
                        INSERT INTO public.anime (anime_id, name, cover_image, episode_duration, episode_count, start_date, end_date, year, season, animation_studio, format)
                        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
                        ON CONFLICT (anime_id) DO NOTHING;
                    `;

                    const values = [
                        args.anime_id,
                        args.name,
                        args.cover_image,
                        args.episode_duration,
                        args.episode_count,
                        args.start_date,
                        args.end_date,
                        args.year,
                        args.season,
                        args.animation_studio,
                        args.format,
                    ];

                    await pool.query(query, values);
                    return args;
                }
                catch (err) {
                    console.error('Error inserting anime:', err);
                    throw new Error('Failed to insert anime');
                }
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});
