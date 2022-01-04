const keyBtns = document.querySelectorAll('.key');
const deleteBtn = document.querySelector('.delete');
const resetBtn = document.querySelector('.reset');
const equalSsignBtn = document.querySelector('.equal-sign');
const calculatorDisplay = document.querySelector('.calculator__display');
const radioColorInputs = document.querySelectorAll('.color-input');
const colorBtn = document.querySelector('.toggle-box');
let root = document.documentElement;

let firstValue = 0;
let operatorValue = '';
let awaitingNextValue = false;
let selectedColor;

const sendNumberValue = (number) => {
	if (awaitingNextValue) {
		calculatorDisplay.textContent = number;
		awaitingNextValue = false;
	} else {
		const displayValue = calculatorDisplay.textContent;
		calculatorDisplay.textContent = displayValue === '0' ? number : displayValue + number;
	}
};

const reset = () => {
	firstValue = 0;
	operatorValue = '';
	awaitingNextValue = false;
	calculatorDisplay.textContent = '0';
};

const addDecimalPoint = () => {
	if (awaitingNextValue) return;
	if (!calculatorDisplay.textContent.includes('.')) {
		calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
	}
};

const calculate = {
	'/': (firstNumber, secondNumber) => firstNumber / secondNumber,

	'*': (firstNumber, secondNumber) => firstNumber * secondNumber,

	'+': (firstNumber, secondNumber) => firstNumber + secondNumber,

	'-': (firstNumber, secondNumber) => firstNumber - secondNumber,

	'=': (firstNumber, secondNumber) => secondNumber,
};

const useOperator = (operator) => {
	const currentValue = Number(calculatorDisplay.textContent);
	if (operatorValue && awaitingNextValue) {
		operatorValue = operator;
		return;
	}

	if (!firstValue) {
		firstValue = currentValue;
	} else {
		const calculation = calculate[operatorValue](firstValue, currentValue);
		calculatorDisplay.textContent = calculation;
		firstValue = calculation;
	}

	awaitingNextValue = true;
	operatorValue = operator;
};

keyBtns.forEach((keyBtn) => {
	if (keyBtn.classList.length === 1) {
		keyBtn.addEventListener('click', () => sendNumberValue(keyBtn.value));
	} else if (keyBtn.classList.contains('operator')) {
		keyBtn.addEventListener('click', () => useOperator(keyBtn.value));
	} else if (keyBtn.classList.contains('decimal')) {
		keyBtn.addEventListener('click', () => addDecimalPoint());
	}
});

const setBackgroundColors = (mainBackground, secondBackground, screenBackground) => {
	root.style.setProperty('--mainBackground', mainBackground);
	root.style.setProperty('--secondBackground', secondBackground);
	root.style.setProperty('--screenBackground', screenBackground);
};

const setKeyColors = (mainKeyColor, secondKeyColor, thirdKeyColor) => {
	root.style.setProperty('--mainKeyColor', mainKeyColor);
	root.style.setProperty('--secondKeyColor', secondKeyColor);
	root.style.setProperty('--thirdKeyColor', thirdKeyColor);
};

const setKeyHoverColors = (mainKeyHoverColor, secondKeyHoverColor, thirdKeyHoverColor) => {
	root.style.setProperty('--mainKeyHoverColor', mainKeyHoverColor);
	root.style.setProperty('--secondKeyHoverColor', secondKeyHoverColor);
	root.style.setProperty('--thirdKeyHoverColor', thirdKeyHoverColor);
};

const setKeyShadowColors = (mainKeyShadow, secondKeyShadow, thirdKeyShadow) => {
	root.style.setProperty('--mainKeyShadow', mainKeyShadow);
	root.style.setProperty('--secondKeyShadow', secondKeyShadow);
	root.style.setProperty('--thirdKeyShadow', thirdKeyShadow);
};

const setTextColors = (displayColor, textColor) => {
	root.style.setProperty('--displayColor', displayColor);
	root.style.setProperty('--textColor', textColor);
};

const getRadioValue = (inputs) => {
	let radioValue;
	inputs.forEach((radioInput) => {
		if (radioInput.checked) {
			radioValue = radioInput.value;
		}
	});
	return radioValue;
};

const changeColors = (selectedColor) => {
	switch (selectedColor) {
		case 'color1':
			setBackgroundColors('rgb(58, 71, 100)', 'rgb(36, 45, 68)', 'rgb(24, 32, 52)');
			setKeyColors('rgb(234, 227, 220)', 'rgb(208, 63, 47)', 'rgb(99, 112, 151)');
			setKeyHoverColors('rgb(255, 255, 254)', 'rgb(249, 107, 91)', 'rgb(162, 178, 225)');
			setKeyShadowColors('rgb(179, 164, 151)', 'rgb(147, 38, 26)', 'rgb(64, 78, 114)');
			setTextColors('rgb(255, 255, 255)', 'rgb(68, 75, 90)');
			break;
		case 'color2':
			setBackgroundColors('rgb(229, 228, 225)', 'rgb(210, 205, 205)', 'rgb(238, 238, 238)');
			setKeyColors('rgb(229, 228, 225)', 'rgb(200, 84, 2)', 'rgb(55, 129, 135)');
			setKeyHoverColors('rgb(255, 255, 255)', 'rgb(255, 138, 56)', 'rgb(98, 181, 188)');
			setKeyShadowColors('rgb(238, 238, 238)', 'rgb(135, 57, 1)', 'rgb(27, 96, 102)');
			setTextColors('rgb(54, 54, 44)', 'rgb(54, 54, 44)');
			break;
		case 'color3':
			setBackgroundColors('rgb(23, 6, 42)', 'rgb(30, 9, 54)', 'rgb(30, 9, 54)');
			setKeyColors('rgb(51, 28, 77)', 'rgb(0, 222, 208)', 'rgb(86, 7, 124)');
			setKeyHoverColors('rgb(108, 52, 172)', 'rgb(147, 255, 248)', 'rgb(134, 49, 175)');
			setKeyShadowColors('rgb(136, 28, 158)', 'rgb(108, 249, 241)', 'rgb(190, 21, 244)');
			setTextColors('rgb(255, 229, 61)', 'rgb(255, 229, 61)');
			break;
	}
};

resetBtn.addEventListener('click', reset);
equalSsignBtn.addEventListener('click', () => useOperator('='));
deleteBtn.addEventListener('click', () => {
	if (awaitingNextValue === false) {
		calculatorDisplay.textContent = calculatorDisplay.textContent.slice(0, -1);
	}
});
colorBtn.addEventListener('click', () => {
	selectedColor = getRadioValue(radioColorInputs);
	console.log(`${selectedColor}`);
	changeColors(selectedColor);
});
