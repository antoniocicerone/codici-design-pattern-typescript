interface Evento {
    descrizione: string
    data: Date
    partecipanti: number
    luogo: string
}


let evento:Evento = {
    descrizione: "Cinema all'aperto",
    data: new Date(),
    partecipanti: 0,
    luogo: "Roma"
}

interface OperazioneSuEventi<T> {
    esegui(eventi: Array<Evento>): T
}

class CalcolaEventiNellUltimoMeseV0
    implements OperazioneSuEventi<number> {

    esegui(eventi: Array<Evento>): number {
        let totale = 0
        // filtra lista eventi per considerare solo
        // quelli nell'ultimo mese

        // elabora il totale
        return totale
    }

}

class CalcolaTotalePartecipantiNellUltimoMese
    implements OperazioneSuEventi<number> {

    esegui(eventi: Array<Evento>): number {
        let totale = 0
        // filtra lista eventi per considerare solo
        // quelli nell'ultimo mese

        // elabora il totale
        return totale
    }

}

abstract class OperazioneNellUltimoMese<T>
    implements OperazioneSuEventi<T> {

    esegui(eventi: Array<Evento>): T {
        let eventiFiltratiPerMese = this.filtra(eventi)
        return this.eseguiOperazione(eventiFiltratiPerMese);
    }


    protected abstract eseguiOperazione(eventiFiltratiPerMese: Array<Evento>):T;

    private filtra(eventi: Array<Evento>) {
        let oggi = new Date()
        let inizioMese = new Date()
        inizioMese.setDate(1)
        let eventiFiltrati = []
        for(let e of eventi){
            if(e.data <= oggi && e.data >= inizioMese)
                eventiFiltrati.push(e)
        }


        return eventiFiltrati
    }
}


class CalcolaEventiNellUltimoMese
    implements OperazioneSuEventi<number> {

    esegui(eventi: Array<Evento>): number {
        let totale = 0
        // filtra lista eventi per considerare solo
        // quelli nell'ultimo mese

        // elabora il totale
        return totale
    }

}

class CalcolaEventiNellUltimoMeseV2
    extends OperazioneNellUltimoMese<number>{

    protected eseguiOperazione(
            eventi: Array<Evento>): number {
        return eventi.length;
    }
}


class CalcolaTotalePartecipantiNellUltimoMeseV2
    extends OperazioneNellUltimoMese<number>{

    protected eseguiOperazione(
            eventi: Array<Evento>): number {
        let partecipanti = 0
        for(let p of eventi)
            partecipanti += p.partecipanti
        return partecipanti;
    }
}

class CalcolaRapportoPartecipantiEventiNellUltimoMese
    extends OperazioneNellUltimoMese<number> {
    protected eseguiOperazione(eventi: Array<Evento>): number {
        let opPartecipanti =
            new CalcolaTotalePartecipantiNellUltimoMese();
        let numPartecipanti = opPartecipanti.esegui(eventi)
        let opEventi = new CalcolaEventiNellUltimoMese()
        let numEventi = opEventi.esegui(eventi)
        return numPartecipanti/numEventi;
    }

}
