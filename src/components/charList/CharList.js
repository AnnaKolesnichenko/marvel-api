import { Component } from 'react';

import './charList.scss';
import MarvelService from '../../services/MarvelService';
import abyss from '../../resources/img/abyss.jpg';


class CharList extends Component {

    state = {
        data: {
            name: null,
            description: null,
            thumbnail: null,
            homepage: null,
            wiki: null,
        },
        loading: true, 
        error: false 
    }

    marvelService = new MarvelService();

    onSingleCharacterLoaded = (state) => {
        this.setState({
            name: state.name,
            description: state.description,
            thumbnail: state.thumbnail,
            homepage: state.homepage,
            wiki: state.wiki,
            loading: false
        })
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    onCharactersLoaded = () => {
        const all = this.marvelService
            .getAllCharacters()
            .then(res => res.map(item => {

            }))
            return all;
            
    }

    

      

    render() {
        const {data, loading, error} = this.state;

        const charElements = this.renderAllItems(data);

        // const spinner = loading ? <Spinner/> : null;
        // const errorM = error ? <ErrorMessage/> : null;
        // const contents = !(loading || error) ? charElements : null;
        
        return (
            <div className="char__list">
                {charElements}
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

export default CharList;