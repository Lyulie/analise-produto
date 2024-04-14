import { useNavigate } from "react-router-dom"
import "./styles.css"

export default function Final() {
    const navigate = useNavigate()
    
    return (
        <main>
            <h1 onClick={() => {navigate('/')}}>Muito obrigado por sua participação!</h1>
        </main>
    )
}