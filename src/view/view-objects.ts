export interface Item {
    id: string;
    src: string;
    checked: boolean;
}

export interface Param {
    id: string;
    option4: string;
    option5: string;
    finalChoice: string;
}

export const ETAPA1 = ["ace", "bce"]
const ETAPA2_A = ["ace", "ade"]
const ETAPA2_B = ["bce", "bde"]

const ETAPA3_AC = ["ace", "acf"]
const ETAPA3_AD = ["ade", "adf"]
const ETAPA3_BC = ["bce", "bcf"]
const ETAPA3_BD = ["bde", "bdf"]

const TODOS_ITENS = ["ace", "ade", "acf", "adf", "bce", "bde", "bcf", "bdf"]

function tornarIndex0(item: string): string[] {
    let lista = [...TODOS_ITENS]

    let index = lista.indexOf(item);

    if (index !== -1) {
        lista.splice(index, 1);
        lista.unshift(item);
    }

    return lista

}

export function dicionarioItens(id: string): string[] {

    if(id.length == 3) {
        const ultimaLetra = id[id.length - 1]

        return {
            "e": tornarIndex0(id),
            "f": tornarIndex0(id)
        }[ultimaLetra] || []
    }

    return {
        "a": ETAPA2_A,
        "b": ETAPA2_B,
        "ac": ETAPA3_AC,
        "ad": ETAPA3_AD,
        "bc": ETAPA3_BC,
        "bd": ETAPA3_BD,
    }[id] || []
}