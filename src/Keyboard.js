import React, { Component } from "react";
import "./Keyboard.css"

class Keyboard extends Component {
	componentDidMount() {
		window.addEventListener("keydown", (e) => {
			if (this.props.alphabet.includes(e.key.toUpperCase())) {
				this.props.action(e.key.toUpperCase());
			}
		});
	}

	render() {
		return (
			<div id="keyboard">
				{this.props.alphabet.map((letter, key) => (
					<button
						key={"keyboard_" + key}
						onClick={() => this.props.action(letter)}
						className={this.props.usedLetter.includes(letter) ? "used" : ''}>
						{letter}
					</button>
				))}
			</div>
		);
	}
}

export default Keyboard;
