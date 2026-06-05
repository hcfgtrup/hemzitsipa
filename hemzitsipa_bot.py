from telegram import Update, KeyboardButton, ReplyKeyboardMarkup
from telegram.ext import Application, CommandHandler, MessageHandler, filters

TOKEN = "7984205087:AAHnbeYgABNbnVTsnukm0wCoZikfdiSYEbE"

async def start(update: Update, context):
    keyboard = [
        [KeyboardButton("🎮 ИГРАТЬ"), KeyboardButton("📖 ОБ ИГРЕ")],
        [KeyboardButton("👥 ПЕРСОНАЖИ"), KeyboardButton("⚙️ НАСТРОЙКИ")]
    ]
    reply_markup = ReplyKeyboardMarkup(keyboard, resize_keyboard=True)
    await update.message.reply_text("Добро пожаловать в Хёмзиципу!", reply_markup=reply_markup)

async def game(update: Update, context):
    await update.message.reply_text("Открываю игру...")
    # Тут можно отправить ссылку на Mini App

app = Application.builder().token(TOKEN).build()
app.add_handler(CommandHandler("start", start))
app.run_polling()
