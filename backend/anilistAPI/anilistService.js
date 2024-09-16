const { fetchAnimeData, fetchGenreData, fetchTagData } = require('./anilistFetcher');
const { transformAnimeData, transformGenreData, transformTagData } = require('./anilistTransformer');
const { insertAnimeData, insertGenreData, insertTagData } = require('./anilistInserter');

async function getAllAnimeByPage(accessToken) {
    let page = 377; // can change page number for debugging
    const perPage = 50;  
    const batchSize = 25;
    let hasNextPage = true;

    try {
        while (hasNextPage) {
            let animeList = [];

            for (let i = 0; i < batchSize && hasNextPage; i++) {
                const { anime: fetchedAnime, hasNextPage: nextPageExists, retry } = await fetchAnimeData(accessToken, page, perPage);
                if (retry) {
                    i--;
                    continue;
                }
                animeList = animeList.concat(fetchedAnime);
                hasNextPage = nextPageExists;
                page++;
            }

            console.log(`Total number of anime fetched: ${animeList.length}`);

            const transformedAnimeList = transformAnimeData(animeList);
            await insertAnimeData(transformedAnimeList);
            console.log(`Inserted batch of 25 pages, currently at page: ${page - 1}`);
        }
        console.log("All anime have been inserted into the database.");
    } 
    catch (error) {
        console.error('Error fetching anime data:', error);
        throw error;
    }
}

async function getAllGenres(accessToken) {
    try {
        const genreList = await fetchGenreData(accessToken);
        const transformedGenreList = transformGenreData(genreList);
        await insertGenreData(transformedGenreList);
        console.log("All genres have been inserted into the database.");
    }
    catch (error) {
        console.error('Error fetching genre data:', error);
        throw error;
    }
}

async function getAllTags(accessToken) {
    try {
        const tagList = await fetchTagData(accessToken);
        const transformedTagList = transformTagData(tagList);
        await insertTagData(transformedTagList);
        console.log("All tags have been inserted into the database.");
    }
    catch (error) {
        console.error('Error fetching genre data:', error);
        throw error;
    }
}

module.exports = { getAllAnimeByPage, getAllGenres, getAllTags };
