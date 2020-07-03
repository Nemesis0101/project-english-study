// data

let newWords = [{
        eng: "hello",
        rus: "привет",
    },
    {
        eng: "apple",
        rus: "яблоко",
    },
    {
        eng: "orange",
        rus: "апельсин",
    },
    {
        eng: "friend",
        rus: "друг",
    },
    {
        eng: "man",
        rus: "мужчина",
    },
    {
        eng: "women",
        rus: "девушка",
    },
    {
        eng: "car",
        rus: "машина",
    },
    {
        eng: "city",
        rus: "город",
    },
    {
        eng: "building",
        rus: "здание",
    },
    {
        eng: "country",
        rus: "страна",
    },
    {
        eng: "pen",
        rus: "ручка",
    },
    {
        eng: "eyes",
        rus: "глаза",
    },
].sort(function () {
    return 0.5 - Math.random();
});

let learnedWords = [];

//


// learned words list

let learnedList = document.querySelector("#learned-list");

// local storage

let checkLastIndex = function () {

    let r = newWords[newWords.length - 1]

    if (r == newWords[newWords.length - 1]) {
        newWords.sort(function () {
            return 0.5 - Math.random();
        });
    }
}

if (localStorage.getItem("learnedStorage") === null) {
    learnedWords = [];
} else {
    learnedWords = JSON.parse(localStorage.getItem("learnedStorage"));
    newWords = JSON.parse(localStorage.getItem("words"));

    checkLastIndex();

    for (let j = 0; j <= learnedWords.length - 1; j++) {
        let listItem = document.createElement("li");
        listItem.classList.add("learned-list__item");
        listItem.innerHTML = `${learnedWords[j].eng} - ${learnedWords[j].rus}`;
        learnedList.appendChild(listItem);
    }
}

//


// show learned words list

let showList = function () {

    let listBtn = document.querySelector("#header__button");

    listBtn.addEventListener("click", function () {
        listBtn.classList.toggle("header__button_active");

        if (learnedList.classList.contains("hide")) {
            learnedList.classList.remove("hide");
            learnedList.classList.add("show");
            document.querySelector("#header").style.position = "fixed";
        } else {
            learnedList.classList.remove("show");
            learnedList.classList.add("hide");
            document.querySelector("#header").style.position = "relative";
        }
    });
};

showList();

//


//show translate word

let showTranslate = function () {

    let translateBtn = document.querySelector("#word-generator__button");
    let translateWord = document.querySelector("#word-generator__translate-word");

    translateBtn.addEventListener("click", function () {
        if (translateWord.classList.contains("opacity")) {
            translateWord.classList.remove("opacity");
            translateBtn.textContent = "Выключить перевод";
        } else {
            translateWord.classList.add("opacity");
            translateBtn.textContent = "Включить перевод";
        }
    });
};

showTranslate();

//


// get new word

let getNewWods = function () {

    let word = document.querySelector("#word-generator__word");
    let translate = document.querySelector("#word-generator__translate-word");
    let addWordButton = document.querySelector("#footer__button-left");
    let learnWordBtn = document.querySelector("#footer__button-right");
    let translateBtn = document.querySelector("#word-generator__button");

    if (newWords.length - 1 >= 0) {
        word.innerHTML = newWords[newWords.length - 1].eng;
        translate.innerHTML = newWords[newWords.length - 1].rus;
    } else {
        word.innerHTML = 'Слова закончились';
        translate.innerHTML = '';
        addWordButton.disabled = true;
        learnWordBtn.disabled = true;
        translateBtn.disabled = true;
    }

};

getNewWods();

//


// add word to learned list

let addWordToLearnedList = function () {

    let addWordButton = document.querySelector("#footer__button-left");

    addWordButton.addEventListener("click", function () {

        learnedWords.push(newWords[newWords.length - 1]);

        localStorage.setItem("learnedStorage", JSON.stringify(learnedWords));

        let listItem = document.createElement("li");
        listItem.classList.add("learned-list__item");
        listItem.innerHTML = `${newWords[newWords.length - 1].eng} - ${newWords[newWords.length - 1].rus}`;

        learnedList.appendChild(listItem);

        newWords.pop();

        localStorage.setItem("words", JSON.stringify(newWords));

        getNewWods();
        console.log(newWords);

    });
};

addWordToLearnedList();

//


// learn word

let learnWord = function () {

    let learnWordBtn = document.querySelector("#footer__button-right");

    learnWordBtn.addEventListener("click", function () {

        newWords.sort(function () {
            return 0.5 - Math.random();
        });

        getNewWods();
    });
};

learnWord();

//


// mobile browser adaptive

let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty("--vh", `${vh}px`);

//