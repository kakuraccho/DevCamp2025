import useFetchDB from "../hooks/useFetchDB";
import useAuth from "../hooks/useAuth";
import LUMList from "./LUMList";

export default function LUM() {
    const { session, loading: authLoading } = useAuth();
    const userId = session?.user.id;

    const { data: userData, loading: userLoading } = useFetchDB(
        'users',
        'user_id',
        userId || ''
    );

    if (authLoading || userLoading) {
        return <p>ユーザー情報を読み込んでいます...</p>;
    }

    const floor = userData?.[0]?.floor;

    if (!floor) {
        return <p>ユーザーのフロア情報が設定されていません。</p>;
    }
    
    return (
        <LUMList floor={floor} />
    )
}