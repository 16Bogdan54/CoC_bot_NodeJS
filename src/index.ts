import { Telegraf} from "telegraf";
import env from 'dotenv'
env.config()

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.start((ctx) => ctx.reply('Welcome'))
bot.help((ctx) => ctx.reply('Help'))


bot.on('sticker', (ctx) => ctx.reply('👍'))

bot.launch().then(r => console.log(r))