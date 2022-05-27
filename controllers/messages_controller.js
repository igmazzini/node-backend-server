
const Message = require('../models/message');

const getMessages = async( req, res = response ) =>{


    try {

        
        const uid = req.uid;
        const to = req.params.to;

        const messages = await Message.find({ 
            $or: [{from: uid, to:to}, {from:to, to:uid}]
        
        }).limit(30).sort({createdAt:'desc'});       
       

        res.json({
            ok:true, 
            messages,     
            msg:'All messages',   
            uid,
            to        
           
           
        });

       
        
    } catch (error) {
         
        res.status(500).json({
            ok:false,            
            msg:'Get messages error '+error
        });
    }

   
}

module.exports = {
  getMessages
}