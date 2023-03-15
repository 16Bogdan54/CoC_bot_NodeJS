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

           let clanReply = '';
           for (const [key, value] of Object.entries(res)) {
             if(typeof  value === "string") {
                 clanReply += `${key.replace(/([A-Z])/g, ' $1')
                     .replace(/^./, str => str.toUpperCase())}: ${value}\n`;
             }
           }

             ctx.reply(clanReply)
       })
    }

    if(userInput.includes('player:')) {
        const tag = userInput.slice(userInput.indexOf('#')+1, userInput.length)

        await getPlayer(tag).then(res => {
            let playerReply = '';
            for (const [key, value] of Object.entries(res)) {
                // if(typeof  value === "string") {
                    playerReply += `${key.replace(/([A-Z])/g, ' $1')
                        .replace(/^./, str => str.toUpperCase())}: ${value}\n`;
                // }
            }

            ctx.reply(playerReply)
        })
    }

})

bot.on('sticker', (ctx) => ctx.reply('👍'))

bot.launch();