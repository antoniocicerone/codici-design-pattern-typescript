interface Colore {
    rosso: number
    verde: number
    blu: number
}

interface Immagine {
    dati: Colore[][]
}

class GestoreImmagini {

    trasformaInBiancoENero(immagine: Immagine): Immagine {
        let nuovaImmagine: Immagine
        for (let riga of immagine.dati) {
            for (let pixel of riga) {
                // elabora i pixel
                // e crea la nuovaImmagine
            }
        }
        return nuovaImmagine
    }

}

interface OperazioneSuImmagine {
    elabora(immagine: Immagine): Immagine
}

class TrasformaInBiancoENero
    implements OperazioneSuImmagine {
    elabora(immagine: Immagine): Immagine {
        let nuovaImmagine: Immagine
        for (let riga of immagine.dati) {
            for (let pixel of riga) {
                // elabora i pixel
                // e crea la nuovaImmagine
            }
        }
        return nuovaImmagine
    }
}

class TagliaImmagine
    implements OperazioneSuImmagine {

    constructor(private selezione: Coordinate) {
    }

    elabora(immagine: Immagine): Immagine {
        //...
        return
    }
}

interface Coordinate {
    x1: number
    y1: number
    x2: number
    y2: number
}

class GestoreImmaginiV2 {

    eseguiOperazione(
        operazione: OperazioneSuImmagine,
        immagine: Immagine): Immagine {

        return operazione.elabora(immagine)
    }

}

interface OperazioneSuImmagineV2 {
    elabora(immagine: Immagine): Immagine

    annullaOperazione(): Immagine
}

abstract class OperazioneAnnullabile
    implements OperazioneSuImmagineV2 {

    immaginePrecedente: Immagine

    elabora(immagine: Immagine): Immagine {
        return this.elaboraImmagine(immagine)
    }

    annullaOperazione(): Immagine {
        return this.immaginePrecedente
    }

    protected abstract elaboraImmagine(
        immagine: Immagine);
}

class GestoreImmaginiV3 {

    operazioni: OperazioneSuImmagineV2[] = []

    eseguiOperazione(
        operazione: OperazioneSuImmagineV2,
        immagine: Immagine): Immagine {
        this.operazioni.push(operazione)
        return operazione.elabora(immagine)
    }

    annullaOperazione() {
        let ultimaOperazione = this.operazioni.pop()
        return ultimaOperazione.annullaOperazione()
    }

}

class GestoreImmaginiV4 {

    immagineIniziale:Immagine

    constructor(immagine:Immagine){
        this.immagineIniziale = immagine
    }

    operazioni: OperazioneSuImmagineV2[] = []

    eseguiOperazione(
        operazione: OperazioneSuImmagineV2,
        immagine: Immagine): Immagine {
        return operazione.elabora(immagine)
    }

    annullaOperazione() {
        this.operazioni.pop()
        let img = this.immagineIniziale
        for(let o of this.operazioni)
            img = o.elabora(img)
        return img
    }

}