const jwt = require('jsonwebtoken');

const generateToken = ( uid ) => {


    return new Promise( (resolve, reject) => {

        const payload = { uid };

        jwt.sign(payload,process.env.JWT_KEY, {
            expiresIn:'12h'
        },(err, token) => {
            
            if(err){
                //No se puedo generar el token                
                reject('No se pudo generar el token: '+err);

            }else{

                resolve( token );
            }
        });
    });

    
};


module.exports = {
    generateToken
}