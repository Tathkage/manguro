const { seasonMap, formatMap, sourceMap } = require('../db/dbConfig');
const cleanString = require('../utils/cleanString');

function transformAnimeData(animeList) {
    return animeList.map(anime => {
        anime.season = seasonMap[anime.season] || anime.season;
        anime.format = formatMap[anime.format] || anime.format;
        anime.source = sourceMap[anime.source] || anime.source;

        const producers = anime.studios.nodes
            .filter(studio => !studio.isAnimationStudio)  
            .map(studio => studio.name);

        return {
            anime_id: anime.id,
            romaji_name: anime.title.romaji ? cleanString(anime.title.romaji) : null,
            english_name: anime.title.english ? cleanString(anime.title.english) : null,
            native_name: anime.title.native ? cleanString(anime.title.native) : null,
            description: anime.description ? cleanString(anime.description) : null,
            cover_image: anime.coverImage && anime.coverImage.extraLarge ? anime.coverImage.extraLarge : null,
            trailer_url: anime.trailer && anime.trailer.site ? `https://www.${anime.trailer.site}.com/watch?v=${anime.trailer.id}` : null,
            episode_duration: anime.duration || null,
            episode_count: anime.episodes || null,
            start_date: anime.startDate && anime.startDate.year && anime.startDate.month && anime.startDate.day 
                ? `${anime.startDate.year}-${anime.startDate.month}-${anime.startDate.day}` 
                : null,
            end_date: anime.endDate && anime.endDate.year && anime.endDate.month && anime.endDate.day 
                ? `${anime.endDate.year}-${anime.endDate.month}-${anime.endDate.day}` 
                : null,
            year: anime.seasonYear || null,
            season: anime.season || null,
            animation_studio: anime.studios && anime.studios.nodes.length > 0 && anime.studios.nodes[0].isAnimationStudio 
                ? anime.studios.nodes[0].name 
                : null,
            producers: producers.length > 0 ? producers : null,
            format: anime.format || null,
            source: anime.source || null
        };
    });
}

function transformGenreData(genreList) {
    let nextId = 1;

    return genreList.map(genre => {
        return {
            genre_id: nextId++,
            name: genre
        };
    });
}

function transformTagData(tagList) {
    let nextId = 1;

    return tagList.map(tag => {
        return {
            tag_id: nextId++,
            name: tag.name
        };
    });
}

function transformAnimeGenreData(animeGenreList, genreMap) {
    const animeGenreData = [];

    animeGenreList.forEach(anime => {
        anime.genres.forEach(genre => {
            const genreId = genreMap[genre];
            animeGenreData.push({
                anime_id: anime.id,
                genre_id: genreId
            });
        });
    });

    return animeGenreData;
}

function transformAnimeTagData(animeTagList, tagMap) {
    const animeTagData = [];

    animeTagList.forEach(anime => {
        anime.tags.forEach(tag => {
            const tagId = tagMap[tag.name];
            animeTagData.push({
                anime_id: anime.id,
                tag_id: tagId
            });
        });
    });

    return animeTagData;
}

module.exports = { transformAnimeData, transformGenreData, transformTagData, transformAnimeGenreData, transformAnimeTagData };