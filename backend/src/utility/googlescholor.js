const axios = require("axios");

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const CX = process.env.CX; // Custom Search Engine ID

const fetchTitles = async (query) => {
  try {
    const response = await axios.get("https://www.googleapis.com/customsearch/v1", {
      params: {
        key: GOOGLE_API_KEY,
        cx: CX,
        q: query,
      },
    });

    // Extract titles from the API response
    const items = response.data.items || [];
    return items.map((item) => item.title);
  } catch (error) {
    console.error("Error fetching titles from Google API:", error);
    throw error;
  }
};

module.exports = { fetchTitles };