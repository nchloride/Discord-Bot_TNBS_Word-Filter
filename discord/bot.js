require("dotenv").config();
const { Client } = require("discord.js");
const tnbs = new Client();
const fs = require("fs");
const  Play  = require("./playCommand");
const swearWords = ["gago", "tanga", "bobo", "pakyu", "TANGINAMO"];
const musicPrefix = "$";
const persistentData = [];


tnbs.login(process.env.BOT_TOKEN);
const playService = new Play(tnbs);
// const getSwearWords = (message) => {
//   const wordArr = message.split(" ");
//   const res = wordArr.map((word) => {
//     const reg = new RegExp(`^${word}`, "i");
//     return swearWords.map((sWords) => reg.test(sWords));
//   });
//   const finalRes = res.map((result) => result.includes(true));
//   console.log("INITIAL RESULT", res);
//   console.log("FINAL RESULT", finalRes);
//   return finalRes;
// };
const hasSwearWords = (message) => {
  return swearWords.some(word => message.includes(word.toLowerCase()) ===true);
};
const getSwearWords = (message) =>{
  return swearWords.filter(word  => message.includes(word.toLowerCase()) ===true);
}
// tnbs.on("ready", () => {
//   tnbs.channels.cache.get("754709929327198309").send("KAMUSTA KA TANGINA KA");
// });
tnbs.on("ready",()=>{
  console.log("ready");
  if(fs.existsSync(process.env.MUSIC_FOLDER_PATH)){
    console.log("deleted");
    fs.rmSync(process.env.MUSIC_FOLDER_PATH,{force:true,recursive:true})
  }
  fs.mkdirSync(process.env.MUSIC_FOLDER_PATH)
  
})
tnbs.on("message", async (message) => {
  const arjKnife = message.guild.emojis.cache.find(
    (arj) => arj.name === "arjknife"
  );
  if(message.channel.id === "754709929327198309"){
    if (message.author.bot) return;
    else if (message.content === "shit"){message.reply("cunt");} 
    //======================
    else if (hasSwearWords(message.content) === true) {
      console.log(hasSwearWords(message.content));
      message.delete({timeout:5000,reason:"TT NOT ALLOWED"});
      message.reply(`HOY GAGO! YOU SAID "${getSwearWords(message.content)}"`);
    }
    else if (message.content.includes("HAROLD")) {
      message.react(arjKnife);
      message.reply("MALAKI NOO");
    }
    if(message.content.startsWith(musicPrefix)){
      const userCommand = message.content.split(" ")[0].slice(1);
      console.log(userCommand);
      const channel = message.member.voice.channel;
      switch (userCommand) {
        case "play":
          if(channel){
            // playCommand(channel,message,tnbs);
            playService.playCommand(message,channel);
          }
          else{
            message.reply("You are not in any voice channel")
          }
          break;
        case "stop":
            
          break;
        case "join":
            const connection = await channel.join();
            connection.play("C:/Users/clank/coding projects/tnbs-bot/discord/hellobobo.mp3");   
          break;
        case "save":
            persistentData.push(message.content.slice(5,-1));
            message.reply(persistentData)
          break;
        default:
          message.reply("Unknown command")
          break;
      }
    }
  }

});

tnbs.on("presenceUpdate", (oldPresence, newPresence) => {
  const channel = newPresence.guild.channels;
  const shrek = newPresence.guild.emojis.cache.find(
    (shrk) => shrk.name === "Shreky"
  );

  if (oldPresence.activities != newPresence.activities) {
    console.log(newPresence);
    console.log(newPresence.activities);
    channel.cache
      .get("754709929327198309")
      .send(
        `@${newPresence.user.username} is ${
          newPresence.activities.length !== 0
            ? newPresence.activities[0].type
            : `  ${shrek}`
        } `
      );
  }
});
