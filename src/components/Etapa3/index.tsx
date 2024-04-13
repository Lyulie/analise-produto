import { useLocation, useNavigate } from "react-router-dom"
import { Item, dicionarioItens } from "../../view/view-objects"
import { useEffect, useState } from "react"

export default function Etapa3() {
    const location = useLocation()
    const navigate = useNavigate()
    
    const ordemAtual: Item[] = dicionarioItens(location.state.id).map((item) => {
        return {
            id: item,
            src: `/img/${item}.png`,
            checked: false
        }
    })

    const [itemEscolhido, setItemEscolhido] = useState("")
    const [itens, setItens] = useState<Item[]>(ordemAtual)

    useEffect(() => {
        const possivelEscolha = itens.find((item) => item.checked == true)
        if(possivelEscolha) {
            setItemEscolhido(possivelEscolha.id)
            console.log(itemEscolhido)
        }
        
    }, [itens])

    const handleCheck = (checked_index: number) => setItens(
        itens.map((item, index) =>
            index == checked_index
                ? { ...item, checked: true }
                : { ...item, checked: false }
        )
    )

    return (
        <main>
            <h1>Escolha entre as embalagens, qual tipo de alegação você considera melhor: apenas texto; ou texto e símbolo?</h1>
            <div className="container_imagem">
                {itens.map((item, index) => (
                    <div key={index} className="container_escolha">
                        <input 
                            checked={item.checked} 
                            className="radio_button" 
                            type="radio" 
                            onChange={() => handleCheck(index)} />
                        <img src={item.src} alt="" />
                    </div>

                ))}
            </div>

            <div className="buttonContainer">
                <div className="back" onClick={() => {navigate('/etapa2', { replace: true, state: {id:location.state.id.substring(0, 1)} })}}></div>
                <button 
                    className="done" 
                    type="submit" 
                    onClick={()=> {navigate('/etapa4', { replace: true, state: {id:itemEscolhido} })}}>
                    Finalizar
                </button>
            </div>

            
        </main>
    )
}