import { Telegraf} from "telegraf";
import env from 'dotenv'
import {getClan, getPlayer} from "./getters/getters";

env.config()

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.start((ctx) => ctx.reply('Welcome'))
bot.help((ctx) => ctx.reply('Help'))

bot.command('getclan', async  (ctx) => await ctx.reply('Enter clan tag in format - clan: #123abc'))
bot.command('getplayer', async (ctx) => await ctx.reply('Enter player tag in format - player: #123abc'))

bot.on('text', async (ctx) => {
    const userInput: string = ctx.message.text;

    if(userInput.includes('clan:')) {
        const tag = userInput.slice(userInput.indexOf('#')+1, userInput.length)

       await getClan(tag).then(res => {
             ctx.reply(res.description)
       })
    }

    if(userInput.includes('player:')) {
        const tag = userInput.slice(userInput.indexOf('#')+1, userInput.length)

        await getPlayer(tag).then(res => {
            ctx.reply(`level: ${res.expLevel} name: ${res.name}`)
        })
    }

})

bot.on('sticker', (ctx) => ctx.reply('👍'))

bot.launch().then(r => console.log(r))