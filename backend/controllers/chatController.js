const Chat = require('../models/chatModel')
const Message = require('../models/messageModel')

//start a new chat
const newChat = async (req, res) => {

    try {
        const senderId = req.body.senderId;
        const receiverId = req.body.receiverId;
    
        const existingChat = await Chat.findOne({
          $and: [
            { users: { $all: [senderId, receiverId] } },
            { users: { $size: 2 } },
          ],
        });
    
        if (!existingChat) {
          const newChat = new Chat({
            users: [senderId, receiverId],
          });
          existingChat = await newChat.save();
        }
    
        const newMessage = new Message({
          chatId: existingChat._id,
          senderId: senderId,
          text: req.body.text,
        });
    
        const savedMessage = await newMessage.save();
    
        res.status(200).json(savedMessage);
      } catch (err) {
        res.status(500).json(err);
      }

}

const getChat = async (req, res) => {
    try {
        //find the conversation of a particular user id.
        const conversation = await Chat.find({
            users: { $in: [req.params.userId] },
        });
        res.status(200).json(conversation);
    } catch (err) {
        res.status(500).json(err);
    }


}


module.exports = {
    newChat,
    getChat
}