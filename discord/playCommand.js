const yts = require("yt-search");
const ytdl = require("ytdl-core");
const fs = require("fs");
const { Client, Message, Channel, VoiceChannel } = require("discord.js");

const songQueue = [];
/**
 * @param {VoiceChannel} channel
 * @param {Client} client
 * @param {Message} message
 */
async function playCommand(channel,message,client){
  const music = message.content.split(" ").slice(1).join(" ");
  const channelId = message.channel.id;
  if(music === "undefined") return message.reply(`Please add title you stupid shit`);
  songQueue.push(music)
  try {
    const connection = await channel.join();
    const vids = await yts(music);
    const vidUrl = vids.videos[0].url;
    const ytMusic = ytdl(vidUrl , {filter:"audioonly"}).pipe(fs.createWriteStream(`C:/Users/clank/coding projects/tnbs-bot/discord/music/${music}.mp3`)).on("finish",()=>{
      client.channels.cache.get(channelId).send(`Playing ${vids.videos[0].title}`)
      console.log(channelId);
      connection.play(ytMusic.path).on("finish",()=>{
    
      });
    });
  } catch (error) {
        console.log(error);
      }
}



class Play {

  /**
   * @param {Client} client
   * 
  */
  songs = []
  constructor(client){
    /**
     * @type {Client}
     */
    this.client = client;
  }
  /**
   * @param {VoiceChannel} channel
   * 
   * @param {Message} message
   * 
   */
  async playCommand(message,channel){

    const music = message.content.split(" ").slice(1).join(" ");
    this.channelId = message.channel.id;
    if(music === "undefined") return message.reply(`Please add title you stupid shit`);
    this.songs.push(music)
    if(this.songs.length === 1){
      this.client.channels.cache.get(this.channelId).send(`Downloading .... ${this.songs[0]}`)
      this.songPlayer();
    }
    if(this.songs.length >1){
      this.client.channels.cache.get(this.channelId).send(`Song Queue: \n ${this.songs.slice(1)}`)
    }
    this.connection = await channel.join();
  }

  songPlayer = async () => {
    if(this.songs.length !==0){
      const music = this.songs[0]
      const vids = await yts(music);
      const vidUrl = vids.videos[0].url;
      const ytMusic = ytdl(vidUrl , {filter:"audioonly"}).pipe(fs.createWriteStream(`C:/Users/clank/coding projects/tnbs-bot/discord/music/${music}.mp3`)).on("finish",()=>{
        this.client.channels.cache.get(this.channelId).send(`Playing ${vids.videos[0].title}`)
        console.log(this.channelId);
        this.connection.play(ytMusic.path).on("finish",()=>{
          this.songs.shift();
          if(this.songs.length !=0){
            this.songPlayer();
          }
        });
      });
    }
  }
  /**
   * 
   * @param {string} author 
   */
  skipSong(author){
    this.client.channels.cache.get(this.channelId).send(`${this.songs[0]} is skipped by ${author}`)

    this.songs.shift();
    this.songPlayer();
  }
}
module.exports = Play