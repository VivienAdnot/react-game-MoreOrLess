import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Game from './Game';

class App extends Component {
    maximum = 20;
    attempts = 5;

    state = {
        gameId: 1
    };

    resetGame = () =>
        this.setState((prevState) => ({
            gameId: prevState.gameId + 1
        }));

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">More Or Less</h1>
                </header>
                <p className="App-intro">
                    Can you guess the number between 0 and {this.maximum} in {this.attempts} attempts!
                </p>

                <Game
                    key={this.state.gameId}
                    max={this.maximum}
                    initialAttempts={this.attempts}
                    onPlayAgain={this.resetGame}
                />
            </div>
        );
    }
}

export default App;
