const { fetchMediaData, fetchGenreData, fetchTagData } = require('./anilistFetcher');
const { transformMediaData, transformAttributeData, transformedMediaAttributeData, transformMediaAttributeData } = require('./anilistTransformer');
const { insertData } = require('./anilistInserter');

const animeFields = [
    'anime_id', 'romaji_name', 'english_name', 'native_name', 'description', 
    'cover_image', 'trailer_url', 'episode_duration', 'episode_count', 
    'start_date', 'end_date', 'year', 'season', 'animation_studio', 
    'producers', 'format', 'source'
];

const mangaFields = [
    'manga_id', 'romaji_name', 'english_name', 'native_name', 'description', 
    'cover_image', 'chapter_count', 'volume_count', 'start_date', 
    'end_date', 'format', 'source'
];

function filterFieldsByType(type, data) {
    const validFields = type === 'anime' ? animeFields : mangaFields;

    return Object.fromEntries(
        Object.entries(data).filter(([key]) => validFields.includes(key))
    );
}

async function fetchAndInsertData(type, accessToken, map = null) {
    try {
        if (type === 'genres') {
            const genreList = await fetchGenreData(accessToken);
            const transformedGenreList = transformAttributeData(genreList, 'genre');
            await insertData(transformedGenreList, 'Genre');
        }
        else if (type === 'tags') {
            const tagList = await fetchTagData(accessToken);
            const transformedTagList = transformAttributeData(tagList, 'tag');
            await insertData(transformedTagList, 'Tag');
        }
        else {
            const mediaType = type.includes('anime') ? 'anime' : 'manga';
            let page = mediaType === 'anime' ? 376 : 1476;
            const perPage = 50;
            const batchSize = 25;
            let hasNextPage = true;

            while (hasNextPage) {
                let mediaList = [];

                for (let i = 0; i < batchSize && hasNextPage; i++) {
                    const { media : fetchedMedia, hasNextPage: nextPageExists, retry } = await fetchMediaData(accessToken, page, perPage, mediaType);
                    if (retry) {
                        i--;
                        continue;
                    }
                    mediaList = mediaList.concat(fetchedMedia);
                    hasNextPage = nextPageExists;
                    page++;
                }

                console.log(`Total number of ${mediaType} fetched: ${mediaList.length}`);

                const transformedMediaList = transformMediaData(mediaList, mediaType);
                const filteredMediaList = transformedMediaList.map(item => filterFieldsByType(mediaType, item));
                await insertData(filteredMediaList, mediaType.charAt(0).toUpperCase() + mediaType.slice(1));

                if (['animegenres', 'mangagenres'].includes(type)) {
                    const transformedMediaGenreData = transformMediaAttributeData(mediaList, mediaType, map, 'genres');
                    await insertData(transformedMediaGenreData, mediaType.charAt(0).toUpperCase() + mediaType.slice(1) + 'Genre');
                }
                else if (['animetags', 'mangatags'].includes(type)) {
                    const transformedMediaTagData = transformMediaAttributeData(mediaList, mediaType, map, 'tags');
                    await insertData(transformedMediaTagData, mediaType.charAt(0).toUpperCase() + mediaType.slice(1) + 'Tag');
                }

                console.log(`Inserted batch of 25 pages, currently at page: ${page - 1}`);
            }
        }

        console.log(`${type} have been inserted into the database.`)
    }
    catch (error) {
        console.error(`Error fetching and inserting ${type} data:`, error);
        throw error;
    }
}

module.exports = { fetchAndInsertData };
