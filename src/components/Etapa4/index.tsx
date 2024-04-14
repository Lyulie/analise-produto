import { useLocation, useNavigate } from "react-router-dom"
import { Item, dicionarioItens } from "../../view/view-objects"
import { useEffect, useState } from "react"

import "./styles.css"

interface OpcoesEscolha {
    manterEscolha: boolean,
    escolheOutra: boolean
}

export default function Etapa4() {
    const location = useLocation()
    const navigate = useNavigate()

    const ordemAtual: Item[] = dicionarioItens(location.state.id).map((item) => {
        return {
            id: item,
            src: `/img/${item}.png`,
            checked: false
        }
    })

    const [opcoes, setOpcoes] = useState<OpcoesEscolha>({ manterEscolha: false, escolheOutra: false })

    const [itemEscolhido, setItemEscolhido] = useState("")
    const [itens, setItens] = useState<Item[]>(ordemAtual)

    useEffect(() => {

        if (itemEscolhido == "" && opcoes.escolheOutra) {
            setOpcoes({ manterEscolha: false, escolheOutra: true })
        } else if (itemEscolhido == "" && !opcoes.escolheOutra) {
            setOpcoes({ manterEscolha: false, escolheOutra: false })
        } else if (itemEscolhido == location.state.id) {
            setOpcoes({ manterEscolha: true, escolheOutra: false })
        } else if (itemEscolhido != location.state.id) {
            setOpcoes({ manterEscolha: false, escolheOutra: true })
        }
    }, [itemEscolhido])

useEffect(() => {
    const possivelEscolha = itens.find((item) => item.checked == true)
    if (possivelEscolha) {
        setItemEscolhido(possivelEscolha.id)
    } else {
        setItemEscolhido("")
    }
}, [itens])


const handleCheck = (checked_index: number) => setItens(
    itens.map((item, index) =>
        index == checked_index
            ? { ...item, checked: true }
            : { ...item, checked: false }
    )
)

const handleMantemEscolha = () => {
    setItens(itens.map((item) => item.id == location.state.id
        ? { ...item, checked: true }
        : { ...item, checked: false }));
}

const handleEscolheOutra = () => {
    setOpcoes({...opcoes, escolheOutra: !opcoes.escolheOutra })
    setItens(itens.map((item) => ({ ...item, checked: false })));
}

return (
    <main>
        <h1>Em comparação as outras possibilidades, você:</h1>
        <div className="decisao">
            <button
                className={opcoes.manterEscolha ? 'emfoco' : 'done'}
                onClick={handleMantemEscolha}>
                Mantém sua escolha
            </button>
            <button
                className={opcoes.escolheOutra ? 'emfoco' : 'done'}
                onClick={handleEscolheOutra}>
                Escolhe outra
            </button>
        </div>

        <div className="container_imagem">
            {itens.map((item, index) => (
                <div key={index} className="container_escolha">
                    <input
                        checked={item.checked}
                        className="radio_button"
                        type="radio"
                        onChange={() => handleCheck(index)} />
                    <img src={item.src} alt="" />

                    {item.id == location.state.id ? (
                        <p>Sua Escolha</p>
                    ) : <></>}
                </div>

            ))}
        </div>

        <div className="buttonContainer">
            <div className="back" onClick={() => { navigate('/etapa3', { replace: true, state: { id: location.state.id.substring(0, 2) } }) }}></div>
            <button
                disabled={itemEscolhido == ""}
                className="done"
                type="submit"
                onClick={() => { navigate('/etapa5', { replace: true, state: { id: location.state.id, o4: itemEscolhido } }) }}>
                Avançar
            </button>
        </div>


    </main>
)
}