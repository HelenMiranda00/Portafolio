// fetchAPI.js

/**
 * Fetch data from the provided API endpoint.
 * @param {string} url - The URL of the API endpoint.
 * @param {string} apiKey - The API key needed for authentication.
 * @param {Object} [options] - Optional fetch options (method, headers, body, etc.).
 * @returns {Promise<Object>} - A promise that resolves to the response data.
 * @throws Will throw an error if the fetch request fails or if the response status is not ok.
 */
export async function fetchAPI(url, apiKey, options = {}) {

    const headers = {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
    };

    const fetchOptions = {
        ...options,
        headers
    };

    try {
        const res = await fetch(url, fetchOptions);
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Hubo un error:', error);
        throw error;
    }
};

/**
 * Funtion for clean and get the image.
 * @param {Array} array - the Array of image
 * @returns {Array} - A new Array
 */
export const getImage = (array) => {
    return array.map(record => {
        if (record.fields.image_1 && record.fields.image_1[0].url) {
            let image = record?.fields?.image_1[0]?.url;
            let title = record?.fields?.title;
            let alt = record?.fields?.alt;
            return { image, title, alt };
        }
        return null;
    }).filter(item => item !== null);
};

/**
 * Funtion for get the information profile.
 * @param {Array} array - the Array of information to filter
 * @returns {Array} - A new Array
 */
export const getInfoProfile = (array) => {

    return array.map(record => {
        if (record.fields.image_1 && record.fields.image_1[0].size > 0) {
            let url;
            let imgModal;
            if (record.fields.image_modal[0].url) { imgModal = record?.fields?.image_modal[0].url }
            if (record.fields.image_1[0].url) { url = record?.fields?.image_1[0].url }
            else if (record.fields.image_2[0].url) { url = record?.fields?.image_2[0]?.url }
            else if (record.fields.image_3[0].url) { url = record?.fields?.image_3[0]?.url }

            let linkContact = record?.fields?.contact;
            let iconsContact = record?.fields?.icons;
            let title = record?.fields?.title;
            let alt = record?.fields?.alt;
            return { title, alt, url, imgModal, linkContact, iconsContact };
        }
        return null;
    }).filter(item => item !== null);
};