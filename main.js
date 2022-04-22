document.addEventListener('DOMContentLoaded', () => {
    const h2 = document.getElementById('poruka');

    const poruke = [
        'Bravoo!',
        'Eej! Bas ti ide!',
        'Samo cepaj!!',
        'Oladi malo, riknuce ti komp!',
        'Oooooo! Ma sve su tvoje :)',
        'Odlicno!',
        'Rekord rekordaa!',
        'Svaka cast genijee!',
        'Majstoree!',
        'Dobar si!',
        'Razbijas!',
        'Rokaj! Rokaj!',
        'Samo nastavi!',
        'Odee tastatura!',
        'Prosecno ;)'
    ];

    const polja = document.querySelectorAll('.grid div');
    const rezultat = document.querySelector('span');
    const dugme = document.querySelector('.start');

    const debljina = 50;
    let trenutnaPozicija = 0;        //prvi mali div
    let hranaPozicija = 0;
    let zmijaObj = [2, 1, 0];

    let pravac = 1;
    let brzina = 0.9;
    let poeni = 0;
    let vreme1 = 0;
    let vreme2 = 0;


    function startajIgru(){

        if (!(h2.innerHTML === '')){
            h2.classList.remove('visible');
            h2.classList.add('nonVisible');
        }

        zmijaObj.forEach(poz => polja[poz].classList.remove('zmija'));
        polja[hranaPozicija].classList.remove('hrana');
        clearInterval(vreme2);
        poeni = 0;
        nasumicnaHrana();
        pravac = 1;
        rezultat.innerText = poeni;
        vreme1 = 400;
        zmijaObj = [2, 1, 0];
        trenutnaPozicija = 0;
        zmijaObj.forEach(poz => polja[poz].classList.add('zmija'));
        vreme2 = setInterval(moveOutComes, vreme1);
    };

    function moveOutComes(){
        if(
            (zmijaObj[0] + debljina >= (debljina * debljina) && pravac === debljina) ||  //za donji zid
            (zmijaObj[0] % debljina === debljina - 1 && pravac === 1) ||                 //za desni zid
            (zmijaObj[0] % debljina === 0 && pravac === -1) ||                           //za levi zid
            (zmijaObj[0] - debljina < 0 && pravac === -debljina) ||                      //za gornji zid
            polja[zmijaObj[0] + pravac].classList.contains('zmija')                      //sama sebe
        ){
            h2.classList.remove('nonVisible');
            h2.innerHTML = 'Kraj Igre! Hehe :)';
            h2.classList.add('visible');

            return clearInterval(vreme2);
        }

        const repZmije = zmijaObj.pop();
        polja[repZmije].classList.remove('zmija');
        zmijaObj.unshift(zmijaObj[0] + pravac);
        
        if(polja[zmijaObj[0]].classList.contains('hrana')){
            polja[zmijaObj[0]].classList.remove('hrana');
            polja[repZmije].classList.add('zmija');
            zmijaObj.push(repZmije);
            nasumicnaHrana();
            poeni++;
            rezultat.textContent = poeni;

            h2.classList.remove('nonVisible');
            h2.innerHTML = `${poruke[Math.floor(Math.random() * poruke.length)]}`;
            h2.classList.add('visible');

            setTimeout(prikazPoruke, 2000);

            clearInterval(vreme2);
            vreme1 = vreme1 * brzina;
            vreme2 = setInterval(moveOutComes, vreme1);
        }
        polja[zmijaObj[0]].classList.add('zmija');
    };

    function kontrole(e){    // za strelice
        polja[trenutnaPozicija].classList.remove('zmija');

        if(e.keyCode === 39) {      //  na desno
            pravac = 1;
        } else if (e.keyCode === 38) {   //  na gore
            pravac = -debljina;
        } else if (e.keyCode === 37) {   // na levo
            pravac = -1;       
        } else if (e.keyCode === 40){   // na dole
            pravac = +debljina;
        }
    };

    function kontrole2(e){        // za 'asdw' kontrole
        polja[trenutnaPozicija].classList.remove('zmija');

        if(e.keyCode === 68) {      //  na d
            pravac = 1;
        } else if (e.keyCode === 87) {   //  na w
            pravac = -debljina;
        } else if (e.keyCode === 65) {   // na a
            pravac = -1;       
        } else if (e.keyCode === 83){   // na s
            pravac = +debljina;
        }
    };

    document.addEventListener('keydown', kontrole);
    document.addEventListener('keydown', kontrole2);

    dugme.addEventListener('click', startajIgru);

    function nasumicnaHrana() {
        do{
            hranaPozicija = Math.floor(Math.random() * polja.length);
        } while (polja[hranaPozicija].classList.contains('zmija'));
        polja[hranaPozicija].classList.add('hrana');
    };

    function prikazPoruke(){
        h2.classList.remove('visible');
        h2.classList.add('nonVisible');
        h2.innerHTML = '';
    }

});