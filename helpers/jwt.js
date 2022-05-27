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


const validateToken = ( token = '') => {

    try {

        const { uid }  = jwt.verify(token, process.env.JWT_KEY);

        if(uid){
            return [true,uid];
        }
        
    } catch (error) {
        
        return [false,error];
    }
    
}


module.exports = {
    generateToken,
    validateToken
}