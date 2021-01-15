require("dotenv").config();
const { Client } = require("discord.js");

const tnbs = new Client();

const swearWords = ["gago", "tanga", "bobo", "pakyu", "TANGINAMO"];

tnbs.login(process.env.BOT_TOKEN);

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
tnbs.on("message", (message) => {
  const arjKnife = message.guild.emojis.cache.find(
    (arj) => arj.name === "arjknife"
  );

  if (message.author.bot) return;
  if (message.content === "shit") message.reply("cunt");
  //======================
  console.log(hasSwearWords(message.content));
  if (hasSwearWords(message.content) === true) {
    message.delete({timeout:5000,reason:"TT NOT ALLOWED"});
    message.reply(`HOY GAGO! YOU SAID "${getSwearWords(message.content)}"`);
  }
  if (message.content.includes("HAROLD")) {
    message.react(arjKnife);
    message.reply("MALAKI NOO");
  }
});

tnbs.on("presenceUpdate", (oldPresence, newPresence) => {
  const channel = newPresence.guild.channels;
  const shrek = newPresence.guild.emojis.cache.find(
    (shrk) => shrk.name === "Shreky"
  );

  if (oldPresence.activities != newPresence.activities) {
    // console.log(newPresence);
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
