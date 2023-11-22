const refs = {
  btnStart: document.querySelector('button[data-start]'),
  btnStop: document.querySelector('button[data-stop]'),
};

let intervalID;
//=============================================================

refs.btnStart.style.fontSize = '20px';
refs.btnStop.style.fontSize = '20px';
refs.btnStart.style.padding = '10px';
refs.btnStop.style.padding = '10px';

//=============================================================
refs.btnStop.disabled = true;

refs.btnStart.addEventListener('click', startChangeColor);
refs.btnStop.addEventListener('click', stopChangeColor);

//===============================================================
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
//==============================================================
function startChangeColor() {
    intervalID = setInterval(changeBodyColor, 1000);
    refs.btnStart.disabled = true;
    refs.btnStop.disabled = false;
    
}
//=============================================================
function stopChangeColor() {
    clearTimeout(intervalID)
    refs.btnStart.disabled = false;
    refs.btnStop.disabled = true;
  
}
//=============================================================
function changeBodyColor() {
    document.body.style.backgroundColor = getRandomHexColor()
}
