const axios = require('axios');

async function fetchFromCrossRef(query) {
    const url = `https://api.crossref.org/works?query=${encodeURIComponent(query)}`;
    try {
        console.log('Fetching data for query:', query);
        
        // Fetch data from CrossRef
        const response = await axios.get(url);
        
        // Check if the response contains items
        if (response.data.message.items && response.data.message.items.length > 0) {
            // Filter and format the data based on exact match and length
            const formattedResults = response.data.message.items.filter((item) => {
                const titles = item.title || [];
                // Filter titles that exactly match the query (case-sensitive)
                return titles.some((title) => title === query && title.length === query.length);
            }).map((item) => ({
                title: item.title ? item.title[0] : 'No Title Found',
                authors: item.author
                    ? item.author.map((a) => `${a.given} ${a.family}`).join(', ')
                    : 'Unknown',
                doi: item.DOI || 'No DOI Found',
            }));
            
            // Log the formatted results to the console
            console.log("Formatted Results:", formattedResults);
            
            return formattedResults;
        } else {
            console.log('No results found for the given query');
            return [];  // Return an empty array if no results found
        }

    } catch (error) {
        console.error('Error fetching data from CrossRef:', error.message);
        throw error;  // Re-throw the error for further handling
    }
}

module.exports = { fetchFromCrossRef };
