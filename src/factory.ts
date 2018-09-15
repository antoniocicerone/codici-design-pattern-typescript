interface Motore {
    aumentaPotenza(): number

    diminuisciPotenza(): number
}

class Motore1500 implements Motore {
    aumentaPotenza(): number {
        return 10;
    }

    diminuisciPotenza(): number {
        return -10;
    }
}


class Motore1900 implements Motore {
    aumentaPotenza(): number {
        return 20;
    }

    diminuisciPotenza(): number {
        return -20;
    }
}

interface MacchinarioPerCreareMotori {
    creaMotore(): Motore
}

class CreaMotore1500
    implements MacchinarioPerCreareMotori {

    creaMotore(): Motore {
        return new Motore1500()
    }
}


class Motore1800 implements Motore {

    constructor(private tipo:string){}

    aumentaPotenza(): number {
        return 10;
    }

    diminuisciPotenza(): number {
        return -10;
    }

    static motoreDiesel(){
        return new Motore1800("diesel")
    }

    static motoreBenzina(){
        return new Motore1800("benzina")
    }
}

let motoreBezina = Motore1800.motoreBenzina()