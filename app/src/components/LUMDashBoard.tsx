import { Typography, CircularProgress, Box } from '@mui/material';
import { useLUMData } from "../contexts/LUMContext";
import useAuth from "../hooks/useAuth";
import LUMdbItem from "./LUMdbItem";

export default function LUMDashBoard() {
    const { session, loading: authLoading } = useAuth();
    const userId = session?.user.id;
    const LUMData = useLUMData();
    const ownLUMData = LUMData?.filter(data => data.userid === userId);

    if (authLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (!ownLUMData || ownLUMData.length === 0) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <Typography variant="body1" sx={{ textAlign: 'center' }}>
                    あなたが利用中の洗濯機はありません。
                </Typography>
            </Box>
        );
    }

    // ここはリスト表示なので、ul/liをMUIのリストコンポーネントに置き換えるぷ
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            {/* LUMdbItemをリストとして表示する場合は、このままのスタイルでOKだぷ */}
            <Typography>
                {ownLUMData.map(item => (
                    <span key={item.id}>
                        <LUMdbItem item={item} />
                    </span>
                ))}
            </Typography>
        </Box>
    );
}