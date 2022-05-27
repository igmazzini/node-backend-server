const { userConnected, userDisconnected, saveMessage } = require('../controllers/socket_controller');
const { validateToken } = require('../helpers/jwt');
const { io } = require('../index');


// Mensajes de Sockets
io.on('connection', client => {

     

    const token = client.handshake.headers['x-token'];


    const [valid, uid ] = validateToken(token);

    if(valid){

        console.log('Cliente conectado');  
        userConnected(uid);
        
        //Channes
        //Global channel: io, Client.id, UID

        client.join( uid );

        client.on('user-message', async ( payload ) => {
            console.log('Mensaje', payload);

           await saveMessage(payload);
    
           io.to( payload.to ).emit('user-message',payload);
    
        });

    }else{
       
        console.log('Cliente rechazado');
        return client.disconnect();
    }



    client.on('disconnect', () => {
        userDisconnected(uid);
        console.log('Cliente desconectado');
    });

  


});
