module.exports = {
  description: "See available commands",
  async run({ api, send, admin }) {
  const quick_replies = [];
  api.commands.forEach((name) => {
    quick_replies.push({
        content_type: "text",
        title: api.prefix + name,
        payload: name.toUpperCase()
    });
  });
    try {
    send({
      quick_replies,
      attachment: {
        type: "template",
        payload: {
          template_type: "button",
          text: `🤖 | Below are the available commands for Aries AI.
🔎 | Click on each command to view its usage.`,
          buttons: [
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
    });
    } catch(err){
     return send(err.message || err);
    }
  }
};