import React, { Component } from "react";
import "./App.css";
import Keyboard from "./Keyboard";
import Word from "./Word";

const WORDS = [
			"JAVASCRIPT",
			"REACT",
			"ANGULAR",
			"JQUERY",
			"SYMFONY",
			"APPLE",
			"REDUX",
			"NATIVE",
			"GOOGLE",
			"ANDROID",
		],
		INIT_GAME_TIME = 7200;


class App extends Component {
	state = {
		guesseWord: "",
		matchedLetters: 0,
		guesses: 0,
		alphabet: "ABCDEFGHIJKLMNOPQRSTUVXWYZ".split(""),
		usedLetter: [],
		message: "",
	};

	componentDidMount() {
		window.addEventListener("keyup", (e) => {
			if(e.keyCode === 13){
				this.initGame();
			}
		})
		this.initGame();
	}

	clickLetter = (letter) => {
		const { guesses, guesseWord, usedLetter } = this.state;
							
		if (!usedLetter.includes(letter)) {
			this.setState({
				usedLetter: [letter, ...usedLetter],
			});
		}

		if (!guesseWord.includes(letter)) {
			this.setState({
				guesses: guesses + 1,
			});
			
		} else {
			setTimeout(() => this.setState({
				matchedLetters: document.querySelectorAll(".found").length,
				}), 0);	
		}
		
		this.endGame();

	}
	
	endGame(){
		const { guesses, guesseWord, matchedLetters } = this.state;
		if (guesses === 8) {
			this.setState({message: "PENDU !"});
			setTimeout(() => this.initGame(), INIT_GAME_TIME);		
		}
		if (matchedLetters === guesseWord.length){
			this.initGame();
		}
	}

	generateWords() {
		return WORDS[Math.floor(Math.random()*WORDS.length)];
	}

	initGame = () => {
		this.setState({ 
			guesseWord: this.generateWords(), 
			usedLetter: [], 
			guesses: 0, 
			message: "",
			matchedLetters: 0,
		});
	}

	render() {
		const { guesses, message, matchedLetters, guesseWord, usedLetter, alphabet } = this.state;
		const won = matchedLetters === guesseWord.length;

		return (
			<div className='App-header'>
				<h1>Jeu du pendu</h1>
				<p>Raté { guesses } fois</p>
				{ message !== '' &&  <div id="looser"><p>{ message }</p>
				<span role="img" aria-label="pile of poop">💩</span></div>}
				{ guesseWord !== null && (
					<Word
						guesseWord={guesseWord}
						usedLetter={usedLetter}
					/>
				)}

				{ won && <div id="winner"><p><span role="img" aria-label="trophy">🏆</span></p><p>BRAVO ! 
					Pressez ENTREE ou cliquez sur une lettre pour une nouvelle partie.</p>
				
				</div>}
				<Keyboard
					alphabet={alphabet}
					action={this.clickLetter}
					usedLetter={usedLetter}
				/>

			</div>
		);
	}


}

export default App;
