const KOLORY = ['kier', 'karo', 'trefl', 'pik'];
const FIGURY = ['2','3','4','5','6','7','8','9','10','J','Q','K','A'];
const DIV_GRACZ = document.getElementById("gracz");
const DIV_KRUPIER = document.getElementById("krupier");


function tasuj(talia){
    let i = talia.length;

    while (i != 0) {
        let losowy_i = Math.floor(Math.random() * i);
        i--;
        [talia[i], talia[losowy_i]] = [
        talia[losowy_i], talia[i]];
  }
}

function pociagnij(talia){
    var karta = talia[talia.length-1];
    talia.pop();
    return karta;
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

function wyswietlKarty(reka,div){
    div.innerHTML = "";
    for (item of reka){
        div.innerHTML += `<img src="karty/${item['figura']}${item['kolor']}.svg"> \n`;
    }
}

var talia = stworzTalie(1);
var gracz = [];
var krupier = [];

gracz.push(pociagnij(talia));

krupier.push(pociagnij(talia));

wyswietlKarty(gracz,DIV_GRACZ);

DIV_KRUPIER.inner_html = "";
for (item of krupier){
    DIV_KRUPIER.innerHTML += `<img src="karty/${item['figura']}${item['kolor']}.svg"> \n`;
}
DIV_KRUPIER.innerHTML += `<img class='blur' src="karty/${item['figura']}${item['kolor']}.svg"> \n`;