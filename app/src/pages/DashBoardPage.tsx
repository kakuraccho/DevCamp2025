import { Link } from "react-router-dom"

export default function DashBoardPage() {

    return (
        <div>
            this is dashboard page.
            <Link to="/fam">fam</Link>
            <Link to="/lum">lum</Link>
        </div>
    )
}