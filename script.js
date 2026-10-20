const display = document.getElementById('result');
const historyScreen = document.getElementById('history-screen');
const historyList = document.getElementById('history-list');

function appendValue(val) {
    if (display.value === '0' && val !== '.') {
        display.value = val;
    } else {
        display.value += val;
    }
}

function clearScreen() {
    display.value = '0';
    historyScreen.innerText = '';
}

function deleteChar() {
    display.value = display.value.slice(0, -1);
    if (display.value === '') {
        display.value = '0';
    }
}

function appendSqrt() {
    try {
        let val = eval(display.value);
        let res = Math.sqrt(val);
        historyScreen.innerText = `√(${val})`;
        display.value = res;
        addHistory(`√(${val}) = ${res}`);
    } catch (error) {
        display.value = 'Error';
        setTimeout(clearScreen, 1500);
    }
}

function calculate() {
    try {
        let expression = display.value.replace(/×/g, '*').replace(/÷/g, '/');
        let result = eval(expression);
        
        historyScreen.innerText = display.value + ' =';
        display.value = result;
        
        addHistory(`${historyScreen.innerText} ${result}`);
    } catch (error) {
        display.value = 'Error';
        setTimeout(clearScreen, 1500);
    }
}

function addHistory(entry) {
    const li = document.createElement('li');
    li.innerText = entry;
    historyList.prepend(li);
}

function clearHistory() {
    historyList.innerHTML = '';
}

// Keyboard Support
document.addEventListener('keydown', function(event) {
    const key = event.key;
    if ((key >= '0' && key <= '9') || key === '.') {
        appendValue(key);
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        appendValue(key);
    } else if (key === 'Enter' || key === '=') {
        calculate();
    } else if (key === 'Backspace') {
        deleteChar();
    } else if (key === 'Escape') {
        clearScreen();
    }
});