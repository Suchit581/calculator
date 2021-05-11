// variable declaration start

// * theme change variable start here
let toggleButton = document.querySelector('#toggleTheme');
let calculatorWrapper = document.querySelector('.calculator-wrapper');
let wave = document.querySelector('.wave');
let display = document.querySelector('.display input');
let history = document.querySelector('.display label');
let container = document.querySelector('.calculator');
// * theme change variable end here

// * calculator functionality variable start here
let keys = document.querySelector('.keys');
let action = keys.querySelectorAll('.action');
let sign = keys.querySelectorAll('.sign');
let operator = keys.querySelectorAll('.operator');
let number = keys.querySelectorAll('.number');
let key = keys.querySelectorAll('.key');
// * calculator functionality variable end here

// variable declaration end

/*
 * Theme change
 */

function waveAnimation(theme = 'white') {
	if (theme == 'white') {
		wave.style.cssText =
			'position:absolute; z-index:1; background :var(--color-black-1); width:100%; height:100%; mix-blend-mode:darken; clip-path:circle(0% at 100% -0.1%);';
		//  for loop for the clip path full circle
		for (let i = 0; i < 150; i++) {
			task(i);
		}

		function task(i) {
			setTimeout(function () {
				wave.style.clipPath = 'circle(' + i + '% at 100% -0.1%)';
			}, 5 * i);
		}
		display.style.color = 'var(--color-white-1)';
		calculatorWrapper.style.background = 'var(--color-white-1)';
	} else {
		wave.style.cssText =
			'position:absolute; z-index:1; background :white; width:100%; height:100%; mix-blend-mode:color-dodge; clip-path:circle(0% at 100% -0.1%);';
		//  for loop for the clip path full circle
		for (let i = 0; i < 150; i++) {
			task(i);
		}

		function task(i) {
			setTimeout(function () {
				wave.style.clipPath = 'circle(' + i + '% at 100% -0.1%)';
			}, 5 * i);
		}
		calculatorWrapper.style.background = 'var(--color-black-1)';
		display.style.color = 'black';
		display.style.fontWeight = '500';
	}
	return true;
}

// theme change start
const toggle = () => {
	calculatorWrapper.classList.add('active');

	setTimeout(() => {
		calculatorWrapper.classList.toggle('active');
	}, 300);

	setTimeout(() => {
		calculatorWrapper.classList.remove('animate');
	}, 600);
};

// theme change toggle button event lister
// ! click event is use
toggleButton.addEventListener('click', function () {
	toggle();
	if (calculatorWrapper.classList.contains('dark-theme')) {
		waveAnimation('dark');
		calculatorWrapper.classList.contains('dark-theme')
			? calculatorWrapper.classList.remove('dark-theme')
			: calculatorWrapper.classList.add('dark-theme');
		container.style.background = 'var(--color-black-1)';
	} else {
		waveAnimation('white');
		calculatorWrapper.classList.contains('dark-theme')
			? calculatorWrapper.classList.remove('dark-theme')
			: calculatorWrapper.classList.add('dark-theme');
		container.style.background = 'var(--color-white-1)';
	}
});

// default value for the section theme
container.style.background = 'var(--color-black-1)';
container.style.transition = 'background .5s linear';
// theme change end

// calculator function and process start here

/*
? global variable for the calculator function
? process function
? event listener for every keys
*/

// global variable are here
let number1 = ''; // ? number 1 for the calculator
let number2 = ''; // ? number 2 for the calculator
let operatorArray = ['+', '-', '÷', '×', '%']; // ? operator for the calculator
let activeOperator = ''; // ? checking for which operator is active right now
let isResult = false; // ? checking variable is result or not
let plusMinus = false; // ? plusMinus toggle button
let historyError = ''; // ? temporary divide zero history variable
let error = 'Not Allow'; // ? error variablew

// reset calculator when page refresh
ac();

// function for debugging purpose
const displayValue = (temp = '') => {
	console.log(number1);
	console.log(number2);
	console.log(activeOperator);
	console.log(operatorArray);
	console.log(isResult);
	console.log(temp);
};

// process function are here

/*
? plus
? minus
? division
? multiplication
? module
*/

const plus = () => parseFloat(number1) + parseFloat(number2);
const minus = () => parseFloat(number1) - parseFloat(number2);
const division = () => {
	if (number2 == 0) {
		historyError = historyGet();
		display.value = error;
		historySet(historyError);
	} else {
		let a = Math.abs(parseFloat(number1) / parseFloat(number2));
		// alert(`number1 = ${number1} number2 =  ${number1} result = ${a}`);
		return a;
	}
};
const multiplication = () => parseFloat(number1) * parseFloat(number2);
const module = () => parseFloat(number1) * 0.01 * parseFloat(number2);

// Extra Function or the sub function for main function

// ? calculator display reset to 0
function displayReset() {
	display.value = 0;
}

// ? history set method
function historySet(input = '') {
	history.innerText = input;
}

// ? history get method
function historyGet() {
	return history.innerText;
}

// ? AC function for resetting every variable and calculator
function ac() {
	display.value = 0;
	number1 = 0;
	number2 = 0;
	activeOperator = '';
	isResult = false;
	historySet();
}

// ? backspace function
function backspace() {
	let currentValue = display.value.toString();
	currentValue.slice(0, -1) == ''
		? displayReset()
		: (display.value = currentValue.slice(0, -1));
	isResult = false;
}

