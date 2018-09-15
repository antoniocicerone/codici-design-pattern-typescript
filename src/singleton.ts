

interface DriverStampa {
    stampa(testo:string)
}

class DriverDiStampa implements DriverStampa{

    static istanza = new DriverDiStampa()

    private constructor(){}

    static ottieniDriver():DriverStampa {
        return DriverDiStampa.istanza
    }

    stampa(testo:string){
        //...
    }

}

const driver = DriverDiStampa.ottieniDriver()

