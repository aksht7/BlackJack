var cards = ['A', 'K', 'Q', 'J',
    '10', '9', '8', '7', '6',
    '5', '4', '3', '2'
];
let suits = ['Hearts', 'Clubs', 'Diamonds', 'Spades'];
var newGameButton = document.getElementById('new-game');
var dealButton = document.getElementById('deal');
var hitButton = document.getElementById('hit');
var amount = document.getElementById('amount');
var standButton = document.getElementById('stand');
var heading = document.getElementById('heading');
var playarea = document.getElementById('playarea');
var winningPrice = document.getElementById('winning-price');
var music = document.getElementById('music');
winningPrice.style.display = 'none';
amount.style.display = 'none';
dealButton.style.display = 'none';
hitButton.style.display = 'none';
standButton.style.display = 'none';
playarea.style.display = 'none';

let gameStart = false,
    gameOver = false,
    playerWon = false,
    dealerCards = [],
    playerCards = [],
    dealerScore = 0,
    playerScore = 0,
    totalWinning = 0,
    deck = [];
newGameButton.addEventListener('click', function () {
    newGameButton.style.display = 'none';
    dealButton.style.display = 'inline';
    amount.style.display = 'inline';
    dealButton.style.marginTop = '-20px';
});
amount.addEventListener('change', function () {
    dealButton.innerHTML = "Deal for $" + amount.value;
})
dealButton.addEventListener('click', function () {
    document.body.style.overflowY = "auto";
    music.src = 'audio/jackpot.mp3';
    amount.style.display = 'none';
    heading.innerHTML = "<h1>BlackJack</h1>";
    heading.innerHTML+="<h4>&copy; Akshat Gupta</h4>"
    heading.style.color = "darkgoldenrod";
    heading.style.marginTop = '-1%';
    heading.style.marginLeft = '44%';
    dealButton.style.display = 'none';
    playarea.style.display = '';
    gameStart = true;
    gameOver = false;
    playerWon = false;
    deck = CreateDeck();
    ShuffleDeck();
    playerCards = [GetCard(), GetCard()];
    dealerCards = [GetCard(), GetCard()];
    winningPrice.style.display = 'inline';
    hitButton.style.display = 'inline';
    standButton.style.display = 'inline';
    hitButton.style.marginTop = '-20px';
    standButton.style.marginTop = '-20px';
    ShowGameStatus();
});

hitButton.addEventListener('click', function () {
    playerCards.push(GetCard());
    CheckForWinner();
    ShowGameStatus();
});

standButton.addEventListener('click', function () {
    gameOver = true;
    CheckForWinner();
    ShowGameStatus();
});

function CreateDeck() {
    for (var i = 0; i < suits.length; i++) {
        for (var j = 0; j < cards.length; j++) {
            let card = {
                suit : suits[i],
                value : cards[j]
            }
            deck.push(card);
        }
    }
    return deck;
}

function ShuffleDeck() {
    for (var i = 0; i < deck.length; i++) {
        var randomIndex = Math.trunc(Math.random() * deck.length);
        var temp = deck[randomIndex];
        deck[randomIndex] = deck[i];
        deck[i] = temp;
    }
}

function GetCard() {
    return deck.shift();
}


function ShowCardDetails() {
    playarea.innerHTML = "";
    var dealer = document.createElement("div");
    dealer.innerHTML = '<b>Dealer<b> has : <br>';
    playarea.appendChild(dealer);
    for (var i = 0; i < dealerCards.length; i++) {
        var card = document.createElement("div");
        var value = document.createElement("div");
        var suit = document.createElement("img");
        card.className = "card";
        value.className = "value";
        suit.className = "suit " + dealerCards[i].suit;
        console.log("img/" + dealerCards[i].suit + ".jpg");
        suit.src = "img/" + dealerCards[i].suit + ".jpg";
        value.innerHTML = "<b>"+dealerCards[i].value+"<b>";
        card.appendChild(value);
        card.appendChild(suit);
        document.getElementById("playarea").appendChild(card);
    }
    playarea.innerHTML += '<br><br><b>Score : </b>' + dealerScore + '<br><br><br>';

    var player = document.createElement("div");
    player.innerHTML = '<b>Player<b> has : <br>';
    playarea.appendChild(player);
    for (var i = 0; i < playerCards.length; i++) {
        var card = document.createElement("div");
        var valueTop = document.createElement("div");
        var suit = document.createElement("img");
        card.className = "card";
        valueTop.className = "value";
        suit.className = "suit " + playerCards[i].suit;
        suit.src = "img/" + playerCards[i].suit+".jpg";
        valueTop.innerHTML = "<b>" + playerCards[i].value + "</b>";
        card.appendChild(valueTop);
        card.appendChild(suit);
        document.getElementById("playarea").appendChild(card);
    }
    playarea.innerHTML += '<br><br><b>Score : </b>' + playerScore + '<br><br>';
}

function ShowGameStatus() {
    UpdateScores();
    ShowCardDetails();
    if (gameOver) {
        if (playerScore === dealerScore) {
            music.src = 'audio/applause.mp3';
            playarea.innerHTML += "<b>It's a TIE!</b>";
        }
        else if (playerWon) {
            music.src = 'audio/applause.mp3';
            totalWinning += parseInt(amount.value);
            console.log(totalWinning);
            winningPrice.innerHTML = "<b>Total Winnings : $" + totalWinning+"</b>";
            playarea.innerHTML += "<b>YOU WIN $"+amount.value+"</b>";
        }
        else {
            music.src = 'audio/lose.mp3';
            totalWinning -= parseInt(amount.value);
            console.log(totalWinning);
            winningPrice.innerHTML = "<b>Total Winnings : $" + totalWinning + "</b>";
            playarea.innerHTML += "<b>YOU LOSE $" + amount.value +"</b>";
        }
        newGameButton.style.display = 'inline';
        newGameButton.style.marginTop = '-20px';
        hitButton.style.display = 'none';
        standButton.style.display = 'none';

    }
    
}

function GetCardNumericValue(value) {
    switch (value) {
        case 'A':
            return 1;
        case '2':
            return 2;
        case '3':
            return 3;
        case '4':
            return 4;
        case '5':
            return 5;
        case '6':
            return 6;
        case '7':
            return 7;
        case '8':
            return 8;
        case '9':
            return 9;
        default:
            return 10;
    }
}
function GetScore(cards) {
    var score = 0;
    var HasAce = false;
    for (var i = 0; i < cards.length; i++) {
        score += GetCardNumericValue(cards[i].value);
        if (cards[i].value == 'A') {
            HasAce = true;
        }
        if (HasAce && score + 9 <= 21) {
            console.log(score);
            score += 9;
            console.log(score);
        }
    }
    return score;
}

function UpdateScores() {
    dealerScore = GetScore(dealerCards);
    playerScore = GetScore(playerCards);
}

function CheckForWinner() {
    UpdateScores();
    if (gameOver) {
        while (dealerScore < playerScore && playerScore <= 21 && dealerScore <= 21) {
            dealerCards.push(GetCard());
            UpdateScores();
        }
    }

    if (playerScore > 21) {
        playerWon = false;
        gameOver = true;
    }

    else if (dealerScore > 21) {
        playerWon = true;
        gameOver = true;
    }

    else if (gameOver) {
        if (playerScore > dealerScore) {
            playerWon = true;
        }
        else {
            playerWon = false;
        }
    }
}