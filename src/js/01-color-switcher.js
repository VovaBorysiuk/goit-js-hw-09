const refs = {
  btnStart: document.querySelector('button[data-start]'),
  btnStop: document.querySelector('button[data-stop]'),
};

let intervalID;
const value = true;
//=============================================================

refs.btnStart.style.fontSize = '20px';
refs.btnStop.style.fontSize = '20px';
refs.btnStart.style.padding = '10px';
refs.btnStop.style.padding = '10px';

//=============================================================
disabBtnStop(value);

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
  disabBtnStart(value);
  disabBtnStop(!value);
    
    
}
//=============================================================
function stopChangeColor() {
    clearTimeout(intervalID)
  disabBtnStart(!value);
  disabBtnStop(value);
   
  
}
//=============================================================
function changeBodyColor() {
    document.body.style.backgroundColor = getRandomHexColor()
}

function disabBtnStart(value) {
  refs.btnStart.disabled = value;
}

function disabBtnStop(value) {
  refs.btnStart.disabled = value;
}