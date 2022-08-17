const gameboard = document.getElementById("gameboard");
const gameboardrow = document.getElementById("gameboardrow");


const imagesgifs = [
    "image1.gif",
    "image2.jpg",
    "image3.gif",
    "image4.jpg",
    "image5.gif",
    "image6.jpg",
    "image7.gif",
    "image8.jpg",
    "image9.gif",
    "image1.gif",
    "image2.jpg",
    "image3.gif",
    "image4.jpg",
    "image5.gif",
    "image6.jpg",
    "image7.gif",
    "image8.jpg",
    "image9.gif"
    ];
console.log(imagesgifs);
// const shuffledImageGifs = imagesgifs.

let startBtn = document.getElementById("buttonstart");
startBtn.addEventListener("click", startGame);

function startGame (){
    console.log("start button hit");
    let shuffledImageGifs = shuffleArray(imagesgifs);
    createGameboard();
    let backCards = document.querySelectorAll(".back");
    for (let i = 0; i < backCards.length; i++) {
        let path = "imagesgifs/" + shuffledImageGifs[i];
        backCards[i].children[0].src = path;
    }

}

// function to create gameboard area after the start button is clicked
function createGameboard () {
    console.log("create gameboard function called");
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
    currentScoreNum.innerText = "0";
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
