// Problem 1

let celsius = 30

let fahrenheit = (celsius * 9 / 5) + 32

if (celsius < 0) {
    console.log(`${celsius}°C is ${fahrenheit}°F. It's freezing outside. `)
} else if (celsius >= 0 && celsius <= 100) {
    console.log(`${celsius}°C is ${fahrenheit}°F. It's warm outside. `)
} else {
    console.log(`${celsius}°C is ${fahrenheit}°F. It's boiling outside. `)
}



// Problem 2

let numbers = [2, -5, 10, -3, 7, 0, -1, 9];
let negative = 0;
let positive = 0;
let min = numbers[0];
let max = numbers[0];

for (const element of numbers) {
    if (element > 0) {
        positive++;
    } else if (element < 0) {
        negative++;
    }
    if (min > element) {
        min = element; // Update min
    }
    if (max < element) {
        max = element; // Update max
    }
}

console.log(`Positive: ${positive}, Negative: ${negative}, Min: ${min}, Max: ${max}`);



// Problem 3

let num1 = 10;
let num2 = 0;
let operation = '/';



switch (operation) {
    case '+':
        result = num1 + num2;
        console.log(`The result of ${num1} ${operation} ${num2} is ${result}.`);
        break;
    case '-':
        result = num1 - num2;
        console.log(`The result of ${num1} ${operation} ${num2} is ${result}.`);
        break;
    case '*':
        result = num1 * num2;
        console.log(`The result of ${num1} ${operation} ${num2} is ${result}.`);
        break;
    case '/':
        if (num2 === 0) {
            console.log("Error: Division by zero is not allowed.");
        } else {
            result = num1 / num2;
            console.log(`The result of ${num1} ${operation} ${num2} is ${result}.`);
        }
        break;
    default:
        console.log("Error: Invalid operation.");
}


// Problem 4

let text = "JavaScript is an awesome programming language";
let vowelCount = 0;
let wordCount = 0;
let startsWithUppercase = false;
let spaceCount = 0;
const vowels = 'aeiou';

if (text[0] === text[0].toUpperCase()) {
    startsWithUppercase = true;
}

for (let i = 0; i < text.length; i++) {
    let char = text[i];

    // Check for vowels
    if (char === 'a' || char === 'e' || char === 'i' || char === 'o' || char === 'u') {
        vowelCount++;
    }

    if (char === ' ') {
        wordCount++;
    }
}

console.log(`Vowel count: ${vowelCount}`);
console.log(`Word count: ${wordCount + 1}`);
console.log(`Starts with uppercase: ${startsWithUppercase}`);



// Problem 5

let secretNumber = Math.floor(Math.random() * 10) + 1;
let playerGuess = 7;

if (secretNumber === playerGuess) {
    console.log("You Won!!!")
} else {
    console.log("You Lost!!")
}