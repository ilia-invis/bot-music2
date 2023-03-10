//script tick settings

require('events').EventEmitter.prototype._maxListeners = 100;

//definements
const Pagein = require('discord-paginationembed');

const Discord = require('discord.js');

const Canvas = require('canvas');

const { registerFont } = require('canvas');

const { MessageEmbed } = require("discord.js");

const http = require("http");

const fs = require('fs')

const getDirName = require('path').dirname;

const { Client, Collection } = require("discord.js");

const { readdirSync } = require("fs");

const { join } = require("path");

const { TOKEN, PREFIX } = require("./util/EvobotUtil");

const client = new Client({ disableMentions: "everyone" });

const prefux = '*';

client.login(TOKEN);

client.commands = new Collection();

client.prefix = PREFIX;

client.queue = new Map();

const cooldowns = new Collection();

const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");


//setup


client.on("ready", () => {
  function randomStatus() {
    const status = ["EVIL", "IS", "HERE"]

    let rstatus = status[Math.floor(Math.random() * status.length)]

    client.user.setPresence({
      status: 'dnd',
      activity: {
        name: `${rstatus}`,
        type: 'WATCHING',
      }
    })
  }; setInterval(randomStatus, 3000)

  console.log('Ready for playing music')
});



client.on("ready", () => {

  setTimeout(function() {
    console.log('opening ports . . .')
  }, 1000);

  setTimeout(function() {
    http.createServer((_, res) => res.end("Windwalker Studio Status : READY")).listen(8080);
    console.log('Port Is Open On 8080')
  }, 3000);

  setTimeout(function() {
    console.log('Site is ready')
  }, 6000);


});

client.on("warn", (info) => console.log(info));
client.on("error", console.error);

//loop

const commandFiles = readdirSync(join(__dirname, "commands")).filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(join(__dirname, "commands", `${file}`));
  client.commands.set(command.name, command);
}

client.on('message', async msg => {
  if (msg.content.toLowerCase().startsWith(prefux + " ")) {
    msg.channel.send("?????? ???????????? ???? ???? ???? ?????? ?????????? ?????? ???????????? ???? ???????? ?????????? ???????????? ?????? ")
    msg.channel.send('???????? ???? ?????????? ```*help``` ???????? ?????? ?????????????? ?????????? ?????????????? ????????')
  }
});

client.on('message', message => {
  if (message.content.toLowerCase().startsWith(prefux + 'post')) {
    const MyMessage = message.content.slice(20).trim();
    const TestEmbed = new Discord.MessageEmbed()
      .setColor('#b700ff')
      .setTitle(MyMessage)

    message.delete();
    message.channel.send(TestEmbed)
  }
});

client.on('message', msg => {
  if (msg.content === '*Hi') {
    msg.reply("hello");

  }
});

client.on('message', msg => {
  if (msg.content === '*games') {
    msg.reply('Best Games Is Here');
    msg.channel.send('https://ptb.discord.com/store/skus/550277544025522176/heroes-generals-wwii');
    msg.channel.send('https://ptb.discordapp.com/store/skus/528145079819436043/paladins');
    msg.channel.send('https://ptb.discord.com/store/skus/518088627234930688/realm-royale');
    msg.channel.send('https://ptb.discord.com/store/skus/488607666231443456/minion-masters');
    msg.channel.send('https://ptb.discord.com/store/skus/594073512906588179/light-from-the-butt');
    msg.channel.send('https://ptb.discord.com/store/skus/565994833953554432/it-s-hard-being-a-dog');
    msg.channel.send('?????????? ????????');
  }
});

client.on('message', msg => {
  if (msg.content === '*server') {

    msg.reply("???? ????");
    msg.channel.send(`${client.guilds.cache.size}`);
    msg.channel.send("???? ???????? ???? ??????");
  }
});

client.on('message', message => {
  if (message.content === '*info') {
    if (message.channel.type == "dm")
      return message.channel.send('?????? ?????????? ?????? ?????????? ???? DM ?????????????? ??????');
    const serinfo = new Discord.MessageEmbed()
      .setColor("ffffff")
      .setTitle("?????????????? ????????")
      .addFields(
        { name: '?????? ????????', value: `${message.guild}` },
        { name: '\u200B', value: '\u200B' },

        { name: '???????? ????????', value: `${message.guild.owner}` },
        { name: '\u200B', value: '\u200B' },


        { name: '?????????? ????????', value: `${message.guild.memberCount}` },
        { name: '\u200B', value: '\u200B' },

        { name: '?????????? ??????', value: `${message.guild.roles.cache.size}` },

      )
    message.reply('?????????? ???????? ?????????????? ????????');

    message.channel.send(serinfo);
  }
});

client.on("message", message => {
  if (message.content.toLowerCase().startsWith(prefux + 'help')) {

    const toggel = message.content.slice(5).trim();
    if (toggel === 'm')
      return;

    const FieldsEmbed = new Pagein.FieldsEmbed()
      .setArray([
        { word: "***?????????????? ??????***" },
        { word: "\u200B" },
        { word: "** *helpm ** ???????? ???????????????? ??????????" },
        { word: "\u200B" },
        { word: '** *hello ** ???????? ???????? ???? ??????' },
        { word: "\u200B" },
        { word: '** *games ** ???? ???????? ???? ?????? ?????? ??????????????' },
        { word: "\u200B" },
        { word: '** *post <text> ** ?????? ???????? ???? ???????? ???? ?????? ????????????' },
        { word: "\u200B" },
        { word: '** *info ** ?????????????? ????????' },
        { word: "\u200B" },

      ])
      .setChannel(message.channel)
      .setElementsPerPage(11)
      .setPageIndicator(false)
      .formatField('**Commands**', el => el.word)
    FieldsEmbed.embed
      .setColor('medium blue')
    FieldsEmbed.build();

  }

});

client.on("message", async (message) => {
  if (message.author.bot) return;
  if (!message.guild) return;

  const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(PREFIX)})\\s*`);
  if (!prefixRegex.test(message.content)) return;

  const [, matchedPrefix] = message.content.match(prefixRegex);

  const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command =
    client.commands.get(commandName) ||
    client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));

  if (!command) return;

  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Collection());
  }

  const now = Date.now();
  const timestamps = cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown || 1) * 1000;

  if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      return message.reply(
        `please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`
      );
    }
  }

  timestamps.set(message.author.id, now);
  setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

  try {
    command.execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply("There was an error executing that command.").catch(console.error);
  }
});
99

    //functions