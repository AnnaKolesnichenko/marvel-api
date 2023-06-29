const BASE_URL = 'https://gateway.marvel.com:443/v1/public/';
const API_KEY = 'aad1f0bca3e8b5a1690fe2572a3a23f4'

class MarvelService {
    
    getResults = async (query) => {
        
        let res = await fetch(query);
        if(!res.ok) {
            throw new Error(`There is no ${query} query, status is ${res.status}`)
        }  

        return await res.json();
    }

    getAllCharacters = () => {
        return this.getResults(`${BASE_URL}characters?limit=9&offset=250&apikey=${API_KEY}`);
    }

    getOneCharacter = (queryId) => {
        return this.getResults(`${BASE_URL}characters/${queryId}?apikey=${API_KEY}`)
    }
}

export default MarvelService;