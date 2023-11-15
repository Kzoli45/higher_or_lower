let cards = [
    "2H", "3H", "4H", "5H", "6H", "7H", "8H", "9H", "10H", "JH", "QH", "KH", "AH",
    "2D", "3D", "4D", "5D", "6D", "7D", "8D", "9D", "10D", "JD", "QD", "KD", "AD",
    "2C", "3C", "4C", "5C", "6C", "7C", "8C", "9C", "10C", "JC", "QC", "KC", "AC",
    "2S", "3S", "4S", "5S", "6S", "7S", "8S", "9S", "10S", "JS", "QS", "KS", "AS"
];

let currentCard, nextCard;
let streak = 0;
let score = 0;
let balance = 0;
let cardstyle = 0;
let correct = 0;

let purchasedDesigns = [];
let selectedDesign = 0;

function startGame() {
    shuffleCards();
    preloadCardImages();

    /*const score10State = localStorage.getItem('score10');
    if (score10State === 'active') {
        document.getElementById("score-10").classList.add("active");
    }

    const score20State = localStorage.getItem('score20');
    if (score20State === 'active') {
        document.getElementById("score-20").classList.add("active");
    }

    const score50State = localStorage.getItem('score50');
    if (score50State === 'active') {
        document.getElementById("score-50").classList.add("active");
    }

    const scoreWonState = localStorage.getItem('scoreWon');
    if (scoreWonState === 'active') {
        document.getElementById("score-won").classList.add("active");
    }*/

    const savedDesigns = localStorage.getItem('purchasedDesigns');
    if (savedDesigns !== null) {
        purchasedDesigns = JSON.parse(savedDesigns);
        
        updatePurchasedDesignsUI();
    }

    const savedBalance = localStorage.getItem('balance');
    if (savedBalance !== null) {
        balance = parseFloat(savedBalance);
    }

    const savedSelectedDesign = localStorage.getItem('selectedDesign');
    if (savedSelectedDesign !== null) {
        selectedDesign = parseInt(savedSelectedDesign);

        changeStyle(selectedDesign);
    }

    startRound();
}

const cardImages = [];

function preloadCardImages() {
    for (const card of cards) {
        const cardFileName = card + ".png";
        const image = new Image();
        image.src = cardFileName;
        cardImages.push(image);
    }
}

function updatePurchasedDesignsUI() {
    purchasedDesigns.forEach(designID => {
        const button = document.querySelector(`.buy-design[data-design="${designID}"]`);
        if (button) {
            button.classList.add('purchased');
            button.textContent = 'Select';
            button.addEventListener('click', function() {
                changeStyle(designID);
            });
            document.getElementById(`price${designID}`).textContent = 'Owned';
        }
    });
}

function savePurchasedDesigns() {
    localStorage.setItem('purchasedDesigns', JSON.stringify(purchasedDesigns));
}


function shuffleCards() {
    for (let i = cards.length -1; i > 0; i--) {
        const newIndex = Math.floor(Math.random() * (i + 1))
        const oldValue = cards[newIndex]
        cards[newIndex] = cards[i]
        cards[i] = oldValue
    }
}


function startRound() {
    //cards.sort(() => Math.random() - 0.5);

    currentCard = cards.pop();
    nextCard = cards[cards.length-1];

    //console.log(currentCard);
    //console.log(nextCard);
    updateCardDisplay();
}

function onStreak() {
    if (score >= 1) {
        document.getElementById('current-score').classList.remove('wrong-tip');
        document.getElementById('current-score').classList.add('correct-tip');
    }
}

function updateBalance() {
    balance += score*2.5;
    localStorage.setItem('balance', balance);
}

/*function giveToken() {
    if (score >= 10) {
        const score10 = document.getElementById("score-10");
        score10.classList.remove("not-active");
        score10.classList.add("active");
        localStorage.setItem('score10', 'active');
    }
    if (score >= 20) {
        const score20 = document.getElementById("score-20");
        score20.classList.remove("not-active");
        score20.classList.add("active");
        localStorage.setItem('score20', 'active');
    }
    if (score >= 50) {
        const score50 = document.getElementById("score-50");
        score50.classList.remove("not-active");
        score50.classList.add("active");
        localStorage.setItem('score50', 'active');
    }
    if (score >= 51) {
        const score51 = document.getElementById("score-won");
        score51.classList.remove("not-active");
        score51.classList.add("active");
        localStorage.setItem('scoreWon', 'active');
    }
}*/

document.querySelectorAll(".buy-design").forEach(button => {
    button.addEventListener('click', function() {
        const price = parseFloat(this.getAttribute('data-price'));
        const designID = this.getAttribute('data-design');

        if (!button.classList.contains('purchased')) {
            if (balance >= price) {
                balance -= price;
    
                const money = document.getElementById('balance');
                money.innerHTML = `$${balance}`;
    
                localStorage.setItem('balance', balance);
    
                button.classList.add('purchased');
                button.textContent = 'Select';
                button.addEventListener('click', function() {
                    //console.log(designID);
                    changeStyle(designID);
                })


                document.getElementById(`price${designID}`).textContent = 'Owned';

                purchasedDesigns.push(designID);
                savePurchasedDesigns();
    
                console.log(`Purchased card design ${designID} for $${price}`);
    
            }
            else {
                alert('Balance is too low');
            }
        }
    })
})

document.querySelectorAll('.purchased').forEach(button => {
    button.addEventListener('click', function() {
        const price = parseFloat(this.getAttribute('data-price'));
        const designID = this.getAttribute('data-design');


        //console.log(designID);
        changeStyle(designID);
    })
})

