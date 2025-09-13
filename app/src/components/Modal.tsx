import { useState } from "react";
import type { ModalProps } from "../types/types";
import { Modal as MuiModal, Box, Button } from '@mui/material';

export default function Modal({ openMessage, children }: ModalProps) {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    return (
        <Box>
            <Button onClick={handleOpen} variant="contained">{openMessage}</Button>

            <MuiModal
                open={isOpen}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                {/* モーダルの中身を配置するためのBox */}
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: { xs: '70%', md: 400 }, // レスポンシブ対応
                    maxWidth: '70%', // 最大幅を設定
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                }}>
                    {children}
                    <Button onClick={handleClose} variant="outlined" sx={{ mt: 2 }}>
                        cancel
                    </Button>
                </Box>
            </MuiModal>
        </Box>
    );
}