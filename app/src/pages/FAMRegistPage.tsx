import { useParams } from "react-router-dom"
import FAMRegist from "../components/FAMRegist";

export default function FAMRegistPage() {
    const param = useParams()
    const famId = param.id ?? "";

    return (
        <FAMRegist id={famId} />
    )
}