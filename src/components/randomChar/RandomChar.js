import { Component } from 'react';
import Spinner from '../spinner/Spinner';
import View from '../singleView/View';
import ErrorMessage from '../error/Error';
import MarvelService from '../../services/MarvelService';

import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';

class RandomChar extends Component {
   

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

    componentDidMount = () => {
        this.updateRandomChar();
        console.log('mounted');
    }

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
        const { loading, error} = this.state;
        const spinner = loading ? <Spinner/> : null;
        const errorM = error ? <ErrorMessage/> : null;
        const contents = !(loading || error) ? <View data={this.state}/> : null;
         
        return (
            <div className="randomchar">
                {spinner}
                {errorM}
                {contents}
                
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button className="button button__main" onClick={this.updateRandomChar}>
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        )
    }
}


export default RandomChar;