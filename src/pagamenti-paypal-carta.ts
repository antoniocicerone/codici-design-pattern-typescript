class SistemaSoftware {


    // ... altri metodi che svolgono le varie funzionalità del software

    paga() {

        // istruzioni per il pagamento con Paypal
        // immaginiamo circa 400 righe di codice

    }


}


interface MetodoDiPagamento {
    paga(ammontare: number)
}


class MetodoPagamentoPaypal implements MetodoDiPagamento {
    paga(ammontare: number) {
        // istruzioni per il pagamento con Paypal
        // immaginiamo circa 400 righe di codice
    }
}

class MetodoPagamentoConCarta implements MetodoDiPagamento {
    paga(ammontare: number) {
        // istruzioni per il pagamento con carta
        // immaginiamo circa 400 righe di codice
    }
}


class SistemaSoftwareV2 {

    private metodoDiPagamento: MetodoDiPagamento

    constructor(metodoDiPagamento: MetodoDiPagamento) {
        this.metodoDiPagamento = metodoDiPagamento
    }

    paga(ammontare: number) {
        this.metodoDiPagamento.paga(ammontare)
    }


}


class SistemaSoftwareV2NonOttimale {

    paga(ammontare: number) {
        new MetodoPagamentoPaypal().paga(ammontare)
    }


}


interface Motore {
    aumentaPotenza(): number

    diminuisciPotenza(): number
}

class Motore1400 implements Motore {
    aumentaPotenza(): number {
        return 10;
    }

    diminuisciPotenza(): number {
        return -10;
    }
}


class Motore1600 implements Motore {
    aumentaPotenza(): number {
        return 20;
    }

    diminuisciPotenza(): number {
        return -20;
    }
}

class Automobile {
    private velocita: number;

    constructor(private motore: Motore) {
    }

    accelera() {
        this.velocita = Math.min(this.motore.aumentaPotenza(), 360)
    }

    frena() {
        this.velocita = Math.max(0, this.motore.diminuisciPotenza())
    }
}

class Officina {

    macchina1400() {
        return new Automobile(new Motore1400())
    }

    macchina1600() {
        return new Automobile(new Motore1600())
    }

}


class ClasseConDipendenza {

    dipendenza: any

    setDipendenza(dipendenza) {
        this.dipendenza = dipendenza
    }

    eseguiOperazione() {
        this.dipendenza.applicaOperazione()
    }

}

