module.exports = {
  admin: true,
  description: "Reload commands. Admin access only.",
  async run({api,send,admin}){
    if (!admin) return send("Admin access only.");
    api.loadCommands();
    return send("Reload command successful. Please restart Messenger or the conversation for the changes to take effect.");
  }
}