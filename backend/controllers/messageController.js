const Message = require('../models/messageModel')

const newMessage = async (req, res) => {

    const content = new Message(req.body);

    try {
      const savedMessage = await content.save();
      res.status(200).json(savedMessage);
    } catch (err) {
      res.status(500).json(err);
    }

}

const getMessage = async (req, res) => {
    try {
        const messages = await Message.find({
          chatId: req.params.chatId,
        });
        res.status(200).json(messages);
      } catch (err) {
        res.status(500).json(err);
      }
}

module.exports = {
    newMessage,
    getMessage
}