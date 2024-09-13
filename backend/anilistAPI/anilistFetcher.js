const axios = require('axios');
const sleep = require('../utils/sleep');

async function fetchAnimeData(accessToken, page, perPage) {
    const query = `
        query ($page: Int, $perPage: Int) {
            Page(page: $page, perPage: $perPage) {
                media(type: ANIME) {
                    id
                    title {
                        romaji
                        english
                        native
                    }
                    description
                    coverImage {
                        extraLarge
                    }
                    trailer {
                        id
                        site
                    }
                    duration
                    episodes
                    startDate {
                        year
                        month
                        day
                    }
                    endDate {
                        year
                        month
                        day
                    }
                    season
                    seasonYear
                    studios {
                        nodes {
                            name
                            isAnimationStudio
                        }
                    }
                    format
                    source(version: 3)
                }
                pageInfo {
                    hasNextPage
                }
            }
        }
    `;

    try {
        const response = await axios.post(
            'https://graphql.anilist.co',
            { 
                query, 
                variables: { page, perPage } 
            },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            }
        );

        const data = response.data.data.Page;
        return { anime: data.media, hasNextPage: data.pageInfo.hasNextPage };
    } 
    catch (error) {
        if (error.response && error.response.status === 429) {
            console.log('Rate limited. Waiting 20 seconds before retrying...');
            await sleep(20000);
            return { retry: true };
        } else {
            throw error;
        }
    }
}

module.exports = { fetchAnimeData };