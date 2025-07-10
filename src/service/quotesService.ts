import axios from "axios";

const quotesApi = axios.create({ 
    baseURL: 'https://thequoteshub.com/api'
})

export async function getRandomQuote() {
    try {
        const { data } = await quotesApi.get('/', { headers: { "Accept":"application/json"}});
        const quote = { text: data.text, author: data.author };
        return quote;
    } catch (error) {
        console.error(error);
    }
}