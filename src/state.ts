class Mp3Player {

    stato = "pausa"

    premiTastoPlay() {
        if (this.stato == "play") {
            // stoppa la musica
            this.stato = "pausa"
        } else {
            //avvia la musica
            this.stato = "play"
        }
    }

}

interface StatoMp3Player {

    prossimoStato(): StatoMp3Player

}

class Play implements StatoMp3Player {
    prossimoStato(): StatoMp3Player {
        // stoppa la musica
        return new Pausa();
    }
}

class Pausa implements StatoMp3Player {
    prossimoStato(): StatoMp3Player {
        //avvia la musica
        return new Play();
    }
}

class Mp3PlayerV2 {

    stato = new Pausa()

    premiTastoPlay() {
        this.stato =
            this.stato.prossimoStato()
    }

}

interface Stato {
    prossimoStato():Stato
}

class A implements Stato {
    prossimoStato(): Stato {
        return new B();
    }
}
class B implements Stato {
    prossimoStato(): Stato {
        return new C();
    }
}
class C implements Stato {
    prossimoStato(): Stato {
        return new A();
    }
}

class MacchinaAStati {
    stato = new A()
    operazione(){
       return this.stato =
           this.stato.prossimoStato()
    }
}

class A_v2 implements Stato {

    constructor(private nuovoStato:Stato){}
    prossimoStato(): Stato {
        return this.nuovoStato;
    }
}

let a = new A_v2(new B())