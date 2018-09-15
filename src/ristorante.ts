class Ristorante {

    areaTotale = new Area()

    tavoliLiberi() {
        return this.calcolaTavoliLiberi(this.areaTotale)
    }

    tavoliTotali() {
        return this.areaTotale.getTavoli().length
    }

    nome: string
    indirizzo: string
    telefono: string
    email: string
    direttore: string

    calcolaTavoliLiberi(a: Area) {
        return a.getTavoli().filter(t => t.occupato == false)
    }

    esegui(o: OperazioneSuRistorante) {
        o.esegui(this)
    }

    osservatori:OsservatoreTavolo[] = []

    aggiungiOsservatoreTavolo(o:OsservatoreTavolo){
        this.osservatori.push(o)
    }

    notificaOssevatori(tavoloOccupato:Tavolo){
        for(let o of this.osservatori)
            o.osserva(tavoloOccupato, this)
    }



}

interface OperazioneSuRistorante {
    esegui(ristorante: Ristorante)
}

class OccupaTavolo implements OperazioneSuRistorante {

    constructor(private t: Tavolo) {
    }

    esegui(ristorante: Ristorante) {
        this.t.occupato = true
        ristorante.notificaOssevatori(this.t)
    }

}

class NotificaGestore implements OsservatoreTavolo {
    osserva(t: Tavolo, r: Ristorante) {
        console.log("notifica gestore inviando un'email")
    }
}

class StampaPercentualeTavoliLiberi implements OsservatoreTavolo {
    osserva(t: Tavolo, r: Ristorante) {
        console.log(r.tavoliLiberi().length
            / r.areaTotale.getTavoli().length)
    }
}

let r = new Ristorante()
r.aggiungiOsservatoreTavolo(new NotificaGestore())
r.aggiungiOsservatoreTavolo(new StampaPercentualeTavoliLiberi())

interface OsservatoreTavolo {
    osserva(t: Tavolo, r: Ristorante)
}

class Tavolo {
    numero: number
    occupato: boolean
}

interface Superficie {
    getTavoli(): Tavolo[]
}

class Stanza implements Superficie {
    tavoli: Tavolo[] = []

    aggiungiTavolo(t: Tavolo) {
        this.tavoli.push(t)
    }

    getTavoli() {
        return this.tavoli
    }
}

class Area implements Superficie {
    superfici: Superficie[] = []

    aggiungiSuperficie(s: Superficie) {
        this.superfici.push(s)
    }

    getTavoli(): Tavolo[] {
        let tavoli = []
        for (let s of this.superfici)
            tavoli.push(...s.getTavoli())
        return tavoli
    }
}

let t1 = new Tavolo()
let t2 = new Tavolo()
let t3 = new Tavolo()
let t4 = new Tavolo()

let s1 = new Stanza()
s1.aggiungiTavolo(t1)
s1.aggiungiTavolo(t2)

let s2 = new Stanza()
s2.aggiungiTavolo(t3)
s2.aggiungiTavolo(t4)

let a1 = new Area()
a1.aggiungiSuperficie(s1)
a1.aggiungiSuperficie(s2)

console.log(s1.getTavoli()) // t1, t2
console.log(s2.getTavoli()) // t3, t4
console.log(a1.getTavoli()) // t1, t2, t3, t4
