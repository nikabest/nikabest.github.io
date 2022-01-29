//Переменные
let level = 1
let score = 0
let result = 0

const scoreToNextLevel = 5

//Элементы 
const leveltitle = document.querySelector('#leveltitle');
const problem = document.querySelector('#problem');
const answers = document.querySelector('#answers');
const points = document.querySelector('#points');
const start = document.querySelector('#start');

clearPage();
showQuestion();
showScore();


function clearPage(){
	leveltitle.innerHTML = ''; 
    problem.innerHTML = '';
    answers.innerHTML = '';
    points.innerHTML = '';
    start.innerHTML = '';
}


function showQuestion(){
	
    //Загаловок
	const headerTemplate = `<h2 id="leveltitle">%title%</h2>`;
    leveltitle.innerHTML = headerTemplate.replace('%title%', "Уровень " + level);

    //В зависимости от уровня выводим зарные примеры
    let firstNumber = 0;
    let secondNumber = 0;
    let problemtitle = "";

    if (level === 1) {
        firstNumber = getRandomInt(1, 99);
        secondNumber = getRandomInt(1, 99);
        result = firstNumber + secondNumber;
        problemtitle = firstNumber + " + " + secondNumber + " = ...";
    } else {
        firstNumber = getRandomInt(1, 999);
        secondNumber = getRandomInt(1, 999);
        if (firstNumber > secondNumber) {
            result = firstNumber - secondNumber;
            problemtitle = secondNumber + " + ... = " + firstNumber;
        } else {
            result = secondNumber - firstNumber;
            problemtitle = firstNumber + " + ... = " + secondNumber;
        }
        console.log(result) 
    }
    const problemTemplate = `<p id="problem">%problemtitle%</p>`;
    problem.innerHTML =  problemTemplate.replace('%problemtitle%', problemtitle);



    //Выводим кнопки с ответами, три штуки одна рандомная верная

    const numberOfGoodAnswer = getRandomInt(1, 3);
    const butTemplate = `<input class="btn1" type="button" value="%value%" id="button%i%">`;
    let buttons = "";

    for (let i = 1; i < 4; i++){

        if (i === numberOfGoodAnswer) {
            buttons += butTemplate.replace('%value%', result).replace('%i%', i);        
        } else {
            if (level === 1) {
                buttons += butTemplate.replace('%value%', getRandomInt(1,200)).replace('%i%', i);        
            } else {
                buttons += butTemplate.replace('%value%', getRandomInt(1,999)).replace('%i%', i);        
            }
        }

    }
    answers.innerHTML = buttons;

    //Ищем все кнопки и вешаем событие
    const button1 = document.querySelector('#button1');
    const button2 = document.querySelector('#button2');
    const button3 = document.querySelector('#button3');

    if (parseInt(button1.value) === result) {
        button1.onclick = goodAnswer;
    } else {
        button1.onclick = badAnswer;
    }

    if (parseInt(button2.value) === result) {
        button2.onclick = goodAnswer;
    } else {
        button2.onclick = badAnswer;
    }

    if (parseInt(button3.value) === result) {
        button3.onclick = goodAnswer;
    } else {
        button3.onclick = badAnswer;
    }

}


function getRandomInt(min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
}


function goodAnswer(){
    score++;

    if (score === scoreToNextLevel) {
        if (level === 1) {
            level = 2;
            score = 0;    
        } else {
            //Победа
            level = 0;
            clearPage();
            problem.innerHTML =  `<p id="problem">Вы победили!</p>`;
            start.innerHTML = `<a class="btn" href="level.html">Заново</a>`;       
        }
    }
    
    if (level > 0) {
        showQuestion();
        showScore();
    }
}


function badAnswer(){
    showQuestion();
}


function showScore(){
    const pointsTemplate = `<p>%score%/%scoreToNextLevel%</p>`;
    points.innerHTML = pointsTemplate.replace('%score%', score).replace('%scoreToNextLevel%', scoreToNextLevel); 
}