const express=require('express')
const{Client , GatewayIntentBits }=require('discord.js')

const client=new Client({
    intents:[
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
] 
})
client.on("messageCreate",(message)=>{
    console.log(message)
    if(message.author.bot)return
    message.reply({
        content:"hi from bot"
    })
})

client.login(
    "MTI2MTY1NDcyOTcxNzcxMDk0MA.G0YUi_.oygQB6G6ki_orgLVkAtmBmzXkCb04cOSLJVzAM"
)