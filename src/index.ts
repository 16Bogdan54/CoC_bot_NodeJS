import { Telegraf} from "telegraf";
import env from 'dotenv'
env.config()

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.start((ctx) => ctx.reply('Welcome'))
bot.help((ctx) => ctx.reply('Help'))

bot.command('getclan', async  (ctx) => await ctx.reply('Enter clan tag in format - clan: #123abc'))
bot.command('getplayer', async (ctx) => await ctx.reply('Enter player tag in format - player: #123abc'))

bot.on('text', async (ctx) => {
    const userInput: string = ctx.message.text

    console.log(userInput)

    if(userInput.includes('clan:')) {
        await ctx.reply('Clan tag ' + userInput.slice(userInput.indexOf('#')+1, userInput.length))
    }

    if(userInput.includes('player:')) {
        await ctx.reply('Player tag ' + userInput.slice(userInput.indexOf('#')+1, userInput.length))
    }

})

bot.on('sticker', (ctx) => ctx.reply('👍'))

bot.launch().then(r => console.log(r))