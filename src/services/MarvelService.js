
class MarvelService {

    BASE_URL = 'https://gateway.marvel.com:443/v1/public/';
    API_KEY = 'aad1f0bca3e8b5a1690fe2572a3a23f4'
    
    getResults = async (query) => {
        
        let res = await fetch(query);
        if(!res.ok) {
            throw new Error(`There is no ${query} query, status is ${res.status}`)
        }  

        return await res.json();
    }

    getAllCharacters = async () => {
        const res = await this.getResults(`${this.BASE_URL}characters?limit=9&offset=250&apikey=${this.API_KEY}`);
        return res.data.results.map(this.transformCharacter);
    }

    getOneCharacter = async (queryId) => {
        const res = await this.getResults(`${this.BASE_URL}characters/${queryId}?apikey=${this.API_KEY}`);
        return this.transformCharacter(res.data.results[0]);
    }

    transformCharacter = (character) => {
        return {
            id: character.id,
            name: character.name,
            description: character.description,
            thumbnail: character.thumbnail.path + '.' + character.thumbnail.extension,
            homepage: character.urls[0].url,
            wiki: character.urls[1].url
        }
    }
}

export default MarvelService;