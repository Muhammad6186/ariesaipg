const api = require('./api');
const prefix = api.prefix;

const getStarted = async (send) => send({
    attachment: {
      type: "template",
      payload: {
        template_type: "button",
        text: api.introduction,
        buttons: [
          {
            type: "postback",
            title: "Commands",
            payload: "HELP"
          },
          {
            type: "postback",
            title: "About",
            payload: "ABOUT"
          },
          {
            type: "postback",
            title: "Prefix",
            payload: "PREFIX"
          }
        ]
      }
}});
const listenMessage = async (event, pageAccessToken) => {
  const senderID = event.sender.id;
  const message = event.message.text;
  if (!senderID || !message) return;
  const send = async text => api.sendMessage(senderID, typeof text === "object" ? text : {text}, pageAccessToken),
  [command, ...args] = (message || "")
    .trim()
    .toLowerCase()
    .startsWith(prefix.toLowerCase()) ?
    (message || "")
    .trim()
    .substring(prefix.length)
    .trim()
    .split(/\s+/)
    .map(arg => arg.trim()) : [],
    admin = api.admin.some(id => id === senderID);
    switch (message.toLowerCase().trim()) {
    case "prefix": {
      return send(`Greetings! My designated command prefix is ${prefix} for any interactions.`);
    }
    default: {
      if (!message) return;
      if (["hi", "aries", "ariesai", "aries", "get started"]
        .some(text => text === message.toLowerCase().trim())) {
         return getStarted(send);
      }
      //command
      if (message.toLowerCase().startsWith(prefix)) {
        if (api.commands.some(cmd => cmd === command)) {
          const commandJs = require(api.cmdLoc + `/${command}`);
          if (commandJs.admin && !admin){
          return send({
              text: `⚠️ The command ${command} is restricted to admins only. Please type or click ${prefix}help below to view the available commands.`,
              quick_replies: [
                {
                  content_type: "text",
                  title: "-help",
                  payload: "HELP"
                }
              ]
            });
          }
          await (commandJs.run || (() => {}))({
              api,
              event,
              send,
              admin,
              args
          });
        } else {
          return send({
            text: `⚠️ The command${command ? ` ${command} ` : " "}does not exist. Please type or click (below) ${prefix}help below to view the available commands.`,
            quick_replies: [
              {
                content_type: "text",
                title: "-help",
                payload: "HELP"
                //"image_url": "http://example.com/img/red.png"
              }
           ]
          });
        }
      } else return;
    }
  }
}

const listenPostback = async (event, pageAccessToken) => {
  const send = async text => api.sendMessage(senderID, typeof text === "object" ? text : {text}, pageAccessToken),
  senderID = event.sender.id, postbackPayload = event.postback.payload,
  payload = postbackPayload.toLowerCase().trim();
  if (!senderID || !payload) return;
  switch (payload) {
    case "get_started": {
      return getStarted(send);
    }
    case "prefix": {
      return send(`Greetings! My command prefix is ${prefix}. Feel free to use it for any interactions.`);
    }
    default: {
      const admin = api.admin.some(id => id === senderID);
      if (payload) {
      if (api.commands.some(cmd => cmd === payload)) {
          const commandJs = require(api.cmdLoc + `-${payload}`);
          if (commandJs.admin && !admin) return send("This command is restricted to admins only.");
          await (commandJs.run || (() => {}))({
          api,
          event,
          send,
          admin
        });
      }
      } else return;
    }
  }
}

module.exports = async (event, pageAccessToken) => {
  if (event.message) listenMessage(event, pageAccessToken);
  else if (event.postback) listenPostback(event, pageAccessToken);
};