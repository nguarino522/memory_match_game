let gameboard = document.getElementById("gameboard");
let gameboardrow = document.getElementById("gameboardrow");
let card1 = null;
let card2 = null;
let cardsFlipped = 0;
let currentScore = 0;
let bestScore = localStorage.getItem("bestscore");

const imagesgifs = [
    "image1.gif",
    "image2.jpg",
    "image3.gif",
    "image4.jpg",
    "image5.gif",
    "image6.gif",
    "image7.gif",
    "image8.gif",
    "image9.gif",
    "image1.gif",
    "image2.jpg",
    "image3.gif",
    "image4.jpg",
    "image5.gif",
    "image6.gif",
    "image7.gif",
    "image8.gif",
    "image9.gif"
];


// listening for the start game button to be clicked which calls start game function
let startBtn = document.getElementById("buttonstart");
startBtn.addEventListener("click", startGame);

// start game function to create gameboard and populdate and randomize gif and images for matching
function startGame (){
    let shuffledImageGifs = shuffleArray(imagesgifs);
    createGameboard();
    setScore(0);
    let backCards = document.querySelectorAll(".back");
    for (let i = 0; i < backCards.length; i++) {
        let path = "imagesgifs/" + shuffledImageGifs[i];
        backCards[i].children[0].src = path;
    }
    let cards = document.querySelectorAll(".imagecard");
    for (let c of cards) {
        c.addEventListener("click", gameLogic);
    }
    // for (let c of cards) {
    //     c.addEventListener("click", logevents);
    // }
}

// function to create gameboard area after the start button is clicked
function createGameboard () {
    for (let i = 0; i < 18; i++) {
            
        let divCol = document.createElement("div");
        divCol.classList.add("col-2");
            
        let divImageCardWrapper = document.createElement("div");
        divImageCardWrapper.classList.add("imagecardwrapper");

        let divImageCard = document.createElement("div");
        divImageCard.classList.add("imagecard");
            
        let divFront = document.createElement("div");
        divFront.classList.add("front");
        
        let divBack = document.createElement("div");
        divBack.classList.add("back");

        let backImg = document.createElement("img");

        let imgOrGif = document.createElement("img");
        imgOrGif.src = "imagesgifs/facedown.jpg";
        imgOrGif.style.height = "100%";
            
        divFront.appendChild(imgOrGif);
        divBack.appendChild(backImg);
        divImageCard.appendChild(divFront);
        divImageCard.appendChild(divBack);
        divImageCardWrapper.appendChild(divImageCard);
        divCol.appendChild(divImageCardWrapper);
        gameboardrow.appendChild(divCol);

    }

    document.getElementById("landingimagediv").remove();

    let currentScore = document.createElement("div");
    let currentScoreNum = document.createElement("span");
    currentScore.innerText = "Current Score: ";
    currentScore.setAttribute("id", "currentscore")
    currentScoreNum.innerText = "--";
    currentScoreNum.setAttribute("id", "currentscorenum");

    currentScore.appendChild(currentScoreNum);
    gameboard.appendChild(currentScore);
    document.querySelector("#startbtn").remove();
}

// array to shuffle the gif and image array we manually set using Fisher Yates algorithm
function shuffleArray (arrayToShuffle) {
    let counter = arrayToShuffle.length;
    while (counter > 0) {
        let index = Math.floor(Math.random() * counter);
        counter--;
        let temp = arrayToShuffle[counter];
        arrayToShuffle[counter] = arrayToShuffle[index];
        arrayToShuffle[index] = temp;
    }
    return arrayToShuffle;
}

function setScore(newScore) {
    currentScore = newScore;
    document.getElementById("currentscorenum").innerText = currentScore;
}

function gameLogic (evt){
    
    let currentCard = evt.target.parentElement.parentElement;
    if (card1 === null || card2 === null){
        if (!currentCard.classList.contains("flipped")) {
            setScore(currentScore + 1);
        }
        currentCard.classList.add("flipped");
        
        card1 = card1 || currentCard;
        card2 = currentCard === card1 ? null : currentCard;
    }

    if (card1 && card2){
        let img1 = card1.children[1].children[0].src;
        let img2 = card2.children[1].children[0].src;

        if (img1 === img2) {
            cardsFlipped = cardsFlipped + 2;
            card1.removeEventListener("click", gameLogic);
            card2.removeEventListener("click", gameLogic);
            card1 = null;
            card2 = null;
        } else {
            setTimeout(function(){
                card1.classList.remove("flipped");
                card2.classList.remove("flipped");
                card1 = null;
                card2 = null;
            }, 1000);
        }
    }

    if (cardsFlipped === 18) {
        setTimeout(endGame(), 1000);
    }

}

function endGame(){
    alert("YOU WIN!")
    
    document.getElementById("gameboardrow").delete();
    // let currentScore = document.createElement("div");
    // let currentScoreNum = document.createElement("span");
    // currentScore.innerText = "Current Score: ";
    // currentScore.setAttribute("id", "currentscore")
    // currentScoreNum.innerText = "--";
    // currentScoreNum.setAttribute("id", "currentscorenum");

    // currentScore.appendChild(currentScoreNum);
    // gameboard.appendChild(currentScore);
};
