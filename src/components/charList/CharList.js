import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import Error from '../error/Error';
import Spinner from '../spinner/Spinner';

import './charList.scss';


class CharList extends Component {
    state = {
        itemList: [],
        loading: true,
        error: false
    }
    
    marvelService = new MarvelService();

    componentDidMount() {
        this.marvelService.getAllCharacters()
            .then(this.onCharListLoaded)
            .catch(this.onError)
    }

    onCharListLoaded = (itemList) => {
        this.setState({
            itemList,
            loading: false
        })
    }

    onError = () => {
        this.setState({
            error: true,
            loading: false
        })
    }

    // Этот метод создан для оптимизации, 
    // чтобы не помещать такую конструкцию в метод render
    renderItems(arr) {
        const items =  arr.map((item) => {
            let imgObjectFit = 'cover';
            if (item.thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg") {
                imgObjectFit = 'contain';
            }
            
            return (
                <li 
                    className="char__item"
                    key={item.id}>
                        <img src={item.thumbnail} alt={item.name} style={{objectFit: imgObjectFit}}/>
                        <div className="char__name">{item.name}</div>
                </li>
            )
        });
        // А эта конструкция вынесена для центровки спиннера/ошибки
        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }

    render() {

        const {itemList, loading, error} = this.state;
        
        const items = this.renderItems(itemList);

        const errorMessage = error ? <Error/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? items : null;

        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                {content}
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}
    // marvelService = new MarvelService();

    // state = {
    //     list: [],
    //     loading: true,
    //     error: false
    // }

    // componentDidMount = () => {
    //     this.onCharactersUpload();
    // }

    // onCharactersUpload = () => {
    //     this.marvelService
    //         .getAllCharacters()
    //         // .then(this.onListLoaded)
    //         .then(() => this.onListLoaded)
    //         .catch(this.onError)
    // }

    // onListLoaded = (list) => {
    //     this.setState({
    //         list: list,
    //         loading: false
    //     })
    // }

    // onError = () => {
    //     this.setState({
    //         loading: false,
    //         error: true
    //     })
    // }

    // renderListItems(arr) {
    //     const items = arr.map(item => {
    //         let imgObjectFit = 'cover';
    //         if (item.thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg") {
    //             imgObjectFit = 'contain';
    //         }

    //         return(
    //             <li className="char__item">
    //                 <img src={item.thumbnail} alt={item.name} style={{objectFit: imgObjectFit}}/>
    //                 <div className="char__name">{item.name}</div>
    //             </li>
    //         )
    //     });
    //     return (
    //         <ul className="char__grid">
    //             {items}
    //         </ul>
    //     )
    // }


    // render() {
    //     const {list, loading, error} = this.state;
    //     const items = this.renderListItems(list);

    //     const errorM = error ? <Error/> : null;
    //     const spinner = loading ? <Spinner/> : null;
    //     const contentItems = !(loading || error) ? items : null;

    //     return (
    //         <div className="char__list">
    //             {errorM}
    //             {spinner}
    //             {contentItems}
    //             <button className="button button__main button__long">
    //                 <div className="inner">load more</div>
    //             </button>
    //         </div>
    //     )
    // }


export default CharList;