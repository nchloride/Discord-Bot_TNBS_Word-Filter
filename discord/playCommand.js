const yts = require("yt-search");
const ytdl = require("ytdl-core");
const fs = require("fs");

async function playCommand(channel,message,client){
  const music = message.content.split(" ").slice(1).join(" ");
  const channelId = message.channel.id;
  if(music === "undefined") return message.reply(`Please add title you stupid shit`);
    try {
        const connection = await channel.join();
        const vids = await yts(music);
        const vidUrl = vids.videos[0].url;
        const ytMusic = ytdl(vidUrl , {filter:"audioonly"}).pipe(fs.createWriteStream(`C:/Users/clank/coding projects/tnbs-bot/discord/music/${music}.mp3`)).on("finish",()=>{
          client.channels.cache.get(channelId).send(`Playing ${vids.videos[0].title}`)
          console.log(channelId);
          connection.play(ytMusic.path);
        });
        console.log(ytMusic.path);
        
        // message.reply(`Playing ${vids.all}`);

      } catch (error) {
        console.log(error);
      }
}
module.exports = playCommand