const express = require('express');
const app = express();
app.get('/', (req, res) => {
  res.send('Hello Express app!')
});
app.listen(3000, () => {
});
const { Client, Intents, MessageEmbed } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
client.on("ready" , () => {
const commands = [{
    name : "ping",
    description : "ping"
}]
    const rest = new REST({ version: '9' }).setToken(process.env.token);
    
    (async () => {
        try {
            await rest.put(
                Routes.applicationCommands(client.user.id),
                { body: commands },
            );
    
            console.log("Done Run ApplicationCommands");
        } catch (error) {
            console.error(error);
        }
    })();
})
client.on('interactionCreate', async interaction => {
if (!interaction.isCommand()) return;
await interaction.deferReply()
if(interaction.commandName == "ping"){
await interaction.editReply("Ping")
}
})


client.login(process.env.token)
