module.exports = {
  description: "What is Aries AI?",
  async run({ api, send, admin }){
    await send({
      attachment: {
        type: "image",
        payload: {
          url: "https://i.imgur.com/gw1V46p.jpeg",
          is_reusable: true
        }
      }
    });
    setTimeout(async () => await send({
      attachment: {
        type: "template",
        payload: {
          template_type: "button",
          text: `🤖 𝐀𝐛𝐨𝐮𝐭 𝐀𝐫𝐢𝐞𝐬 𝐀𝐈:\nAries AI is your friendly and helpful personal assistant.\n\n💭 𝐖𝐡𝐲 𝐈 𝐜𝐡𝐨𝐬𝐞 𝐭𝐡𝐞 𝐧𝐚𝐦𝐞 "𝐀𝐫𝐢𝐞𝐬 𝐀𝐈" 𝐟𝐨𝐫 𝐭𝐡𝐞 𝐛𝐨𝐭:\nI named the bot '𝗔𝗿𝗶𝗲𝘀 𝗔𝗜' because it symbolizes new beginnings and energy, reflecting my mission to assist users with enthusiasm and a proactive approach.\n\n❓ 𝐈𝐟 𝐲𝐨𝐮 𝐞𝐧𝐜𝐨𝐮𝐧𝐭𝐞𝐫 𝐚𝐧𝐲 𝐢𝐬𝐬𝐮𝐞𝐬 𝐰𝐢𝐭𝐡 𝐭𝐡𝐞 𝐛𝐨𝐭, 𝐩𝐥𝐞𝐚𝐬𝐞 𝐜𝐨𝐧𝐭𝐚𝐜𝐭 𝐭𝐡𝐞 𝐚𝐝𝐦𝐢𝐧𝐬, 𝐚𝐧𝐝 𝐈 𝐰𝐢𝐥𝐥 𝐝𝐨 𝐦𝐲 𝐛𝐞𝐬𝐭 𝐭𝐨 𝐚𝐬𝐬𝐢𝐬𝐭 𝐲𝐨𝐮. 𝐓𝐡𝐚𝐧𝐤 𝐲𝐨𝐮 𝐟𝐨𝐫 𝐜𝐡𝐨𝐨𝐬𝐢𝐧𝐠 𝐦𝐞 𝐚𝐬 𝐲𝐨𝐮𝐫 𝐩𝐞𝐫𝐬𝐨𝐧𝐚𝐥 𝐚𝐬𝐬𝐢𝐬𝐭𝐚𝐧𝐭!`,
          buttons: [
            {
              type: "web_url",
              url: "https://www.facebook.com/profile.php?id=61567292543660",
              title: "Like/Follow our Page"
                },
            {
              type: "web_url",
              url: "https://www.facebook.com/marjhxn",
              title: "Contact Admin"
                },
            {
              type: "web_url",
              url: "",
              title: ""
                }
             ]
        }
      }
    }), 2*1000);
  }
}