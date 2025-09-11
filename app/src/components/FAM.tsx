import { Box } from "@mui/material";
import { useFriendData } from "../contexts/FriendContext";
import FAMList from "./FAMList";

export default function FAM() {
    const friendData = useFriendData()

    if (!friendData || friendData.length === 0) {
        return (
            <Box sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                height: '60vh',
                color: 'text.secondary'
            }}>
                フレンドはまだいません
            </Box>
        )
    }

    return (
        <Box sx={{ p: 2 }}>
            <FAMList data={friendData} />
        </Box>
    )
}