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
        const response = await fetch(url, fetchOptions);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch API error:', error);
        throw error;
    }
}





