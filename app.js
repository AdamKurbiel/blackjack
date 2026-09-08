class karta{
    constructor(typ){
        this.typ = typ;
        this.znak = '10';
    }
}

function wartoscKarty(karta){
    if (parseInt(karta.znak)) return parseInt(karta.znak);

    if (karta.znak == 'A') return 11; //AS (TODO obsługa 1 lub 11)
    return 10; //J,Q,K
}