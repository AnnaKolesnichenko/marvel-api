import { Component } from 'react';
import Spinner from '../spinner/Spinner';
import MarvelService from '../../services/MarvelService';

import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';

class RandomChar extends Component {
    constructor(props) {
        super(props);
        this.updateRandomChar();
    }

    state = {
        name: null,
        description: null,
        thumbnail: null,
        homepage: null,
        wiki: null,
        loading: true, 
        error: false 
    }

    marvelService = new MarvelService();

    onCharacterLoaded = (state) => {
        this.setState({
            name: state.name,
            description: state.description,
            thumbnail: state.thumbnail,
            homepage: state.homepage,
            wiki: state.wiki,
            loading: false
        })
    }

    updateRandomChar = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        this.marvelService
        .getOneCharacter(id)
        .then(this.onCharacterLoaded)
        .catch(this.onError)
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }


    render() {
        const {name, description, thumbnail, homepage, wiki, loading} = this.state;

         
        return (
            <div className="randomchar">
                {loading ? <Spinner/> : 
                <div className="randomchar__block">
                    <img src={thumbnail} alt="Random character" className="randomchar__img"/>
                    <div className="randomchar__info">
                        <p className="randomchar__name">{name}</p>
                        <p className="randomchar__descr">
                            {description ? description.slice(0, 150) + '...' : "Under construction..."}
                        </p>
                        <div className="randomchar__btns">
                            <a href={homepage} className="button button__main">
                                <div className="inner">homepage</div>
                            </a>
                            <a href={wiki} className="button button__secondary">
                                <div className="inner">wiki</div>
                            </a>
                        </div>
                    </div>
                </div>}
                
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button className="button button__main">
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        )
    }
}

// const View = ({data}) => {
//     const {name, description, thumbnail, homepage, wiki} = data;
//     return (
//         <div className="randomchar__block">
//             <img src={thumbnail} alt="Random character" className="randomchar__img"/>
//             <div className="randomchar__info">
//                 <p className="randomchar__name">{name}</p>
//                 <p className="randomchar__descr">
//                     {description ? description.slice(0, 150) + '...' : "Under construction..."}
//                 </p>
//                 <div className="randomchar__btns">
//                     <a href={homepage} className="button button__main">
//                         <div className="inner">homepage</div>
//                     </a>
//                     <a href={wiki} className="button button__secondary">
//                         <div className="inner">wiki</div>
//                     </a>
//                 </div>
//             </div>
//         </div>
//     )

// }

export default RandomChar;