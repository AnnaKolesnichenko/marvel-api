const View = ({data}) => {
    const {name, description, thumbnail, homepage, wiki} = data;
    return (
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
    </div>
    )
}

export default View;