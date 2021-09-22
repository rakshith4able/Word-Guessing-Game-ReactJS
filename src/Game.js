import React, { Component } from "react";
import { randomWord } from './words';
import "./Game.css";


class Game extends Component {
  /** by default, allow 6 guesses and use provided gallows images. */
  static defaultProps = {
    maxWrong: 6
  };

  constructor(props) {
    super(props);
    this.state = { nWrong: 0, guessed: new Set(), answer: randomWord() };
    this.handleGuess = this.handleGuess.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  /** guessedWord: show current-state of word:
    if guessed letters are {a,p,e}, show "app_e" for "apple"
  */
  guessedWord() {

    return this.state.answer
      .split("")
      .map(ltr => (this.state.guessed.has(ltr) ? ltr : "_"));
  }

  /** handleGuest: handle a guessed letter:
    - add to guessed letters
    - if not in answer, increase number-wrong guesses
  */
  handleGuess(evt) {
    let ltr = evt.target.value;
    this.setState(st => ({
      guessed: st.guessed.add(ltr),
      nWrong: st.nWrong + (st.answer.includes(ltr) ? 0 : 1)
    }));
  }

  /** generateButtons: return array of letter buttons to render */
  generateButtons() {
    return "ABCDEFGHIJKLMNOPQRWXYZ".split("").map(ltr => (
      <button
        key={ltr}
        value={ltr.toLowerCase()}
        onClick={this.handleGuess}
        disabled={this.state.guessed.has(ltr.toLowerCase())}
      >
        {ltr}
      </button>
    ));
  }

  reset() {

    this.setState((st) => {
      return { nWrong: 0, guessed: new Set(), answer: randomWord() }
    });
  }

  handleReset() {
    this.reset();
  }

  /** render: render game */
  render() {
    const gameOver = this.state.nWrong >= this.props.maxWrong;
    const isWinner = this.guessedWord().join("") === this.state.answer;
    let gameState = this.generateButtons();
    if (isWinner) gameState = "You Win";
    if (gameOver) gameState = "You Lose";

    return (
      <div className='Game'>
        <h1>Guess The Word</h1>

        <p className="Game-chances">Tries Left: {this.props.maxWrong - this.state.nWrong}</p>
        <p className='Game-word'>{!gameOver ? this.guessedWord() : this.state.answer}</p>
        <p className='Game-btns'>{gameState}</p>
        <button id="Game-restart" onClick={this.handleReset}>RESTART</button>
      </div>
    );
  }
}

export default Game;
