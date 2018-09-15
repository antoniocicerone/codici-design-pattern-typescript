
interface Evento {
    descrizione: string
    data: Date
    partecipanti: number
    luogo: string
}

interface OperazioneSuEventi<T> {
    esegui(eventi: Array<Evento>): T
}


abstract class OperazioneNellUltimoMeseV3<T>
    implements OperazioneSuEventi<T> {

    constructor(private filtraPer: string){}

    esegui(eventi: Array<Evento>): T {
        let eventiFiltratiPerMese = this.filtra(eventi)
        return this.eseguiOperazione(eventiFiltratiPerMese);
    }


    protected abstract eseguiOperazione(eventiFiltratiPerMese: Array<Evento>):T;

    private filtra(eventi: Array<Evento>) {
        let eventiFiltrati = eventi //filtrati per mese
        if(this.filtraPer == "mese"){
            eventiFiltrati = eventi //filtrati per mese
        } else if(this.filtraPer == "7-giorni"){
            eventiFiltrati = eventi //filtrati negli ultimi 7 giorni
        }
        return eventiFiltrati
    }
}

class CalcolaEventiNellUltimoMeseV3
    extends OperazioneNellUltimoMese<number>{

    protected eseguiOperazione(
        eventi: Array<Evento>): number {
        return eventi.length;
    }
}


class CalcolaTotalePartecipantiNellUltimoMeseV3
    extends OperazioneNellUltimoMese<number>{

    protected eseguiOperazione(
        eventi: Array<Evento>): number {
        let partecipanti = 0
        for(let p of eventi)
            partecipanti += p.partecipanti
        return partecipanti;
    }
}


interface FiltroTemporale {
    filtra(eventi:Array<Evento>):Array<Evento>
}

class FiltraPerMese
            implements FiltroTemporale {
    filtra(eventi: Array<Evento>)
                    : Array<Evento> {
        //...filtrati per mese
        return eventi
    }
}

abstract class OperazioneNellUltimoMeseV4<T>
    implements OperazioneSuEventi<T> {

    constructor(private filtro: FiltroTemporale){}

    esegui(eventi: Array<Evento>): T {
        return this.eseguiOperazione(
                        this.filtra(eventi));
    }

    protected abstract eseguiOperazione(eventi: Array<Evento>):T;

    private filtra(eventi: Array<Evento>) {
        return this.filtro.filtra(eventi)
    }
}

class FiltrTemporaleGenerico
    implements FiltroTemporale {

    constructor(private dataInizio:Date,
                private dataFine:Date){}

    filtra(eventi: Array<Evento>)
        : Array<Evento> {
        return eventi.filter(e => e.data >= this.dataInizio
            && e.data <= this.dataFine)
    }
}

class FiltraUltimoAnno implements FiltroTemporale {

    filtra(eventi: Array<Evento>)
        : Array<Evento> {
        let dataInizio = new Date()
        dataInizio.setMonth(0)
        dataInizio.setDate(1)
        return eventi.filter(e => e.data >= dataInizio
            && e.data <= new Date())
    }


}
class FiltraUltimoAnnoV2 extends FiltrTemporaleGenerico {

    constructor(){
        let d = new Date(new Date().getFullYear(), 0, 1)
        super(d, new Date())
    }

}