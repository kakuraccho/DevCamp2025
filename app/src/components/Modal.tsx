import { useState, useRef, useEffect } from "react";
import type { ModalProps } from "../types/types";

export default function Modal({ openMessage, children }: ModalProps) {
    const [isOpen, setIsOpen] = useState(false)
    const dialogRef = useRef<HTMLDialogElement>(null)
    
    useEffect(() => {
        const dialogElement = dialogRef.current
        if (!dialogElement) return

        if (isOpen) {
            dialogElement.showModal()
        } else {
            dialogElement.close()
        }
    },[isOpen])

    return (
        <div>
            <button onClick={() => setIsOpen(true)}>{openMessage}</button>
            <dialog ref={dialogRef} onCancel={() => setIsOpen(false)}>
                {children}
                <button onClick={() => setIsOpen(false)}>cancel</button>
            </dialog>
        </div>
    )
}