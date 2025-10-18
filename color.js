/**
 * Project Requirements:
 * -Change the background color by generating random hex color by clicking a button
 * -Also display the hex code to a disabled input field
 * -Add a button to copy the color code
 * -add a toast message when the color code is copied
 * -Bonus: Add slide-in and slide-out animation to the toast message
 * -User can type their own color hexadecimal code to the input field and change the background color
 * -# is including in the input field
 * -Lower case to upper case conversion of hex code in the input field
 * -show rgb color too,but do not need to edit it
 * user can also copy the rgb color code
 * 
 * 
 */




// globals
let div = null;

// onload handler
window.onload = () => {

	main();
};
// main or boot function,this function of take care of getting all DOM reference

function main() {

	// step 3 - collect all necessary references

	const root = document.getElementById('root');
	const output = document.getElementById('output');
	const output2 = document.getElementById('output2');
	const changeBtn = document.getElementById('change-btn');
	const copyBtn = document.getElementById('copy-btn');
	const copyBtn2 = document.getElementById('copy-btn2');


	// step 4 - handle the change button click event
	// step 13-update color code to display the rgb colors

	changeBtn.addEventListener('click', function () {

		const color = generateDecimalColor();
		const hex = generateHexColor(color);
		const rgb = generateRGBColor(color);
		root.style.backgroundColor = hex;
		output.value = hex.substring(1);
		output2.value = rgb;

	});

	// step 5 - handle the copy button click event

	copyBtn.addEventListener('click', function () {

		navigator.clipboard.writeText(`#${output.value}`);

		if (div !== null) {
			div.remove();
			div = null;
		}

		// copyBtn.innerHTML = "Code Copied";
		// step 11 - prevent copying hex code if it is not valid

		else if (isValidHex(output.value)) {
			generateToastMessage(`#${output.value} copied to clipboard`);
		} else {
			alert("Invalid Color Code");
		}
	});

	// step 17-implement copy function

	copyBtn2.addEventListener('click', function () {

		navigator.clipboard.writeText(`#${output2.value}`);

		if (div !== null) {
			div.remove();
			div = null;
		}

		// copyBtn.innerHTML = "Code Copied";
		// step 11 - prevent copying hex code if it is not valid

		else if (isValidHex(output.value)) {
			generateToastMessage(`#${output2.value} copied to clipboard`);
		} else {
			alert("Invalid Color Code");
		}
	});

	// step 10-implement change handler on input field

	output.addEventListener('keyup', function (e) {
		const color = e.target.value;
		if (color) {
			output.value = color.toUpperCase();
			if (isValidHex(color)) {
				root.style.backgroundColor = `#${color}`;

				// step 16-update change handler
				output2.value = hexToRGB(color);
			}
		}
	});


}

// event handlers



// DOM Functions
function generateToastMessage(msg) {
	div = document.createElement("div");
	div.innerText = msg;
	div.className = 'toast-message toast-message-slide-in';
	div.addEventListener('click', function () {
		div.classList.remove('toast-message-slide-in');
		div.classList.add('toast-message-slide-out');
		// step 8-clear the toast message after animation end
		div.addEventListener('animationend', function () {
			div.remove()
			div = null;
		})

	})
	document.body.appendChild(div);
}
/**
 * update dom with calculated color values
 */
function updateColorCodeToDom() {
	const colorDisplay = document.getElementById('color-display')
	const colorModeHex = document.getElementById('color-mode-hex')
	const colorModeRgb = document.getElementById('color-mode-rgb')
	const colorSliderRed = document.getElementById('color-slider-red')
	const colorSliderRedLabel = document.getElementById('color-slider-red-label')
	const colorSliderGreen = document.getElementById('color-slider-green')
	const colorSliderGreenLabel = document.getElementById('color-slider-green-label')
	const colorSliderBlue = document.getElementById('color-slider-blue');
	const colorSliderBlueLabel = document.getElementById('color-slider-blue-label');

	const hexColor=generateHexColor(color)
	const rgbColor=generateRGBColor(color)

}
// create function of add


// utility functions

/**
 * function-1-generate three random decimal number for red,green,blue.return as an object
 * @returns 
 */

function generateDecimalColor() {
	const red = Math.floor(Math.random() * 255);
	const green = Math.floor(Math.random() * 255);
	const blue = Math.floor(Math.random() * 255);
	return {
		red,
		green,
		blue
	};

}

/**
 * function-2 generate hex color from decimal color
 * @param {*} param0 
 * @returns 
 */

function generateHexColor({ red, green, blue }) {

	const getTwoCode = (value) => {
		const hex = value.toString(16);
		return hex.length === 1 ? `0${hex}` : hex;
	}


	return `#${getTwoCode(red)}${getTwoCode(green)}${getTwoCode(blue)}`.toUpperCase();
}


/**
 * function-3 generate rgb color from decimal color
 * @param {*} param0 
 * @returns 
 */

function generateRGBColor({ red, green, blue }) {

	return `rgb(${red}, ${green}, ${blue})`;
}

/**
 * function-4 convert hex to decimal color object
 * @param {object} 
 */
function hexToDecimalColor(hex) {
	const red = parseInt(hex.slice(0, 2), 16);
	const green = parseInt(hex.slice(2, 4), 16);
	const blue = parseInt(hex.slice(4, 6), 16);
	return {
		red,
		green,
		blue
	};



}

/**
 * function-4 validate hex color code
 * @param {string} color 
 */


function isValidHex(color) {

	if (color.length !== 6) return false;
	return /^[0-9A-Fa-f]{6}$/i.test(color);
}
//













