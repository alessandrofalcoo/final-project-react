import { useParams } from "react-router-dom";

export default function SingleGame() {
    const { id } = useParams();

    return (
        <main>
            <h1>Show</h1>
            <p>Gioco con id: {id}</p>
        </main>
    )
}