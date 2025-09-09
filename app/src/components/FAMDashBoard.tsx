import useFetchDB from "../hooks/useFetchDB"

export default function FAMDashBoard() {

    const { data: bathData, loading: bathLoading, error: bathError } = useFetchDB('users', 'fam_current_location_id', 1)
    const { data: cafeData, loading: cafeLoading, error: cafeError } = useFetchDB('users', 'fam_current_location_id', 2)

    if (bathLoading || cafeLoading) return <p>loading...</p>

    if (bathError) console.error(bathError)

    if (cafeError) console.error(cafeError)

    console.log(bathData, cafeData)

    return (
        <div>
            <p>風呂には {bathData.length} 人います</p>
            <p>食堂には {cafeData.length} 人います</p>
        </div>
    )
}