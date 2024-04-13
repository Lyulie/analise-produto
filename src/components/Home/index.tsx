import { useNavigate } from "react-router-dom"

export default function Home() {
    const navigate = useNavigate()
    return(
        <div>
            Home
            <button onClick={() => {navigate("/etapa1")}}>
                Iniciar
            </button>
        </div>
    )
}