const KOLORY = ['kier', 'karo', 'trefl', 'pik'];
const FIGURY = ['2','3','4','5','6','7','8','9','10','J','Q','K','A'];
const KOMUNIKAT = document.getElementById("komunikat");

function tasuj(talia){
    let i = talia.length;

    while (i != 0) {
        let losowy_i = Math.floor(Math.random() * i);
        i--;
        [talia[i], talia[losowy_i]] = [
        talia[losowy_i], talia[i]];
  }
}

function stworzTalie(liczbaTalii){
    var talia = [];

    for (let i = 0; i < liczbaTalii; i++){
        for (kolor of KOLORY){
            for (figura of FIGURY){
                talia.push({kolor, figura});
    }}}

    tasuj(talia);
    return talia;
}

var talia = stworzTalie(1);
var gracz = [];
var krupier = [];