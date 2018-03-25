import React, { Component, PureComponent } from 'react';
import './Game.css';

const randomNumberBetween = (min, max) =>
        Math.floor(Math.random() * (max - min + 1)) + min;

class Number extends PureComponent {
    render() {
        return (
            <div className="number">
                <input id="target-number" />
                <button onClick={() => {
                    const el = document.getElementById('target-number');
                    this.props.onSelect(parseInt(el.value));
                }}>Soumettre</button>
            </div>
        );
    }
}

class Game extends Component {
    state = {
        gameStatus: 'pending', // pending | won | lost
        remainingAttempts: this.props.initialAttempts,
        clue: '' // C'est plus | C'est moins
    };

    target = randomNumberBetween(0, this.props.max);

    onNumberSelected = (numberSelected) => {
        this.setState({
            gameStatus: this.computeGameStatus(numberSelected, this.state.remainingAttempts - 1),
            remainingAttempts: this.state.remainingAttempts - 1,
            clue: this.getClue(numberSelected)
        });
    };

    getClue = (numberSelected) => {
        if (numberSelected < this.target) return "C'est plus !";
        else if (numberSelected > this.target) return "C'est moins !";
        else return '';
    };

    computeGameStatus = (numberSelected, remainingAttempts) => {
        if (numberSelected === this.target) {
            return 'won';
        } else if (remainingAttempts === 0) {
            return 'lost';
        }

        return 'pending';
    };

    render() {
        return (
            <div className="game">

                {['won', 'lost'].includes(this.state.gameStatus) && (
                    <div className="result">
                        <h1>Gagné !</h1>
                        <button onClick={this.props.onPlayAgain}>
                            Play Again
                        </button>
                    </div>
                )}

                <p>{this.state.remainingAttempts} essais restants</p>

                <Number onSelect={this.onNumberSelected}/>

                <div className="clue">{this.state.clue}</div>
            </div>
        );
    };
}

export default Game;