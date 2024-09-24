const { graphql } = require('graphql');
const schema = require('../schema/schema');

const returnFieldMap = new Map([
    ['AnimeGenre', 'anime_genre_id'],
    ['MangaGenre', 'manga_genre_id'],
    ['AnimeTag', 'anime_tag_id'],
    ['MangaTag', 'manga_tag_id'],
    ['RelatedMedia', 'related_media_id']
]);

function generateMutation(entity, entityFields) {
    const fields = Object.entries(entityFields).map(([key, value]) => {
        if (Array.isArray(value)) {
            return `${key}: [${value.map(v => `"${v}"`).join(', ')}]`;
        }
        if (typeof value === 'string') {
            return `${key}: "${value}"`;  
        }
        return `${key}: ${value}`;  
    }).join(', ');

    const returnField = returnFieldMap.get(entity) || `${entity.toLowerCase()}_id`; 

    return `
        mutation {
            add${entity}(${fields}) {
                ${returnField}
            }
        }
    `;
}

async function insertData(dataList, type) {
    for (const data of dataList) {
        const mutation = generateMutation(type, data);
        const result = await graphql({ schema, source: mutation });
        if (result.errors) {
            console.error(`Error inserting ${type} via GraphQL:`, result.errors);
        }
    }
}

module.exports = { insertData };
