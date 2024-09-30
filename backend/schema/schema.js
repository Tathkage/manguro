const { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLSchema, GraphQLList } = require('graphql');
const pool = require('../db/db');

const AnimeType = new GraphQLObjectType({
    name: 'Anime',
    fields: () => ({
        anime_id: { type: GraphQLInt },
        romaji_name: { type: GraphQLString },
        english_name: { type: GraphQLString },
        native_name: { type: GraphQLString },
        description: { type: GraphQLString },
        cover_image: { type: GraphQLString },
        trailer_url: { type: GraphQLString },
        episode_duration: { type: GraphQLInt },
        episode_count: { type: GraphQLInt },
        start_date: { type: GraphQLString },
        end_date: { type: GraphQLString },
        year: { type: GraphQLInt },
        season: { type: GraphQLString },
        animation_studio: { type: GraphQLString },
        producers: { type: new GraphQLList(GraphQLString) },
        format: { type: GraphQLString },
        source: { type: GraphQLString },
    })
});

const MangaType = new GraphQLObjectType({
    name: 'Manga',
    fields: () => ({
        manga_id: { type: GraphQLInt },
        romaji_name: { type: GraphQLString },
        english_name: { type: GraphQLString },
        native_name: { type: GraphQLString },
        description: { type: GraphQLString },
        cover_image: { type: GraphQLString },
        chapter_count: { type: GraphQLInt },
        volume_count: { type: GraphQLInt },
        start_date: { type: GraphQLString },
        end_date: { type: GraphQLString },
        format: { type: GraphQLString },
        source: { type: GraphQLString },
    })
});

const GenreType = new GraphQLObjectType({
    name: 'Genre',
    fields: () => ({
        genre_id: { type: GraphQLInt },
        name: { type: GraphQLString },
    })
});

const TagType = new GraphQLObjectType({
    name: 'Tag',
    fields: () => ({
        tag_id: { type: GraphQLInt },
        name: { type: GraphQLString },
    })
});

const AnimeGenreType = new GraphQLObjectType({
    name: 'AnimeGenre',
    fields: () => ({
        anime_genre_id: { type: GraphQLInt },
        anime_id: { type: GraphQLInt },
        genre_id: { type: GraphQLInt },
    })
});

const MangaGenreType = new GraphQLObjectType({
    name: 'MangaGenre',
    fields: () => ({
        manga_genre_id: { type: GraphQLInt },
        manga_id: { type: GraphQLInt },
        genre_id: { type: GraphQLInt },
    })
});

const AnimeTagType = new GraphQLObjectType({
    name: 'AnimeTag',
    fields: () => ({
        anime_tag_id: { type: GraphQLInt },
        anime_id: { type: GraphQLInt },
        tag_id: { type: GraphQLInt },
    })
});

const MangaTagType = new GraphQLObjectType({
    name: 'MangaTag',
    fields: () => ({
        manga_tag_id: { type: GraphQLInt },
        manga_id: { type: GraphQLInt },
        tag_id: { type: GraphQLInt },
    })
});

