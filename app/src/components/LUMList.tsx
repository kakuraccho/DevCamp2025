import { Box, Typography, Paper } from "@mui/material";
import { useLUMData } from "../contexts/LUMContext";
import LUMFacility from "./LUMFacility";

export default function LUMList({ floor }: { floor: number }) {
    const LUMData = useLUMData()

    if (!LUMData || LUMData.length === 0) { 
        return (
            <Box sx={{ textAlign: 'center', py: 4 }}>
                データの取得中にエラーが発生しました。
            </Box>
        );
    }

    const myFloorLUMData = LUMData.filter(data => data.floor === floor)

    const laundriesData = myFloorLUMData.filter(item => item['type'] === 'laundry')
    const dryersData = myFloorLUMData.filter(item => item['type'] === 'dryer')

    return (
        <Box sx={{ p: 2, width: '50vw', mx: 'auto' }}>
            <Typography 
                variant="h4" 
                sx={{ 
                    textAlign: 'center', 
                    mb: 3, 
                    fontWeight: 'bold' 
                }}
            >
                {floor}F
            </Typography>
            
            <Paper 
                elevation={3}
                sx={{ 
                    p: 3,
                    backgroundColor: '#9e9e9e',
                    borderRadius: 2
                }}
            >
                {/* 乾燥機セクション (上側) */}
                <Box sx={{ mb: 3, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <LUMFacility data={dryersData} />
                </Box>
                
                {/* 洗濯機セクション (下側) */}
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <LUMFacility data={laundriesData} />
                </Box>
            </Paper>
        </Box>
    );
}