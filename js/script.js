'use strict';

const radioList = document.querySelector('.radio-list');
const radioItem = document.querySelectorAll('.radio-item');
const radioMenuButton = document.querySelector('.radio-menu__button');
const radioMenuVolume = document.querySelector('.radio-menu__volume');
const radioTitle = document.querySelector('.radio-title');
const radioPlayerLogo = document.querySelector('.radio-player__logo');

const audio = new Audio();
audio.type = 'audio/aac';

radioMenuButton.disabled = true;


let dbCard;

(async () => {
    let response = await fetch('./db/db.json');
    dbCard = await response.json();
})()



function openItems() {
    radioList.innerHTML = ''
    radioList.innerHTML = dbCard.map( item => {
        return `
            <li class="radio-item">
                <label class="radio-box">
                    <div class="radio-img">
                        <img class="radio-logo" src="${item.image}" alt="обложка" draggable="false">
                    </div>
                    <input class="radio-btn" type="radio" name="radioStation" data-radio-station="${item.description}">
                    <span class="radio-name">${item.name}</span>
                </label>
            </li>
        `
    }).join('')
}

const changeIconPlay = () => {
    if (audio.paused){
        radioMenuButton.classList.add('fa-play');
        radioMenuButton.classList.remove('fa-pause');
    } else {
        radioMenuButton.classList.add('fa-pause');
        radioMenuButton.classList.remove('fa-play');
    }
};

const titlePlay = () => {
    audio.paused ? audio.play() : audio.pause()
    changeIconPlay();
}

const clickDisc = () => {
    radioTitle.textContent = 'Выбери радиостанцию';
    radioPlayerLogo.removeEventListener('click', clickDisc);
}

document.querySelector('.container').addEventListener('change', event => {
    const target = event.target;
    if (target.classList.contains('radio-btn')) {
        audio.src = target.dataset.radioStation;
        radioTitle.textContent = target.closest('.radio-item').querySelector('.radio-name').textContent;
        radioPlayerLogo.src = target.closest('.radio-item').querySelector('.radio-logo').src;
        radioPlayerLogo.style["boxShadow"] = '0 0 20px 5px rgb(0, 0, 0)';
        radioMenuButton.disabled = false;
        audio.play();
        changeIconPlay();
    }
})

audio.volume = 0.7;
radioMenuVolume.value = audio.volume * 100;


radioMenuVolume.addEventListener('input', () => {
    audio.volume = radioMenuVolume.value / 100;
});

radioPlayerLogo.addEventListener('click', () => {
    radioList.classList.toggle('radio-visible');
})

radioPlayerLogo.addEventListener('click', openItems)

radioMenuButton.addEventListener('click', titlePlay);

radioPlayerLogo.addEventListener('click', clickDisc);
