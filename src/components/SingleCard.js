import './SingleCard.css';

const SingleCard = ({ card, handleChoice, flipped, disabled }) => {

    const handleClick = () => {
        if (!disabled) {
            handleChoice(card)
        }
    }

    return(
        <div>
             <div className='card'>
                <div className={flipped ? "flipped" : ""}>
                    <img
                        className="front"
                        src={card.src}
                        alt="card front"
                    />
                    <img
                        className="back"
                        src="img/7.jpg"
                        onClick={handleClick}
                        alt="card back"
                    />
                </div>
            </div>
        </div>
    )
}

export default SingleCard;