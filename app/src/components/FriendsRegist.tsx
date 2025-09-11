import { useState, type ChangeEvent } from "react";
import { Box, Button, TextField, Typography, Alert, CircularProgress } from '@mui/material';
import Modal from "./Modal";
import { supabase } from "../supabaseClient";

export default function FriendsRegist() {
    const [name, setName] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        if (!name) {
            setError('名前を入力してください。');
            setIsLoading(false);
            return;
        }

        const { data: fetchData, error: fetchError } = await supabase
            .from('users')
            .select()
            .eq('name', name);

        if (fetchError || !fetchData || fetchData.length === 0) {
            setError('その名前のユーザーは見つかりませんでした。');
            setIsLoading(false);
            return;
        }

        const userId = fetchData[0].user_id;

        const { data: sendData, error: sendError } = await supabase.rpc('send_friend_request', {
            p_receiver_id: userId
        });

        if (sendError) {
            setError(`送信中にエラーが発生しました: ${sendError.message}`);
        } else {
            alert(sendData);
            // 成功したらフォームをリセットするぷ
            setName('');
        }
        setIsLoading(false);
    };

    return (
        <Modal openMessage="regist">
            <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Typography variant="h6">フレンドを登録</Typography>
                <form onSubmit={handleSubmit}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <TextField
                            label="name"
                            type="text"
                            value={name}
                            onChange={handleChange}
                            fullWidth
                            disabled={isLoading}
                        />
                        {error && <Alert severity="error">{error}</Alert>}
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={isLoading}
                        >
                            {isLoading ? <CircularProgress size={24} /> : 'send'}
                        </Button>
                    </Box>
                </form>
            </Box>
        </Modal>
    );
}