const cardShop = document.getElementById('card-shop');
const cardShopToggle = document.getElementById('card-shop-toggle');

cardShopToggle.addEventListener('click', () => {
    if (cardShop.classList.contains('hidden')) {
        cardShop.style.opacity = '1';
        cardShop.style.transform = 'translateY(0)';
        cardShop.classList.remove('hidden');
    } else {
        cardShop.style.opacity = '0';
        cardShop.style.transform = 'translateY(30px)';
        cardShop.classList.add('hidden');
    }
});

function changeStyle(style) {
    cardstyle = parseInt(style);
    //console.log("changed style");

    selectedDesign = parseInt(style);
    localStorage.setItem('selectedDesign', selectedDesign);
    applyCardStyleChangeAnimation();

    document.getElementById('card-image').src = currentCard + ".png";
    if (cardstyle != 0) {
        document.getElementById('card-image').src = currentCard + cardstyle +  ".png";
    }

}

function applyCardStyleChangeAnimation() {
    const cardImage = document.getElementById('card-image');
    cardImage.style.transform = 'scale(1.1)';
    
    setTimeout(() => {
        cardImage.style.transform = 'scale(1)';
    }, 500);
}

function updateCardDisplay(direction) {
    const cardImage = document.getElementById("card-image");
    let cardFileName = currentCard + ".png";
    if (cardstyle != 0) {
        cardFileName = currentCard + cardstyle +  ".png"
    }
    
    cardImage.src = cardFileName

    if (direction === "higher") {
        cardImage.style.transform = "translateX(10%)"; 
      } else if (direction === "lower") {
        cardImage.style.transform = "translateX(-10%)"; 
      }
    
    setTimeout(() => {
    cardImage.src = cardFileName;
    cardImage.style.transform = "translateX(0)";
    }, 500);

    const scoreDisplay = document.getElementById("current-score");
    scoreDisplay.textContent = `${score}`;
    //giveToken();

    const cardsRemaining = document.getElementById("cards-remaining");
    cardsRemaining.textContent = `${cards.length}`;

    updateBalance();
    const money = document.getElementById("balance");
    money.innerHTML = `$${balance}`;

}

function changeRed() {
    const color = document.getElementById('result-message');
    color.classList.add('wrong-tip');
    color.classList.remove('correct-tip');
}

function changeGreen() {
    const color = document.getElementById('result-message');
    color.classList.add('correct-tip');
    color.classList.remove('wrong-tip');
}

function displayNoOfCorrectGuesses() {
    document.getElementById('correct-guesses').innerHTML = `Number of correct guesses in the round was ${correct}`;
    correct = 0;
}

document.getElementById("higher-button").addEventListener("click", () => {
    if (cards.length === 0) {
        document.getElementById("result-message").textContent = "Over";
        displayNoOfCorrectGuesses();
    } else {
        if (getCardValue(nextCard) > getCardValue(currentCard)) {
            document.getElementById("result-message").textContent = "correct";
            score++;
            onStreak();
            changeGreen();
            updateCardDisplay("higher");
            correct++;
        } else {
            document.getElementById("result-message").textContent = "wrong";
            score = 0;
            document.getElementById('current-score').classList.remove('correct-tip');
            document.getElementById('current-score').classList.add('wrong-tip');
            changeRed();
            updateCardDisplay("higher");
        }
        document.getElementById('correct-guesses').innerHTML = null;
        startRound();
    }
});

document.getElementById("lower-button").addEventListener("click", () => {
    if (cards.length === 0) {
        document.getElementById("result-message").textContent = "Over";
        displayNoOfCorrectGuesses();
    } else {
        if (getCardValue(nextCard) < getCardValue(currentCard)) {
            document.getElementById("result-message").textContent = "correct";
            score++;
            onStreak();
            changeGreen();
            updateCardDisplay("lower");
            correct++;
        } else {
            document.getElementById("result-message").textContent = "wrong";
            score = 0;
            document.getElementById('current-score').classList.remove('correct-tip');
            document.getElementById('current-score').classList.add('wrong-tip');
            changeRed();
            updateCardDisplay("lower");
        }
        document.getElementById('correct-guesses').innerHTML = null;
        startRound();
    }
});

document.getElementById("restart-button").addEventListener("click", () => {
    restartGame();
})

function restartGame() {
    cards = [
        "2H", "3H", "4H", "5H", "6H", "7H", "8H", "9H", "10H", "JH", "QH", "KH", "AH",
        "2D", "3D", "4D", "5D", "6D", "7D", "8D", "9D", "10D", "JD", "QD", "KD", "AD",
        "2C", "3C", "4C", "5C", "6C", "7C", "8C", "9C", "10C", "JC", "QC", "KC", "AC",
        "2S", "3S", "4S", "5S", "6S", "7S", "8S", "9S", "10S", "JS", "QS", "KS", "AS"
    ];
    document.getElementById('current-score').classList.remove('correct-tip');
    document.getElementById('current-score').classList.add('wrong-tip');
    document.getElementById("result-message").textContent = "guess";
    document.getElementById("result-message").classList.remove('correct-tip');
    document.getElementById("result-message").classList.remove('wrong-tip');
    score = 0;
    startGame();
    updateCardDisplay();
    displayNoOfCorrectGuesses();
}

function getCardValue(card) {
    const rank = card.slice(0, -1);
    const faceCards = { "J": 11, "Q": 12, "K": 13, "A": 14 };
    return faceCards[rank] || parseInt(rank);
}

startGame();
