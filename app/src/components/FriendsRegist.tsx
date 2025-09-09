import { useState, type ChangeEvent } from "react";
import Modal from "./Modal";
import { supabase } from "../supabaseClient";

export default function FriendsRegist() {

    const [name, setName] = useState('')

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!name) {
            alert('名前を入力してください。')
            return
        }

        const { data: fetchData, error: fetchError } = await supabase
            .from('users')
            .select()
            .eq('name', name)

        if (fetchError || !fetchData) {
            alert('その名前のユーザーは見つかりませんでした。')
            return
        }

        const userId = fetchData[0].user_id

        const { data: sendData, error: sendError } = await supabase.rpc('send_friend_request', {
            p_receiver_id: userId
        })
        
        if (sendError) {
            alert(`送信中にエラーが発生しました: ${sendError.message}`)
        } else {
            alert(sendData)
        }
    }

    return (
        <Modal openMessage="regist"  >
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">name</label>
                    <input type="text" value={name} onChange={handleChange} />
                </div>
                <div>
                    <button>send</button>
                </div>
            </form>
        </Modal>
    )
}