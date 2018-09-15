interface CalcoloIva {
    calcolaIva(input: number): number
}

class CalcolaIva2018 implements CalcoloIva {
    calcolaIva(input: number) {
        return input * 0.22
    }
}


class SistemaGestioneTasse {

    //... altre operazioni non visualizzate

    calcolaIva(input: number, calcolatoreIva: CalcoloIva) {
        return calcolatoreIva.calcolaIva(input)
    }

}