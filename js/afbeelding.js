const alphabet = "Aa,Bb,Cc,Dd,Ee,Ff,Gg,Hh,Ii,Jj,Kk,Ll,Mm,Nn,Oo,Pp,Qq,Rr,Ss,Tt,Uu,Vv,Ww,Xx,Yy,Zz".split(",");
const images = JSON.parse(localStorage.images)
const modal = document.querySelector('.modal');
let rightAudio = new Audio('audio/right.mp3')
let wrongAudio = new Audio('audio/wrong.mp3')

// Function to get unique random letter
function getRandomLetter(exclude) {
    let randomLetter;
    do {
        randomLetter = alphabet[Math.floor(Math.random() * alphabet.length)];
    } while (exclude.includes(randomLetter));
    return randomLetter;
}

// Load active letters from localStorage

function loadActiveLetters() {
    let activeLetter
    let activeLetters = JSON.parse(localStorage.getItem('activeLetters')) || [];
    do {
        activeLetter = [activeLetters[Math.floor(Math.random() * activeLetters.length)]]
    } while (activeLetter == localStorage.active)
    localStorage.setItem('active', activeLetter)
    let usedLetters = [...activeLetter];

    // If there are fewer than 4 active letters, fill with random letters
    while (activeLetter.length < parseInt(localStorage.difficulty)) {
        const randomLetter = getRandomLetter(usedLetters);
        activeLetter.push(randomLetter);
        usedLetters.push(randomLetter);
    }
    return activeLetter.slice(0, parseInt(localStorage.difficulty)); // Ensure exactly 4 letters
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Initialize the grid with buttons
function initializeGrid() {
    const buttonGrid = document.getElementById('buttonGrid');
    buttonGrid.replaceChildren()
    const activeLetters = loadActiveLetters();

    shuffleArray(activeLetters);

    activeLetters.forEach(letter => {
        const img = document.createElement('img');
        img.id = letter
        img.src = `img/${images[letter[0]][Math.floor(Math.random() * images[letter[0]].length)]}`;
        buttonGrid.appendChild(img);
    });
}

function buttonfuncs() {
    buttons = document.querySelectorAll('.grid img')
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            if (button.id == localStorage.active) {
                setTimeout(function() {
                    initModal(true)
                , 500})
            } else {
                setTimeout(function() {
                    initModal(false)
                , 500})
            }
        })
    })
}

// Set image to the image container
function setImage() {
    const imageContainer = document.getElementById('imageContainer');
    imageContainer.replaceChildren()
    let audio = new Audio(`audio/${localStorage.active}.mp3`)
    const newdiv = document.createElement('div')
    // newdiv.style.fontSize = '35vw';
    newdiv.style.fontFamily = 'sans-serif'
    newdiv.textContent = localStorage.active; // Replace with your image path
    newdiv.addEventListener('click', function() {
        audio.play()
        setTimeout(function() {
            audio.pause();
            audio.currentTime = 0; // Reset the audio to the beginning
        }, 1600)
    })
    imageContainer.appendChild(newdiv)
}

function back() {
    const backbutton = document.getElementById('back')
    backbutton.addEventListener('click', function() {
        window.location.href = 'index.html'
    })
}

function initModal(bool) {
    let image = document.querySelector('.modal-image')
    let buttoncon = document.querySelector('.button-container')
    buttoncon.replaceChildren()
    let button = document.createElement('button')
    modal.style.display = 'grid'
    if (bool) {
        rightAudio.play()
        image.src = 'img/ThumbsUp.png'
        button.innerText = "Volgende"
        setTimeout(function() {
            button.addEventListener('click', function() {
                rightAudio.pause()
                rightAudio.currentTime = 0
                modal.style.display = 'none'
                init()
            })
        , 500})
    } else {
        wrongAudio.play()
        image.src = 'img/ThumbsDown.png'
        button.innerText = "Opnieuw"
        setTimeout(function() {
            button.addEventListener('click', function() {
                wrongAudio.pause()
                wrongAudio.currentTime = 0
                modal.style.display = 'none'
            })
        , 500})
    }
    buttoncon.appendChild(button)
}

// Initialize the page
function init() {
    if (images == undefined) {
        window.location.href = 'index.html'
    }
    initializeGrid();
    setImage();
    buttonfuncs();
    back()
}

// Call the init function on page load
init()