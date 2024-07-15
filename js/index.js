const alphabet = "Aa,Bb,Cc,Dd,Ee,Ff,Gg,Hh,Ii,Jj,Kk,Ll,Mm,Nn,Oo,Pp,Qq,Rr,Ss,Tt,Uu,Vv,Ww,Xx,Yy,Zz".split(",");
const images = {'A': ['Aa.jpg', 'appel.jpg'], 'B': ['Bb.jpg', 'boot.jpg'], 'C': ['Cc.jpg', 'citroen.jpg'], 'D': ['Dd.jpg', 'dino.jpg'], 
    'E': ['Ee.jpg', 'emmer.jpg'], 'F': ['Ff.jpg', 'flamingo.jpg'], 'G': ['Gg.jpg', 'gitaar.jpg'], 'H': ['Hh.jpg', 'Hh2.jpg', 'huis.jpg'], 
    'I': ['Ii.jpg', 'iglo.jpg'], 'J': ['jurk.jpg'], 'K': ['Kk.jpg', 'konijn.jpg'], 'L': ['Ll.jpg', 'laars.jpg'], 
    'M': ['Mm.jpg', 'maan.jpg'], 'N': ['Nn.jpg', 'neus.jpg'], 'O': ['Oo.jpg', 'opa.jpg'], 'P': ['Pp.jpg', 'panda.jpg'], 
    'Q': ['quad.jpg'], 'R': ['Rr.jpg', 'raket.jpg'], 'S': ['Ss.jpg', 'ster.jpg'], 'T': ['Tt.jpg', 'trein.jpg'], 
    'U': ['Uu.jpg', 'ufo.jpg'], 'V': ['Vv.jpg', 'vis.jpg'], 'W': ['Ww.jpg', 'wolk.jpg'], 'X': ['xylofoon.jpg'], 
    'Y': ['yoghurt.jpg'], 'Z': ['Zz.jpg', 'zon.jpg']}
const grid = document.getElementById('alphabetGrid');
const difGrid = document.getElementById("difficultyGrid");

localStorage.setItem('images', JSON.stringify(images))

for (let i = 2; i < 6; i++) {
    const cell = document.createElement('div');
    cell.innerText = String(i)
    cell.addEventListener('click', async function() {
        togglediff(this)
    })
    if (i == localStorage.difficulty) {
        cell.classList.add('active')
    }
    difGrid.appendChild(cell)
}

function togglediff(element) {
    Array.from(difGrid.children).forEach(child => {
        if (child.classList.contains('active')) {
            child.classList.remove('active')
        }
        element.classList.add('active')
    })
}
// Initialize the grid
alphabet.forEach(letter => {
    const cell = document.createElement('div');
    cell.classList.add('alfabet')
    let activeLetters = JSON.parse(localStorage.getItem('activeLetters')) || []
    if (activeLetters.includes(letter)) {
        cell.classList.add('active')
    }
    cell.innerText = letter;
    cell.onclick = () => cell.classList.toggle('active');
    grid.appendChild(cell);
});

// Save active letters to localStorage
const letter = document.getElementById("letter")
letter.addEventListener('click', async function() {
    const activeLetters = [];
    document.querySelectorAll('#alphabetGrid div.active').forEach(cell => {
        activeLetters.push(cell.innerText);
    });
    if (activeLetters.length < 2) {return alert("Kies minimaal 2 letters")}
    if (!document.querySelector('#difficultyGrid div.active')) {
        alert("Kies een Difficulty")
    }
    localStorage.setItem('activeLetters', JSON.stringify(activeLetters));
    localStorage.setItem('difficulty', document.querySelector('#difficultyGrid div.active').innerText)
    window.location.href = 'letter.html'
})

// Load active letters from localStorage
const afbeelding = document.getElementById("afbeelding")
afbeelding.addEventListener('click', async function() {
    const activeLetters = [];
    document.querySelectorAll('#alphabetGrid div.active').forEach(cell => {
        activeLetters.push(cell.innerText);
    });
    if (activeLetters.length < 2) {
        return alert("Kies minimaal 2 letters")
    }
    if (!document.querySelector('#difficultyGrid div.active')) {
        alert("Kies een Difficulty")
    }
    localStorage.setItem('activeLetters', JSON.stringify(activeLetters));
    localStorage.setItem('difficulty', document.querySelector('#difficultyGrid div.active').innerText)
    window.location.href = 'afbeelding.html'
})

const geluid = document.getElementById("geluid")
geluid.addEventListener('click', async function() {
    const activeLetters = [];
    document.querySelectorAll('#alphabetGrid div.active').forEach(cell => {
        activeLetters.push(cell.innerText);
    });
    if (activeLetters.length < 2) {
        return alert("Kies minimaal 2 letters")
    }
    if (!document.querySelector('#difficultyGrid div.active')) {
        alert("Kies een Difficulty")
    }
    localStorage.setItem('activeLetters', JSON.stringify(activeLetters));
    localStorage.setItem('difficulty', document.querySelector('#difficultyGrid div.active').innerText)
    window.location.href = 'geluid.html'
})

const geluidl = document.getElementById("geluidletter")
geluidl.addEventListener('click', async function() {
    const activeLetters = [];
    document.querySelectorAll('#alphabetGrid div.active').forEach(cell => {
        activeLetters.push(cell.innerText);
    });
    if (activeLetters.length < 2) {
        return alert("Kies minimaal 2 letters")
    }
    if (!document.querySelector('#difficultyGrid div.active')) {
        alert("Kies een Difficulty")
    }
    localStorage.setItem('activeLetters', JSON.stringify(activeLetters));
    localStorage.setItem('difficulty', document.querySelector('#difficultyGrid div.active').innerText)
    window.location.href = 'geluidletter.html'
})

const selecteren = document.createElement('div');
selecteren.innerText = "Alles"
selecteren.addEventListener('click', function() {
    grid.querySelectorAll('.alfabet').forEach(cell => {
        cell.classList.add('active')
    })
})
grid.appendChild(selecteren)

const deselecteren = document.createElement('div');
deselecteren.innerText = "Niets"
deselecteren.addEventListener('click', function() {
    grid.querySelectorAll('.alfabet').forEach(cell => {
        cell.classList.remove('active')
    })
})
grid.appendChild(deselecteren)