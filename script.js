'use strict';


const diceEl = document.querySelector('.dice')
const btnNew = document.querySelector('.btn--new')
const btnRoll = document.querySelector('.btn--roll')
const btnHold = document.querySelector('.btn--hold')
const allScores = document.querySelectorAll('.score, .current-score')
const probTag = document.querySelector('.probability--0')

let keptScores, currentScore, activePlayer, probability, currProb, gameState

function init() {
    keptScores = [0, 0] // keeping scores of the players
    currentScore = 0;
    activePlayer = 0;
    probability = 5 / 6
    currProb = probability
    gameState = true;


    // reset classes
    const playersIds = [0, 1]
    playersIds.forEach(el => {
        selectActivePLayerSection(activePlayer).classList.remove('player--winner')
        selectActivePLayerSection(activePlayer).classList.remove('player--active')
        getCurrentProbTag(activePlayer).textContent = ''

    });

    selectActivePLayerSection(activePlayer).classList.add('player--active')

    // reset scores
    allScores.forEach(el => {
        el.textContent = 0
    });

    // reset probabitliy
    currProb = probability
    setProb(activePlayer, currProb)

    // reset dice
    diceEl.classList.add('hidden')
}

function randomDiceRoll() {
    return Math.trunc(Math.random() * 6) + 1
}

function showDice(dice) {
    diceEl.classList.remove('hidden')
    diceEl.src = `dice-${dice}.png`
}


function setProb(accPlayer, prob) {
    getCurrentProbTag(accPlayer).textContent = (prob * 100).toFixed(2) + ' %'
}


function switchPlayer() {
    currProb = probability
    getCurrentProbTag(activePlayer).textContent = ''


    currentScore = 0
    getCurrentScoreTag(activePlayer).textContent = 0

    // TODO: do better
    switchBackground()
    activePlayer = activePlayer === 0 ? 1 : 0;
    switchBackground()

    setProb(activePlayer, currProb)
}

function switchBackground() {
    selectActivePLayerSection(activePlayer).classList.toggle('player--active')
}

// SELECTORS
const getScoreTag = (accPlayer) => document.querySelector(`#score--${accPlayer}`)
const selectActivePLayerSection = (accPlayer) => document.querySelector(`.player--${accPlayer}`)
const getCurrentScoreTag = (accPlayer) => document.querySelector(`#current--${accPlayer}`)
const getCurrentProbTag = (accPlayer) => document.querySelector(`.probability--${accPlayer}`)


init();


setProb(activePlayer, currProb)

btnRoll.addEventListener('click', function () {

    if (gameState) {
        const dice = randomDiceRoll()
        showDice(dice)
        if (dice !== 1) {
            // add to the score
            currentScore += dice
            getCurrentScoreTag(activePlayer).textContent = currentScore

            currProb *= probability
            setProb(activePlayer, currProb)
        } else {
            switchPlayer()
        }
    }
})


btnHold.addEventListener('click', function () {
    if (gameState) {

        let currentKeptScore = keptScores[activePlayer] += currentScore
        getScoreTag(activePlayer).textContent = currentKeptScore

        if (currentKeptScore >= 20) {
            gameState = false
            selectActivePLayerSection(activePlayer).classList.add('player--winner')
            selectActivePLayerSection(activePlayer).classList.remove('player--active')
            diceEl.classList.add('hidden')


        } else {
            switchPlayer()
        }
    }
})


btnNew.addEventListener('click', function () {
    init()
})





