const Message = require('../models/message');
const User = require('../models/user');


const userConnected = async( uid = '' ) => {

    try {

        const user  = await User.findById(uid);
        user.online = true;

        await user.save();

        return user;
        
    } catch (error) {
        console.log('Socket controller - userConnected : '+error);
    }
    
}
const userDisconnected = async( uid = '' ) => {

    try {

        const user  = await User.findById(uid);
        user.online = false;

        await user.save();

        return user;
        
    } catch (error) {

        console.log('Socket controller - userDisconnected: '+error);
    }
    
}


const saveMessage = async ( payload ) => {

    /*

        payload = {
            from:'dasdasd',
            to: 'dasdadasd',
            msg:'Hola'
        }
        
     */

    try {

        const msg = Message(payload);

        msg.save();

        return true;

    } catch (error) {

        console.log(error);

        return false;
    }
}


module.exports = {
    userConnected,
    userDisconnected,
    saveMessage
}