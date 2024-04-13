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

const ETAPA2_A = ["adg", "aeg"]
const ETAPA2_B = ["bdg", "beg"]

const ETAPA3_AD = ["adg", "adh"]
const ETAPA3_AE = ["aeg", "aeh"]
const ETAPA3_BD = ["bdg", "bdh"]
const ETAPA3_BE = ["beg", "beh"]

const FAMILIA_G = ["adg", "aeg", "bdg", "beg"]
const FAMILIA_H = ["adh", "aeh", "bdh", "beh"]
const TODOS_ITENS = ["adg", "aeg", "adh", "aeh", "bdg", "beg", "bdh", "beh"]

export function dicionarioItens(id: string): string[] {

    if(id.length == 3) {
        const ultimaLetra = id[id.length - 1]
        return {
            "g": TODOS_ITENS,
            "h": TODOS_ITENS
        }[ultimaLetra] || []
    }

    return {
        "a": ETAPA2_A,
        "b": ETAPA2_B,
        "ad": ETAPA3_AD,
        "ae": ETAPA3_AE,
        "bd": ETAPA3_BD,
        "be": ETAPA3_BE,
    }[id] || []
}