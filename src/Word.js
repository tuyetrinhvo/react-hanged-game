import React from "react";
import './Word.css';
import PropTypes from 'prop-types';

const Word = ({ guesseWord, usedLetter }) => (
	<div id="wordFound">
		{guesseWord.split("").map((letter, key) => {
			let status = "found";

			if (!usedLetter.includes(letter)) {
				status = "mismatched";
			}

			return (
				<span key={"letter_" + key} className={status}>
					{status === "found" ? letter : ` _ `}
				</span>
			);
		})}
	</div>
);

Word.propTypes = {
	guesseWord: PropTypes.string.isRequired,
	usedLetter: PropTypes.array.isRequired,
}

export default Word;
