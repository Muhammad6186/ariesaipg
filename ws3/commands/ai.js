const axios = require("axios");
const name = "ai" ;

module.exports = {
  name,
  description: "Interact with ChatGPT-4o",
  async run ({ api, event, send, args }){
    const prompt = args.join(" ");
    if (!prompt) return send(`Please enter your question!

Example: ${api.prefix + name} What is AI?`);
    send("Please hold on while I process your request... 🔎");
    try {
    const gpt = await axios.get(`${api.api_josh}/api/gpt-4o`, {
      params: {
        q: prompt,
        uid: event.sender.id
      }
    });
    if (!gpt || !gpt.data.status)
    throw new Error();
    send(`${gpt.data.result}

🤖 Aries AI By: Marjhxn`);
    } catch(err){
      send(err.message || err);
      return;
    }
  }
}