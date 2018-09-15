interface Attivita {
    descrizione: string
    completata: boolean
}

interface AttivitaSemplice {
    descrizione: string
    completata: boolean
}

interface Attivita_v2 {
    descrizione: string
    completata: boolean
    sottoAttivita: AttivitaSemplice[]
}

interface Attivita_v3 {
    descrizione: string
    completata: boolean
    sottoAttivita: Attivita_v3[]
}

let compreareLatte: Attivita_v3 = {
    descrizione: "comprare latte",
    completata: false,
    sottoAttivita: []
}
let comprearePane: Attivita_v3 = {
    descrizione: "comprare pane",
    completata: false,
    sottoAttivita: []
}


let fareSpesa: Attivita_v3 = {
    descrizione: "fare spesa",
    completata: false,
    sottoAttivita: [compreareLatte, comprearePane]
}

let portareCaneVeterinario: Attivita_v3 = {
    descrizione: "portare cane dal veterianrio",
    completata: false,
    sottoAttivita: []
}


let attivitaPrincipale: Attivita_v3 = {
    descrizione: "task della prossima settimana",
    completata: false,
    sottoAttivita: [fareSpesa, portareCaneVeterinario]
}


interface Attivita_v4 {
    descrizione: string
    percentualeCompletamento(): number
}

class AttivitaInterna implements Attivita_v4 {
    descrizione: string;
    sottoAttivita: Attivita_v4[]

    percentualeCompletamento(): number {
        let percentuale = 0
        for(let a of this.sottoAttivita)
            percentuale += a.percentualeCompletamento()
        return percentuale / this.sottoAttivita.length;
    }
}

class AttivitaFoglia implements Attivita_v4 {
    completamento: boolean;
    descrizione: string;

    percentualeCompletamento(): number {
        return this.completamento? 1 : 0;
    }

}


interface Nodo {
    descrizione: string
    operazione()
}

class NodoInterno implements Nodo {
    descrizione: string;
    figli: Nodo[]

    operazione() {
        for (let n of this.figli)
            n.operazione()
    }
}

class Foglia implements Nodo {
    descrizione: string;

    operazione() {
        //caso base
    }
}

