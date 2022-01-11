import './DialogTab.css';

const DialogTab = ({ bestScore, turns }) => {
    return(
        <div className="dialogTab">
            {turns < bestScore
                ?
                    <div>
                        <p>Congratulations, you got the best score!
                        <p>Your score: {turns}</p>
                        </p>
                    </div>
                : <p>Congratulations, you did it in {turns} rounds</p>}
        </div>
    )
}
export default DialogTab;
