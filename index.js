// Import stylesheets
import './style.css';

const cityElems = Array.from(document.getElementsByClassName('citta'));
// Usate questa per qualche prova, poi create un vostro account
// su www.openweathermap.org e create una API key personale
const apiKey = 'd0475be3a1967b1b49dfc02c8128001a';
const leCitta = ['Genova', 'Milano', 'Torino', 'Roma', 'Salandra'];
const URL =
  'https://api.openweathermap.org/data/2.5/weather?APPID=' +
  apiKey +
  '&units=metric&q=';
let media = 0;


document
  .getElementById('invio')
  .addEventListener('click', () => aggiungi());

function aggiungi(){
  var x = document.getElementById("newc");
  leCitta.push(x.value);


  const btn = document.createElement('button');
  btn.innerHTML = x.value;
  btn.addEventListener('click', () => display(btn.innerHTML));
  const btn1 = document.createElement('button');
  btn1.innerHTML = 'media';
  btn1.addEventListener('click', () => media_citta(btn.innerHTML));
  const item = document.createElement('li');
  item.appendChild(btn);
  item.appendChild(btn1);
  btn.addEventListener('click', () => changecolor(btn));
  document.getElementById('citta').appendChild(item);

  x.value = "";

}

leCitta.map((citta) => {
  const btn = document.createElement('button');
  btn.innerHTML = citta;
  btn.addEventListener('click', () => display(btn.innerHTML));
  const btn1 = document.createElement('button');
  btn1.innerHTML = 'media';
  btn1.addEventListener('click', () => media_citta(btn.innerHTML));
  const item = document.createElement('li');
  item.appendChild(btn);
  item.appendChild(btn1);
  btn.addEventListener('click', () => changecolor(btn));
  document.getElementById('citta').appendChild(item);
});

document
  .getElementById('calcolaMedia')
  .addEventListener('click', () => calcoloMedia());
function doCity(city, callback) {
  const request = new XMLHttpRequest();
  request.onload = function () {
    if (request.status === 200) {
      callback(JSON.parse(request.response));
    } else {
      throw 'Errore';
    }
  };
  request.open('GET', URL + city, true);
  request.send();
}
// Funzione collegata ai bottoni
function display(c) {
  doCity(c, d =>
    document.getElementById('risposta').innerHTML =
      new Date().toISOString() +' A ' + c + ' ci sono ' + d.main.temp + ' gradi e la pressione è di '+ d.main.pressure
  )
}

function media_citta(c) {
  var m = 0;
  const num = 2;
  doCity(c, d => {
    m = (d.main.temp_min + d.main.temp_max)/ num;
    document.getElementById('risposta').innerHTML ='A ' + c + ' ci sono ' + m;
  }
  )
}
//
function calcoloMedia() {
  media = 0;
  leCitta.map( c => {
    doCity(c, d => {
      media += d.main.temp / leCitta.length;
      document.getElementById('media').innerHTML = media;
    });
  })
}

function changecolor(id){
  id.style.backgroundColor = "red";
}
