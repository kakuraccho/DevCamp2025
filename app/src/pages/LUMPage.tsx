import { Link } from "react-router-dom"
import LUM from "../components/LUM";

export default function LUMPage() {

    return (
        <div>
            <div>
                <Link to="/">dashboard</Link>
            </div>
            <LUM />
        </div>
    )
}