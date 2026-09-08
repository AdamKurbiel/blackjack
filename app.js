const KOLORY = ['kier', 'karo', 'trefl', 'pik'];
const FIGURY = ['2','3','4','5','6','7','8','9','10','J','Q','K','A'];


function stworzTalie(liczbaTalii){
    var talia = [];

    for (let i = 0; i < liczbaTalii; i++){
        for (kolor of KOLORY){
            for (figura of FIGURY){
                talia.push({kolor, figura});
            }
        }
    }

    return talia;
}


console.log(stworzTalie(1));