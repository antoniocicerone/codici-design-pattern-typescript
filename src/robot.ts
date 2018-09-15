interface Robot {
    motore: MotoreRobot

    eseguiAzione(a: AzioneRobot)

    salvaAzione(a: AzioneRobot)
}

interface AzioneRobot {
    esegui(r: Robot)

    annulla(r: Robot)
}

interface MotoreRobot {
    avvia()

    ferma()
}

class MotoreRobot1 implements MotoreRobot {
    avvia() {
        console.log("avvio")
    }

    ferma() {
        console.log("stop")
    }

}


class RobotDriver implements Robot {

    private stato = new RobotAttivo()

    private static _istanza

    private constructor(public motore: MotoreRobot) {
    }

    static robot(motore: MotoreRobot) {
        if (RobotDriver._istanza == null)
            RobotDriver._istanza = new RobotDriver(motore)
        return RobotDriver._istanza
    }

    azioniEseguite: AzioneRobot[] = []

    eseguiAzione(a: AzioneRobot) {
        this.stato.eseguiAzione(this, a)
    }

    salvaAzione(a:AzioneRobot) {
        this.azioniEseguite.push(a)
    }

    annullaAzione() {
        if (this.azioniEseguite.length > 0)
            this.azioniEseguite.pop().annulla(this)
    }

    cambiaStato() {
        this.stato = this.stato.cambiaStato()
    }

}

interface StatoRobot {
    eseguiAzione(r: Robot, a: AzioneRobot)

    cambiaStato(): StatoRobot
}

class RobotAttivo implements StatoRobot {

    eseguiAzione(r: Robot, a: AzioneRobot) {
        a.esegui(r)
        r.salvaAzione(a)
    }

    cambiaStato(): StatoRobot {
        return new RobotInCarica();
    }

}

class RobotInCarica implements StatoRobot {

    eseguiAzione(r: Robot, a: AzioneRobot) {
        let azioneFake = new LogAzione(a)
        azioneFake.esegui(r)
        r.salvaAzione(azioneFake)
    }

    cambiaStato(): StatoRobot {
        return new RobotAttivo();
    }

}

class LogAzione implements AzioneRobot {
    constructor(private a: AzioneRobot) {
    }

    esegui(r: Robot) {
        console.log("notifica vocale dell'azione"
            , this.a)
    }

    annulla(r: Robot) {
    }

}


class MuoviIndietro implements AzioneRobot {
    constructor(private secondi: number) {
    }

    esegui(r: Robot) {
    }

    annulla(r: Robot) {
    }
}

class MuoviAvanti implements AzioneRobot {

    constructor(private secondi: number) {
    }

    esegui(r: Robot) {

        r.motore.avvia()
        setTimeout(() => {
            r.motore.ferma()
        }, 1000 * this.secondi)
    }

    annulla(r: Robot) {
        new MuoviIndietro(this.secondi).esegui(r)
    }
}

let robot = RobotDriver.robot(new MotoreRobot1())