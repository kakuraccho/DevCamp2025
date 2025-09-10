import discord
import os
from dotenv import load_dotenv
import asyncio
import traceback

# --- FastAPIのインポート ---
from fastapi import FastAPI
from pydantic import BaseModel
import uvicorn

# --- .envファイルから環境変数を読み込む ---
load_dotenv()
TOKEN = os.getenv('DISCORD_BOT_TOKEN')

# --- Discordボットのセットアップ ---
# ボットが必要とする権限（Intents）を設定
intents = discord.Intents.default()
intents.members = True
intents.message_content = True
client = discord.Client(intents=intents)

# --- FastAPIサーバーのセットアップ ---
app = FastAPI()

# Webhookで受け取るJSONデータの型を定義
class WebhookPayload(BaseModel):
    discord_id: str
    message: str

# "/webhook/notify" というURLでPOSTリクエストを受け付ける窓口（エンドポイント）
@app.post("/webhook/notify")
async def handle_webhook(payload: WebhookPayload):
    try:
        # 受け取ったデータから、Discord IDとメッセージを取得
        user_id = int(payload.discord_id)
        message_to_send = payload.message
        
        print(f"Webhook受信: discord_id={user_id}, message='{message_to_send}'")
        
        # Discord IDを使って、Discord上のユーザー情報を取得
        user = await client.fetch_user(user_id)

        # ユーザーが見つかればDMを送信
        if user:
            await user.send(message_to_send)
            print(f"ユーザー({user_id})にメッセージを送信しました。")
            return {"status": "success", "message": "通知を送信しました。"}
        else:
            print(f"ユーザー({user_id})が見つかりませんでした。")
            return {"status": "error", "message": "User not found"}
            
    except Exception as e:
        # 何か予期しないエラーが起きた場合
        print(f"Webhook処理中にエラーが発生しました: {e}")
        traceback.print_exc() # より詳細なエラー情報をコンソールに出力
        return {"status": "error", "message": str(e)}

# --- DiscordボットとFastAPIサーバーを同時に起動するための設定 ---

# Discordボットが起動したときに一度だけ実行されるイベント
@client.event
async def on_ready():
    print(f'Bot: {client.user} としてログインしました！')

# Discordボットを起動するためのコルーチン
async def run_bot():
    await client.start(TOKEN)

# FastAPIサーバーを起動するためのコルーチン
async def run_server():
    config = uvicorn.Config(app, host="0.0.0.0", port=8000)
    server = uvicorn.Server(config)
    print("Server: Webhookサーバーが http://0.0.0.0:8000 で起動します。")
    await server.serve()

# 上記の2つの処理を並行して実行
async def main():
    await asyncio.gather(
        run_bot(),
        run_server()
    )

if __name__ == "__main__":
    asyncio.run(main())