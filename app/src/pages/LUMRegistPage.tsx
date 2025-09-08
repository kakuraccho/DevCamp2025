import { useParams } from "react-router-dom"
import LUMRegist from "../components/LUMRegist"

export default function LUMRegistPage() {
    const param = useParams()
    const lumId = param.id ?? "";

    return (
        <LUMRegist id={lumId} />
    )
}