import { Link } from "react-router-dom"
import FAM from "../components/FAM"

export default function FAMPage() {

    return (
        <div>
            <Link to="/">dashboard</Link>
            <FAM />
        </div>
    )
}