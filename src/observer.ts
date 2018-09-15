interface Evento {
    descrizione: string
    data: Date
    partecipanti: number
    luogo: string
}

class GestoreEventi {

    eventi: Array<Evento> = []

    creaEvento(descrizione: string,
               data: Date,
               partecipanti: number,
               luogo: string) {
        const e = {
            descrizione, data,
            partecipanti, luogo
        }
        this.eventi.push(e)

        console.log("invia email: un " +
            "nuovo utente si è " +
            "resgistrato" + e.descrizione)

        console.log("totale eventi: "
            + this.eventi.length)


    }

}

interface AllaCreazioneDellEvento {
    monitora(e: Evento, eventi: Evento[]): void
}

class NotificaUtente
    implements AllaCreazioneDellEvento {
    monitora(e: Evento, eventi: Evento[]): void {
        console.log("invia email: un " +
            "nuovo utente si è " +
            "resgistrato" + e.descrizione)
    }

}

class StampaStatisticaTotaleEventi
    implements AllaCreazioneDellEvento {
    monitora(e: Evento, eventi: Evento[]): void {
        console.log("totale eventi: "
            + eventi.length)
    }

}


class GestoreEventiV2 {

    eventi: Array<Evento> = []

    creaEvento(descrizione: string,
               data: Date,
               partecipanti: number,
               luogo: string) {
        const e = {
            descrizione, data,
            partecipanti, luogo
        }
        this.eventi.push(e)

        new NotificaUtente()
            .monitora(e, this.eventi)
        new StampaStatisticaTotaleEventi()
            .monitora(e, this.eventi)


    }

}

class GestoreEventiV3 {

    eventi: Array<Evento> = []

    creaEvento(descrizione: string,
               data: Date,
               partecipanti: number,
               luogo: string) {
        const e = {
            descrizione, data,
            partecipanti, luogo
        }
        this.eventi.push(e)

        const osservatori:AllaCreazioneDellEvento[]
            = [new NotificaUtente(),
               new StampaStatisticaTotaleEventi()]

        for(let o of osservatori)
            o.monitora(e, this.eventi)

    }

}

class GestoreEventiV4 {

    eventi: Array<Evento> = []

    osservatori: AllaCreazioneDellEvento[] = []

    creaEvento(descrizione: string,
               data: Date,
               partecipanti: number,
               luogo: string) {
        const e = {
            descrizione, data,
            partecipanti, luogo
        }
        this.eventi.push(e)

        for(let o of this.osservatori)
            o.monitora(e, this.eventi)

    }

    aggiungiOsservatore(o:AllaCreazioneDellEvento){
        this.osservatori.push(o)
    }

}


let ge = new GestoreEventiV4()
ge.aggiungiOsservatore(new NotificaUtente())
ge.aggiungiOsservatore(
    new StampaStatisticaTotaleEventi())
ge.creaEvento(...)