const RelatedMediaType = new GraphQLObjectType({
    name: 'RelatedMedia',
    fields: () => ({
        related_media_id: { type: GraphQLInt },
        anime_id: { type: GraphQLInt },
        manga_id: { type: GraphQLInt },
        related_anime_id: { type: GraphQLInt },
        related_manga_id: { type: GraphQLInt },
        relation_type: { type: GraphQLString },
    })
})

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
        },
        genre: {
            type: new GraphQLList(GenreType),
            async resolve(parent, args) {
                try {
                    const result = await pool.query('SELECT * from public.genres');
                    return result.rows;
                }
                catch (err) {
                    console.error('Error fetching genre data:', err);
                    throw new Error('Error featching genre data');
                }
            }
        },
        tag: {
            type: new GraphQLList(TagType),
            async resolve(parent, args) {
                try {
                    const result = await pool.query('SELECT * from public.tags');
                    return result.rows;
                }
                catch (err) {
                    console.error('Error fetching tag data:', err);
                    throw new Error('Error featching tag data');
                }
            }
        },
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAnime: {
            type: AnimeType,
            args: {
                anime_id: { type: GraphQLInt },
                romaji_name: { type: GraphQLString },
                english_name: { type: GraphQLString },
                native_name: { type: GraphQLString },
                description: { type: GraphQLString },
                cover_image: { type: GraphQLString },
                trailer_url: { type: GraphQLString },
                episode_duration: { type: GraphQLInt },
                episode_count: { type: GraphQLInt },
                start_date: { type: GraphQLString },
                end_date: { type: GraphQLString },
                year: { type: GraphQLInt },
                season: { type: GraphQLString },
                animation_studio: { type: GraphQLString },
                producers: { type: new GraphQLList(GraphQLString) },
                format: { type: GraphQLString },
                source: { type: GraphQLString },
            },
            async resolve(parent, args) {
                try {
                    const query = `
                        INSERT INTO public.anime 
                            (anime_id, romaji_name, english_name, native_name, description, cover_image, trailer_url, episode_duration, 
                            episode_count, start_date, end_date, year, season, animation_studio, producers, format, source)
                        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)
                        ON CONFLICT (anime_id) DO NOTHING;
                    `;

                    const values = [
                        args.anime_id,
                        args.romaji_name,
                        args.english_name,
                        args.native_name,
                        args.description,
                        args.cover_image,
                        args.trailer_url,
                        args.episode_duration,
                        args.episode_count,
                        args.start_date,
                        args.end_date,
                        args.year,
                        args.season,
                        args.animation_studio,
                        args.producers,
                        args.format,
                        args.source
                    ];

                    await pool.query(query, values);
                    return args;
                }
                catch (err) {
                    console.error('Error inserting anime:', err);
                    throw new Error('Failed to insert anime');
                }
            }
        },
        addManga: {
            type: MangaType,
            args: {
                manga_id: { type: GraphQLInt },
                romaji_name: { type: GraphQLString },
                english_name: { type: GraphQLString },
                native_name: { type: GraphQLString },
                description: { type: GraphQLString },
                cover_image: { type: GraphQLString },
                chapter_count: { type: GraphQLInt },
                volume_count: { type: GraphQLInt },
                start_date: { type: GraphQLString },
                end_date: { type: GraphQLString },
                format: { type: GraphQLString },
                source: { type: GraphQLString },
            },
            async resolve(parent, args) {
                try {
                    const query = `
                        INSERT INTO public.manga 
                            (manga_id, romaji_name, english_name, native_name, description, cover_image, 
                            chapter_count, volume_count, start_date, end_date, format, source)
                        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
                        ON CONFLICT (manga_id) DO NOTHING;
                    `;

                    const values = [
                        args.manga_id,
                        args.romaji_name,
                        args.english_name,
                        args.native_name,
                        args.description,
                        args.cover_image,
                        args.chapter_count,
                        args.volume_count,
                        args.start_date,
                        args.end_date,
                        args.format,
                        args.source
                    ];

                    await pool.query(query, values);
                    return args;
                }
                catch (err) {
                    console.error('Error inserting manga:', err);
                    throw new Error('Failed to insert manga');
                }
            }
        },
        addGenre: {
            type: GenreType,
            args: {
                genre_id: { type: GraphQLInt },
                name: { type: GraphQLString }   
            },
            async resolve(parent, args) {
                try {
                    const query = `
                        INSERT INTO public.genres (genre_id, name)
                        VALUES ($1, $2)
                        ON CONFLICT (genre_id) DO NOTHING;
                    `;

                    const values = [
                        args.genre_id,
                        args.name
                    ];
                    await pool.query(query, values);
                    return args;
                }
                catch (err) {
                    console.error('Error inserting genre:', err);
                    throw new Error('Failed to insert genre');
                }
            }
        },
        addTag: {
            type: TagType,
            args: {
                tag_id: { type: GraphQLInt },
                name: { type: GraphQLString }   
            },
            async resolve(parent, args) {
                try {
                    const query = `
                        INSERT INTO public.tags (tag_id, name)
                        VALUES ($1, $2)
                        ON CONFLICT (tag_id) DO NOTHING;
                    `;

                    const values = [
                        args.tag_id,
                        args.name
                    ];
                    await pool.query(query, values);
                    return args;
                }
                catch (err) {
                    console.error('Error inserting tag:', err);
                    throw new Error('Failed to insert tag');
                }
            }
        },
        addAnimeGenre: {
            type: AnimeGenreType,
            args: {
                anime_id: { type: GraphQLInt },
                genre_id: { type: GraphQLInt },
            },
            async resolve(parent, args) {
                try {
                    const maxIdQuery = `SELECT COALESCE(MAX(anime_genre_id), 0) AS max_id FROM public.anime_genres;`;
                    const maxIdResult = await pool.query(maxIdQuery);
                    const maxId = maxIdResult.rows[0].max_id + 1;

                    const updateSequenceQuery = `SELECT setval('anime_genres_anime_genre_id_seq', $1, false);`;
                    await pool.query(updateSequenceQuery, [maxId]);

                    const insertQuery = `
                        INSERT INTO public.anime_genres (anime_id, genre_id)
                        VALUES ($1, $2)
                        ON CONFLICT (anime_id, genre_id) DO NOTHING
                        RETURNING anime_genre_id;
                    `;

                    const values = [
                        args.anime_id,
                        args.genre_id
                    ];
                    const result = await pool.query(insertQuery, values);
                    return result.rows[0];
                }
                catch (err) {
                    console.error('Error inserting anime_genre:', err);
                    throw new Error('Failed to insert anime_genre');
                }
            }
        },
        addMangaGenre: {
            type: MangaGenreType,
            args: {
                manga_id: { type: GraphQLInt },
                genre_id: { type: GraphQLInt },
            },
            async resolve(parent, args) {
                try {
                    const maxIdQuery = `SELECT COALESCE(MAX(manga_genre_id), 0) AS max_id FROM public.manga_genres;`;
                    const maxIdResult = await pool.query(maxIdQuery);
                    const maxId = maxIdResult.rows[0].max_id + 1;

                    const updateSequenceQuery = `SELECT setval('manga_genres_manga_genre_id_seq', $1, false);`;
                    await pool.query(updateSequenceQuery, [maxId]);

                    const insertQuery = `
                        INSERT INTO public.manga_genres (manga_id, genre_id)
                        VALUES ($1, $2)
                        ON CONFLICT (manga_id, genre_id) DO NOTHING
                        RETURNING manga_genre_id;
                    `;

                    const values = [
                        args.manga_id,
                        args.genre_id
                    ];
                    const result = await pool.query(insertQuery, values);
                    return result.rows[0];
                }
                catch (err) {
                    console.error('Error inserting manga_genre:', err);
                    throw new Error('Failed to insert manga_genre');
                }
            }
        },
        addAnimeTag: {
            type: AnimeTagType,
            args: {
                anime_id: { type: GraphQLInt },
                tag_id: { type: GraphQLInt },
            },
            async resolve(parent, args) {
                try {
                    const maxIdQuery = `SELECT COALESCE(MAX(anime_tag_id), 0) AS max_id FROM public.anime_tags;`;
                    const maxIdResult = await pool.query(maxIdQuery);
                    const maxId = maxIdResult.rows[0].max_id + 1;

                    const updateSequenceQuery = `SELECT setval('anime_tags_anime_tag_id_seq', $1, false);`;
                    await pool.query(updateSequenceQuery, [maxId]);

                    const insertQuery = `
                        INSERT INTO public.anime_tags (anime_id, tag_id)
                        VALUES ($1, $2)
                        ON CONFLICT (anime_id, tag_id) DO NOTHING
                        RETURNING anime_tag_id;
                    `;

                    const values = [
                        args.anime_id,
                        args.tag_id
                    ];
                    const result = await pool.query(insertQuery, values);
                    return result.rows[0];
                }
                catch (err) {
                    console.error('Error inserting anime_tag:', err);
                    throw new Error('Failed to insert anime_tag');
                }
            }
        },
        addMangaTag: {
            type: MangaTagType,
            args: {
                manga_id: { type: GraphQLInt },
                tag_id: { type: GraphQLInt },
            },
            async resolve(parent, args) {
                try {
                    const maxIdQuery = `SELECT COALESCE(MAX(manga_tag_id), 0) AS max_id FROM public.manga_tags;`;
                    const maxIdResult = await pool.query(maxIdQuery);
                    const maxId = maxIdResult.rows[0].max_id + 1;

                    const updateSequenceQuery = `SELECT setval('manga_tags_manga_tag_id_seq', $1, false);`;
                    await pool.query(updateSequenceQuery, [maxId]);

                    const insertQuery = `
                        INSERT INTO public.manga_tags (manga_id, tag_id)
                        VALUES ($1, $2)
                        ON CONFLICT (manga_id, tag_id) DO NOTHING
                        RETURNING manga_tag_id;
                    `;

                    const values = [
                        args.manga_id,
                        args.tag_id
                    ];
                    const result = await pool.query(insertQuery, values);
                    return result.rows[0];
                }
                catch (err) {
                    console.error('Error inserting manga_tag:', err);
                    throw new Error('Failed to insert manga_tag');
                }
            }
        },
        addRelatedMedia: {
            type: RelatedMediaType,
            args: {
                anime_id: { type: GraphQLInt },
                manga_id: { type: GraphQLInt },
                related_anime_id: { type: GraphQLInt },
                related_manga_id: { type: GraphQLInt },
                relation_type: { type: GraphQLString },
            },
            async resolve(parent, args) {
                try {
                    const maxIdQuery = `SELECT COALESCE(MAX(related_media_id), 0) AS max_id FROM public.related_media;`;
                    const maxIdResult = await pool.query(maxIdQuery);
                    const maxId = maxIdResult.rows[0].max_id + 1;

                    const updateSequenceQuery = `SELECT setval('related_media_related_media_id_seq', $1, false);`;
                    await pool.query(updateSequenceQuery, [maxId]);

                    const insertQuery = `
                        INSERT INTO public.related_media (anime_id, manga_id, related_anime_id, related_manga_id, relation_type)
                        VALUES ($1, $2, $3, $4, $5)
                        ON CONFLICT DO NOTHING
                        RETURNING related_media_id;
                    `;

                    const values = [
                        args.anime_id,
                        args.manga_id,
                        args.related_anime_id,
                        args.related_manga_id,
                        args.relation_type
                    ];
                    const result = await pool.query(insertQuery, values);
                    return result.rows[0];
                }
                catch (err) {
                    console.error('Error inserting related_media:', err);
                    throw new Error('Failed to insert related_media');
                }
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});
