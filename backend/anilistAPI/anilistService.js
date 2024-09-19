const { fetchAnimeData, fetchMangaData, fetchGenreData, fetchTagData } = require('./anilistFetcher');
const { 
    transformAnimeData, 
    transformGenreData, 
    transformTagData, 
    transformAnimeGenreData, 
    transformAnimeTagData, 
    transformMangaData 
} = require('./anilistTransformer');
const { 
    insertAnimeData, 
    insertMangaData,
    insertGenreData, 
    insertTagData, 
    insertAnimeGenreData, 
    insertAnimeTagData 
} = require('./anilistInserter');

async function getAllAnimeByPage(accessToken) {
    let page = 376; // can change page number for debugging
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
        console.log('All anime have been inserted into the database.');
    } 
    catch (error) {
        console.error('Error fetching anime data:', error);
        throw error;
    }
}

async function getAllMangaByPage(accessToken) {
    let page = 226; // can change page number for debugging
    const perPage = 50;  
    const batchSize = 25;
    let hasNextPage = true;

    try {
        while (hasNextPage) {
            let mangaList = [];

            for (let i = 0; i < batchSize && hasNextPage; i++) {
                const { manga: fetchedManga, hasNextPage: nextPageExists, retry } = await fetchMangaData(accessToken, page, perPage);
                if (retry) {
                    i--;
                    continue;
                }
                mangaList = mangaList.concat(fetchedManga);
                hasNextPage = nextPageExists;
                page++;
            }

            console.log(`Total number of manga fetched: ${mangaList.length}`);

            const transformedMangaList = transformMangaData(mangaList);
            await insertMangaData(transformedMangaList);
            console.log(`Inserted batch of 25 pages, currently at page: ${page - 1}`);
        }
        console.log('All manga have been inserted into the database');
    }
    catch (error) {
        console.error('Error fetching manga data:', error);
        throw error;
    }
}

async function getAllGenres(accessToken) {
    try {
        const genreList = await fetchGenreData(accessToken);
        const transformedGenreList = transformGenreData(genreList);
        await insertGenreData(transformedGenreList);
        console.log('All genres have been inserted into the database.');
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
        console.log('All tags have been inserted into the database.');
    }
    catch (error) {
        console.error('Error fetching tag data:', error);
        throw error;
    }
}

async function getAllAnimeGenres(accessToken, genreMap) {
    let page = 378; // can change page number for debugging
    const perPage = 50;  
    const batchSize = 25;
    let hasNextPage = true;

    try {
        while (hasNextPage) {
            let animeGenreList = [];

            for (let i = 0; i < batchSize && hasNextPage; i++) {
                const { anime: fetchedAnime, hasNextPage: nextPageExists, retry } = await fetchAnimeData(accessToken, page, perPage);
                if (retry) {
                    i--;
                    continue;
                }
                animeGenreList = animeGenreList.concat(fetchedAnime)
                hasNextPage = nextPageExists;
                page++;
            }

            console.log(`Total number of anime fetched: ${animeGenreList.length}`);

            const transformedAnimeGenreList = transformAnimeGenreData(animeGenreList, genreMap);
            await insertAnimeGenreData(transformedAnimeGenreList);
            console.log(`Inserted batch of 25 pages, currently at page: ${page - 1}`);
        }
        console.log('All anime_genres have been inserted into the database.');
    }
    catch (error) {
        console.error('Error fetching anime_genre data:', error);
        throw error;
    }
}

async function getAllAnimeTags(accessToken, tagMap) {
    let page = 376; // can change page number for debugging
    const perPage = 50;  
    const batchSize = 25;
    let hasNextPage = true;

    try {
        while (hasNextPage) {
            let animeTagList = [];

            for (let i = 0; i < batchSize && hasNextPage; i++) {
                const { anime: fetchedAnime, hasNextPage: nextPageExists, retry } = await fetchAnimeData(accessToken, page, perPage);
                if (retry) {
                    i--;
                    continue;
                }
                animeTagList = animeTagList.concat(fetchedAnime);
                hasNextPage = nextPageExists;
                page++;
            }
            
            console.log(`Total number of anime fetched: ${animeTagList.length}`);

            const transformedAnimeTagData = transformAnimeTagData(animeTagList, tagMap);
            await insertAnimeTagData(transformedAnimeTagData);
            console.log(`Inserted batch of 25 pages, currently at page: ${page - 1}`);
        }
        console.log('All anime_tags have been inserted into the database.');
    }
    catch (error) {
        console.error('Error fetching anime_tag data:', error);
        throw error;
    }
}

module.exports = { 
    getAllAnimeByPage, 
    getAllMangaByPage,
    getAllGenres, 
    getAllTags, 
    getAllAnimeGenres, 
    getAllAnimeTags 
};
