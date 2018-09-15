interface OperazioneMatematica {
    esegui(num1: number, num2: number): number
}

class Somma implements OperazioneMatematica {

    esegui(num1: number, num2: number): number {
        console.log("inizio operazione somma")
        let risultato = num1 + num2;
        console.log("fine operazione somma")
        return risultato
    }

}

class LogOperazione implements OperazioneMatematica {

    constructor(private op: OperazioneMatematica,
                private nome: string) {
    }

    esegui(num1: number, num2: number): number {
        console.log("inizio operazione " + this.nome)
        let risultato = this.op.esegui(num1, num2)
        console.log("fine operazione " + this.nome)
        return risultato;
    }

}

let sommaLoggata = new LogOperazione(new Somma(), "somma")
sommaLoggata.esegui(2, 3)


class OperazioneDaSistemaEsterno {

    constructor(
        private num1: number,
        private num2: number) {
    }

    esegui() {
        return this.num1 + this.num2
    }

}

class Adattatore implements OperazioneMatematica {
    esegui(num1: number, num2: number): number {
        let opEsterna =
            new OperazioneDaSistemaEsterno(2, 3)
        return opEsterna.esegui();
    }

}


class FinestraBase {
    disegna(){}
}

class FinestraConTitolo extends FinestraBase{
    disegna(){
        //istruzioni di disegno...
        super.disegna()
    }
}

interface Finestra {
    disegna()
}

class Finestrabase implements Finestra {
    disegna(){}
}

abstract class FinestraComposita implements Finestra {
    constructor(private finestra:Finestra){}

    disegna(){
        this.disegnoSpecifico()
        this.finestra.disegna()
    }

     protected abstract disegnoSpecifico();
}

class FinestraConFooter extends FinestraComposita {
    protected disegnoSpecifico() {
        //istruzioni di disegno...
    }
}

class FinestraConTitolo2 extends FinestraComposita {
    protected disegnoSpecifico() {
        //istruzioni di disegno...
    }
}

let finestra = new FinestraConTitolo2(new FinestraConFooter(new Finestrabase()))
finestra.disegna()
