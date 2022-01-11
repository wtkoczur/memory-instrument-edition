import { useEffect, useState } from 'react'
import './App.css'
import DialogTab from './components/DialogTab';
import SingleCard from './components/SingleCard'
import cardImages from './imagesData';

function App() {
  const [ cards, setCards ] = useState([]);
  const [ turns, setTurns ] = useState(0);
  const [ firstChoice, setFirstChoice ] = useState(null);
  const [ secondChoice, setSecondChoice ] = useState(null);
  const [ disabled, setDisabled ] = useState(false);
  const [ counter, setCounter ] = useState(0);
  const [ bestScore, setBestScore ] = useState(
    JSON.parse(localStorage.getItem("bestScore")) || Number.POSITIVE_INFINITY)

  const shuffleCards = () => {
    const shuffleCards = [...cardImages, ...cardImages]
    .sort(() => Math.random() - 0.5)
    .map((card) => ({ ...card, id: Math.random() }))
    setFirstChoice(null)
    setSecondChoice(null)
    setCards(shuffleCards)
    setScore()
    setTurns(0)
    setCounter(0)
  }

  const handleChoice = (card) => {
    firstChoice ? setSecondChoice(card) : setFirstChoice(card)
  }

  const resetTurn = () => {
    setFirstChoice(null)
    setSecondChoice(null)
    setTurns(prevTurn => prevTurn + 1)
    setDisabled(false)
  }



  useEffect(() => {
    shuffleCards()
  },[]);

  useEffect(() => {
    if (firstChoice && secondChoice) {
      setDisabled(true)
      if (firstChoice.src === secondChoice.src) {
        setCounter(e => e + 1)
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === firstChoice.src) {
              return { ...card, matched: true };
            } else {
              return card
            }
          })
        });
        resetTurn()
      } else {
        setTimeout(() => resetTurn(), 1000)
      }
    }
  }, [firstChoice, secondChoice]);

  const setScore = () => {
    if(counter === 6) {
      const highScore = Math.min(turns, bestScore);
      setBestScore(highScore);
      localStorage.setItem("bestScore", highScore);
    }
  }

  //console.log(cards)

  return (
    <div className="App">
      <h1>Memory - Music Edition</h1>
      <div className="top-bar">
        <button onClick={shuffleCards}>Restart</button>
        <p>Turns: {turns} </p>
        <p> {bestScore !== Infinity  ? `Best score: ${bestScore}` : "" }</p>
      </div>

      {counter === 6
      ? <DialogTab turns={turns} bestScore={bestScore} />
      : <div className="card-grid">
        {cards.map(card => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === firstChoice || card === secondChoice || card.matched}
            disabled={disabled}
          />
        ))}
      </div>}
    </div>
  );
}

export default App