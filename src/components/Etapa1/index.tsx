import { useEffect, useState } from "react"
import { ETAPA1, Item } from "../../view/view-objects"
import "./styles.css"
import { useNavigate } from "react-router-dom"

export default function Etapa1() {

    const navigate = useNavigate()

    const ordemInicial: Item[] = ETAPA1.map((item) => {
        return {
            id: item.substring(0, 1),
            src: `/img/${item}.png`,
            checked: false
        }
    })


    const [itemEscolhido, setItemEscolhido] = useState("")
    const [itens, setItens] = useState<Item[]>(ordemInicial)

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
            <h1>Escolha entre as embalagens, qual você considera o melhor tamanho da alegação?</h1>
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
                <div className="back" onClick={() => {navigate('/')}}></div>
                <button 
                    className="done" 
                    type="submit" 
                    onClick={()=> {navigate('/etapa2', { replace: true, state: {id:itemEscolhido} })}}>
                    Avançar
                </button>
            </div>

            
        </main>
    )
}