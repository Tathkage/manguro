const { graphql } = require('graphql');
const schema = require('../schema/schema');

async function insertAnimeData(animeList) {
    for (const anime of animeList) {
        const mutation = `
            mutation {
                addAnime(
                    anime_id: ${anime.anime_id},
                    romaji_name: ${anime.romaji_name ? `"${anime.romaji_name}"` : null},
                    english_name: ${anime.english_name ? `"${anime.english_name}"` : null},
                    native_name: ${anime.native_name ? `"${anime.native_name}"` : null},
                    description: ${anime.description ? `"${anime.description}"` : null},
                    cover_image: ${anime.cover_image ? `"${anime.cover_image}"` : null},
                    trailer_url: ${anime.trailer_url ? `"${anime.trailer_url}"` : null},
                    episode_duration: ${anime.episode_duration || null},
                    episode_count: ${anime.episode_count || null},
                    start_date: ${anime.start_date ? `"${anime.start_date}"` : null},
                    end_date: ${anime.end_date ? `"${anime.end_date}"` : null},
                    year: ${anime.year || null},
                    season: ${anime.season ? `"${anime.season}"` : null},
                    animation_studio: ${anime.animation_studio ? `"${anime.animation_studio}"` : null},
                    producers: ${anime.producers ? `[${anime.producers.map(p => `"${p}"`).join(', ')}]` : null},
                    format: ${anime.format ? `"${anime.format}"` : null},
                    source: ${anime.source ? `"${anime.source}"` : null}
                ) 
                {
                    anime_id
                    romaji_name
                }
            }
        `;
        
        const result = await graphql({ schema, source: mutation });
        if (result.errors) {
            console.error(`Error inserting ${anime.romaji_name} via GraphQL:`, result.errors);
        }
    }
}

async function insertMangaData(mangaList) {
    for (const manga of mangaList) {
        const mutation = `
            mutation {
                addManga(
                    manga_id: ${manga.manga_id},
                    romaji_name: ${manga.romaji_name ? `"${manga.romaji_name}"` : null},
                    english_name: ${manga.english_name ? `"${manga.english_name}"` : null},
                    native_name: ${manga.native_name ? `"${manga.native_name}"` : null},
                    description: ${manga.description ? `"${manga.description}"` : null},
                    cover_image: ${manga.cover_image ? `"${manga.cover_image}"` : null},
                    chapter_count: ${manga.chapter_count || null},
                    volume_count: ${manga.volume_count || null},
                    start_date: ${manga.start_date ? `"${manga.start_date}"` : null},
                    end_date: ${manga.end_date ? `"${manga.end_date}"` : null},
                    format: ${manga.format ? `"${manga.format}"` : null},
                    source: ${manga.source ? `"${manga.source}"` : null}
                ) 
                {
                    manga_id
                    romaji_name
                }
            }
        `;
        
        const result = await graphql({ schema, source: mutation });
        if (result.errors) {
            console.error(`Error inserting ${manga.romaji_name} via GraphQL:`, result.errors);
        }
    }
}

async function insertGenreData(genreList) {
    for (const genre of genreList) {
        const mutation = `
            mutation {
                addGenre(
                    genre_id: ${genre.genre_id},
                    name: "${genre.name}"
                )
                {
                    genre_id
                    name
                }
            }
        `;

        const result = await graphql({ schema, source: mutation });
        if (result.errors) {
            console.error(`Error inserting ${genre} via GraphQL:`, result.errors);
        }
    }
}

async function insertTagData(tagList) {
    for (const tag of tagList) {
        const mutation = `
            mutation {
                addTag(
                    tag_id: ${tag.tag_id},
                    name: "${tag.name}"
                )
                {
                    tag_id
                    name
                }
            }
        `;

        const result = await graphql({ schema, source: mutation });
        if (result.errors) {
            console.error(`Error inserting ${tag} via GraphQL:`, result.errors);
        }
    }
}

async function insertAnimeGenreData(animeGenreList) {
    for (const animeGenre of animeGenreList) {
        const mutation = `
            mutation {
                addAnimeGenre(
                    anime_id: ${animeGenre.anime_id},
                    genre_id: ${animeGenre.genre_id}
                )
                {
                    anime_genre_id
                }
            }
        `;

        const result = await graphql({ schema, source: mutation });
        if (result.errors) {
            console.error(`Error inserting ${animeGenre} via GraphQL:`, result.errors);
        }
    }
}

async function insertAnimeTagData(animeTagList) {
    for (const animeTag of animeTagList) {
        const mutation = `
            mutation {
                addAnimeTag(
                    anime_id: ${animeTag.anime_id},
                    tag_id: ${animeTag.tag_id}
                )
                {
                    anime_tag_id
                }
            }
        `;

        const result = await graphql({ schema, source: mutation });
        if (result.errors) {
            console.error(`Error inserting ${animeTag} via GraphQL:`, result.errors);
        }
    }
}

module.exports = { 
    insertAnimeData, 
    insertMangaData,
    insertGenreData, 
    insertTagData, 
    insertAnimeGenreData, 
    insertAnimeTagData 
};
