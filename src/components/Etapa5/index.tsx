import { useLocation, useNavigate } from "react-router-dom"
import { Item, dicionarioItens } from "../../view/view-objects"
import { useState } from "react"
import "./styles.css"
import { Seletor } from "../Seletor"

const OPCOES = ['1', '2', '3', '4', '5', '6', '7']

export default function Etapa5() {
    const location = useLocation()
    const navigate = useNavigate()

    const ordemAtual: Item[] = dicionarioItens(location.state.id).map((item) => {
        return {
            id: item,
            src: `/img/${item}.png`,
            checked: false
        }
    })

    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

    const handleSelect = (index: number, value: string) => {
        let newSelectedOptions = [...selectedOptions];
        newSelectedOptions[index] = value;
        setSelectedOptions(newSelectedOptions);
    };

    return (
        <main>
            <h1>Coloque na ordem da melhor para pior (1-7) as embalagens não escolhidas.<br /> Sendo 1 a melhor e 7 a pior</h1>

            <div className="container_imagem">
                {ordemAtual.map((item, index) => (
                    <div key={index} className="container_escolha">
                        {item.id == location.state.id ? (
                            <>
                                <input
                                    checked
                                    className="radio_button"
                                    type="radio" />
                                <img className="imagem_escolhida" src={item.src} alt="" />
                            </>
                        ) : 
                            <>
                                <Seletor 
                                    options={OPCOES.filter(option => !selectedOptions.includes(option) || option === selectedOptions[index])} 
                                    onSelect={(value: string) => handleSelect(index, value)} 
                                />
                                <img src={item.src} alt="" />
                            </>
                        }
                    </div>
                ))}
            </div>

            <div className="buttonContainer">
                <div className="back" onClick={() => { navigate('/etapa4', { replace: true, state: { id: location.state.id } }) }}></div>
                <button
                    className="done"
                    type="submit"
                    onClick={() => { navigate('/etapa6', { replace: true, state: { id: location.state.id, o4: location.state.o4 } }) }}>
                    Avançar
                </button>
            </div>
        </main>
    )
}