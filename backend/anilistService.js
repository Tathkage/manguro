const axios = require('axios');

async function getAnimeByTitle(title, accessToken) {
    const query = `
        query ($search: String) {
            Media(search: $search, type: ANIME) {
                id
                title {
                    romaji
                    english
                }
                coverImage {
                    extraLarge
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
                    }
                }
                format
            }
        }
    `;

    const variables = {
        search: title,
    };

    try {
        const response = await axios.post(
            'https://graphql.anilist.co',
            {
                query,
                variables,
            },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            }
        );
        return response.data.data.Media;
    } 
    catch (error) {
        console.error('Error fetching anime data:', error);
        throw error;
    }
}

module.exports = { getAnimeByTitle };
