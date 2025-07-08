import axios from "axios";

const quotesApi = axios.create({ 
    baseURL: 'https://zenquotes.io/api'
})

export async function getRandomQuote() {
    try {
        const { data } = await quotesApi.get('/random');
        const quote = data[0];
    } catch (error) {
        console.error(error);
    }
}
export async function getRandomQuoteWithFetch() {
    try {
        const res= await fetch('https://thequoteshub.com/api/');
        const data = await res.json();
        const quote = data;
        console.log(quote);
    } catch (error) {
        console.error(error);
    }
}