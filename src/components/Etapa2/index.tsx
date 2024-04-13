import { useLocation, useNavigate } from "react-router-dom"
import { Item, dicionarioItens } from "../../view/view-objects"
import { useEffect, useState } from "react"

export default function Etapa2() {
    const location = useLocation()
    const navigate = useNavigate()
    
    const ordemAtual: Item[] = dicionarioItens(location.state.id).map((item) => {
        return {
            id: item.substring(0, 2),
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
            <h1>Escolha entre as embalagens, qual você considera a melhor posição da alegação?</h1>
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
                <div className="back" onClick={() => {navigate('/etapa1')}}></div>
                <button 
                    className="done" 
                    type="submit" 
                    onClick={()=> {navigate('/etapa3', { replace: true, state: {id:itemEscolhido} })}}>
                    Finalizar
                </button>
            </div>

            
        </main>
    )
}