// ? add number function
function addNumber(number) {
	let currentValue = display.value.toString();
	if (isResult === false) {
		if (currentValue === '0' || currentValue === error) {
			if (number == '.') {
				display.value = '0' + number;
			} else {
				display.value = number;
			}
		} else if (currentValue.length >= 12) {
			display.value = currentValue;
		} else {
			if (number == '.') {
				if (!display.value.includes('.')) {
					display.value = currentValue.concat(number);
				}
			} else {
				display.value = currentValue.concat(number);
			}
		}
	} else {
		if (number === '.') {
			display.value = '0' + number;
		} else {
			display.value = number;
		}
		isResult = false;
	}
}

// ? operation function
function operation(operator) {
	isResult = false;
	// if the active operator is set then the history type work or else regular type work
	if (activeOperator == '') {
		activeOperator = operator;
		number1 = display.value.toString();
		historySet(display.value + ' ' + activeOperator);
		displayReset();
	} else {
		let history = historyGet();
		let n2 = display.value;
		if (n2 != 0) {
			switch (operator) {
				case '+':
					number1 = parseFloat(number1) + parseFloat(n2);
					historySet(`${history} ${n2} +  `);
					display.value = '0';
					activeOperator = operatorArray[0];
					break;
				case '-':
					number1 = parseFloat(number1) - parseFloat(n2);
					historySet(history + n2 + ' -  ');
					display.value = '0';
					activeOperator = operatorArray[1];
					break;
				case '÷':
					number1 = parseFloat(number1) / parseFloat(n2);
					historySet(history + n2 + ' ÷ ');
					display.value = '0';
					activeOperator = operatorArray[2];
					break;
				case '×':
					number1 = parseFloat(number1) * parseFloat(n2);
					historySet(history + n2 + ' × ');
					display.value = '0';
					activeOperator = operatorArray[3];
					break;
				case '%':
					if (display.value == '0') {
						n2 = 1;
					}
					number1 = (parseFloat(number1) * parseFloat(n2)) / 100;
					historySet(history + n2 + ' % ');
					display.value = '0';
					activeOperator = operatorArray[4];
					break;

				default:
					break;
			}
		} else {
			let str = historyGet();

			let word = activeOperator;
			let newWord = operator;

			// trimming the string from the extra white space
			str = str.trim();

			// find the index of last time word was used
			// please note lastIndexOf() is case sensitive
			let n = str.length - 1;

			// slice the string in 2, one from the start to the lastIndexOf
			// and then replace the word in the rest
			str = str.slice(0, n) + str.slice(n).replace(word, newWord);
			historySet(str + ' ');
			activeOperator = operator;
		}
	}
}

// ? sign function like +/- || =
function signs(sign) {
	// ? condition for sign is undefined or not
	if (sign === undefined) {
		return false;
	} else {
		// plus sign condition
		if (sign == 'plus-minus') {
			plusMinus = plusMinus ? false : true;

			if (display.value != '0') {
				if (plusMinus) {
					display.value = '-' + display.value;
				} else {
					display.value = display.value.substring(1);
				}
			}
		}
		// equal sign condition
		if (sign == 'equals') {
			if (number1 == '' || activeOperator == '') {
				console.log('empty');
			} else {
				let result = '';

				if (display.value == 0) {
					number2 = '0';
				} else {
					number2 = display.value.toString();
				}
				switch (activeOperator) {
					case '+':
						result = plus();
						break;
					case '-':
						result = minus();
						break;
					case '÷':
						result = division();
						break;
					case '×':
						result = multiplication();
						break;
					case '%':
						if (display.value == '0') {
							number2 = '1';
						}
						result = module();
						number2 = '';
						break;
					default:
						break;
				}

				if (result != undefined && result != null) {
					number1 = '';
					number2 = '';
					activeOperator = '';
					display.value = String(result);
					isResult = true;
					historySet();
				}
			}
		}
	}
}

// adding event listener to every keys
// ? adding event listener to every key in the calculator
key.forEach(function (key, index) {
	key.addEventListener('click', function (event) {
		// div inner text for validating which key is this
		let clickButton = event.target.innerText;

		/**
		 * ? action [ac, backspace]
		 * ? number [1 to 0 and .]
		 * ? operator [plus, minus, ...]
		 * ? sign [+\- and  =]
		 */
		if (key.classList.contains('action')) {
			switch (clickButton) {
				case 'AC':
					ac();
					break;
				case '⌫':
					backspace();
					break;

				default:
					break;
			}
		}
		if (key.classList.contains('number')) {
			switch (clickButton) {
				case '1':
					addNumber('1');
					break;
				case '2':
					addNumber('2');
					break;
				case '3':
					addNumber('3');
					break;
				case '4':
					addNumber('4');
					break;
				case '5':
					addNumber('5');
					break;
				case '6':
					addNumber('6');
					break;
				case '7':
					addNumber('7');
					break;
				case '8':
					addNumber('8');
					break;
				case '9':
					addNumber('9');
					break;
				case '0':
					addNumber('0');
					break;
				case '.':
					addNumber('.');
					break;
				default:
					break;
			}
		}
		if (key.classList.contains('operator')) {
			switch (clickButton) {
				case '%':
					operation(operatorArray[4]);
					break;
				case '+':
					operation(operatorArray[0]);
					break;
				case '-':
					operation(operatorArray[1]);
					break;
				case '÷':
					operation(operatorArray[2]);
					break;
				case '×':
					operation(operatorArray[3]);
					break;

				default:
					break;
			}
		}
		if (key.classList.contains('sign')) {
			switch (clickButton) {
				case '±':
					signs('plus-minus');
					break;
				case '=':
					signs('equals');
					break;
				default:
					break;
			}
		}
	});
});
