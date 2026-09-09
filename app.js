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

function obliczWartoscKart(reka){
    let wartosc = 0;
    let asy = 0;

    for (const item of reka){
        const znak = item['figura'];
        const liczba = parseInt(znak, 10);

        if (!Number.isNaN(liczba)){
            wartosc += liczba;
        } else if (znak === 'A'){
            wartosc += 11;
            asy++;
        } else {
            wartosc += 10;
        }
    }

    while (wartosc > 21 && asy > 0) {
        wartosc -= 10;
        asy--;
    }

    return wartosc;
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
DIV_KRUPIER.innerHTML += `<img class='nieznana' src="karty/2karo.svg"> \n`; //karta niewidoczna (nie ma znaczenia)


function waliduj(){
    let wartoscKart = obliczWartoscKart(gracz);
    let wartoscKartKrupiera = obliczWartoscKart(krupier);

    if (wartoscKart === 21){
        toggleWybory();
        krupierDobierz();
        wartoscKartKrupiera = obliczWartoscKart(krupier);

        if (wartoscKartKrupiera === 21){
            komunikat.innerHTML = "Remis!";
            return;
        }

        komunikat.innerHTML = "Gracz wygrywa!";
        return;
    }

    if (wartoscKart > 21){
        toggleWybory();
        komunikat.innerHTML = "Krupier wygrywa!";
        return;
    }

    if (krupier.length < 2) return;

    if (wartoscKartKrupiera > 21){
        toggleWybory();
        komunikat.innerHTML = "Gracz wygrywa!";
        return;
    }

    if (wartoscKartKrupiera > wartoscKart){
        toggleWybory();
        komunikat.innerHTML = "Krupier wygrywa!";
        return;
    }

    if (wartoscKartKrupiera === wartoscKart){
        toggleWybory();
        komunikat.innerHTML = "Remis!";
        return;
    }

    if (wartoscKartKrupiera <= 16){
        toggleWybory();
        krupier.push(pociagnij(talia));
        wyswietlKarty(krupier, DIV_KRUPIER);

        wartoscKartKrupiera = obliczWartoscKart(krupier);
        wartoscKart = obliczWartoscKart(gracz);

        if (wartoscKartKrupiera > 21){
            komunikat.innerHTML = "Gracz wygrywa!";
        } else if (wartoscKartKrupiera === wartoscKart){
            komunikat.innerHTML = "Remis!";
        } else if (wartoscKartKrupiera < wartoscKart){
            komunikat.innerHTML = "Gracz wygrywa!";
        } else {
            komunikat.innerHTML = "Krupier wygrywa!";
        }
        return;
    }

    if (wartoscKartKrupiera >= 17){
        while (obliczWartoscKart(krupier) < obliczWartoscKart(gracz)) {
            krupier.push(pociagnij(talia));
            wyswietlKarty(krupier, DIV_KRUPIER);
        }

        toggleWybory();
        const wynikKrupiera = obliczWartoscKart(krupier);
        const wynikGracza = obliczWartoscKart(gracz);

        if (wynikKrupiera > 21){
            komunikat.innerHTML = "Gracz wygrywa!";
        } else if (wynikKrupiera === wynikGracza){
            komunikat.innerHTML = "Remis!";
        } else if (wynikKrupiera < wynikGracza){
            komunikat.innerHTML = "Gracz wygrywa!";
        } else {
            komunikat.innerHTML = "Krupier wygrywa!";
        }
        return;
    }
}

function toggleWybory(){
    if (document.getElementById('wybory').getAttribute("class") == "wybory"){
        document.getElementById("wybory").setAttribute("class","wylaczone");
    }else{
        document.getElementById("wybory").setAttribute("class","wybory");
    }
}

function dobierz(){
    gracz.push(pociagnij(talia));
    wyswietlKarty(gracz, DIV_GRACZ);

    wyswietlWartosci();
    waliduj();
}

function krupierDobierz(){
    krupier.push(pociagnij(talia));
    wyswietlKarty(krupier, DIV_KRUPIER);
    let wartoscKartKrupiera = obliczWartoscKart(krupier);
    if (wartoscKartKrupiera <= 16){
        krupier.push(pociagnij(talia));
        wyswietlKarty(krupier, DIV_KRUPIER);
    }else{
        while(obliczWartoscKart(krupier) < obliczWartoscKart(gracz)){
            krupier.push(pociagnij(talia));
            wyswietlKarty(krupier, DIV_KRUPIER);
        }
    }

}

function wyswietlWartosci(){
    let grWartosc = obliczWartoscKart(gracz);
    let krWartosc = obliczWartoscKart(krupier);

    komunikat.innerHTML = `Suma punktów:<br>Ty: ${grWartosc}, Krupier: ${krWartosc}`;

}

function pas(){
    krupier.push(pociagnij(talia));
    wyswietlKarty(krupier, DIV_KRUPIER);

    wyswietlWartosci();
    waliduj();
}

wyswietlWartosci();