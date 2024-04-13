import { useLocation, useNavigate } from "react-router-dom"
import { Item, dicionarioItens } from "../../view/view-objects"
import { useEffect, useState } from "react"

import "./styles.css"

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

    const [mantemEscolha, setMantemEscolha] = useState(false)
    const [escolheOutra, setEscolheOutra] = useState(false)

    const [itemEscolhido, setItemEscolhido] = useState("")
    const [itens, setItens] = useState<Item[]>(ordemAtual)

    useEffect(() => {

        if(itemEscolhido == "") {
            setEscolheOutra(false)
            setMantemEscolha(false)
        }else if(itemEscolhido == location.state.id) {
            setEscolheOutra(false)
            setMantemEscolha(true)
        } else {
            setEscolheOutra(true)
            setMantemEscolha(false)
        }

    }, [itemEscolhido])

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

    const handleMantemEscolha = () => {
        setMantemEscolha(!mantemEscolha)
        setEscolheOutra(mantemEscolha)
        setItens(itens.map((item) => item.id == location.state.id 
            ? {...item, checked: true} 
            : {...item, checked: false}));
    }

    const handleEscolheOutra = () => {
        setEscolheOutra(!escolheOutra)
        setMantemEscolha(escolheOutra)

        setItens(itens.map((item) => ({...item, checked: false})));
    }

    return (
        <main>
            <h1>Em comparação as outras possibilidades, você:</h1>
            <div className="decisao">
                <button 
                    className={mantemEscolha? 'emfoco': 'done'}
                    onClick={ handleMantemEscolha }>
                    Mantém sua escolha
                </button>
                <button 
                    className={escolheOutra? 'emfoco': 'done'}
                    onClick={ handleEscolheOutra }>
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

                        {item.id == location.state.id? (
                            <p>Sua Escolha</p>
                        ): <></> }
                    </div>

                ))}
            </div>
            
            <div className="buttonContainer">
                <div className="back" onClick={() => {navigate('/etapa3', { replace: true, state: {id:location.state.id.substring(0, 2)} })}}></div>
                <button 
                    className="done" 
                    type="submit" 
                    onClick={()=> {navigate('/etapa5', { replace: true, state: {id:location.state.id, o4:itemEscolhido} })}}>
                    Finalizar
                </button>
            </div>

            
        </main>
    )
}