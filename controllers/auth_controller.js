const { response } = require('express');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../helpers/jwt');


const createUser = async( req, res = response ) => {


    const { email, password } = req.body;

    try {

        const emailExist = await User.findOne({email});

        if(emailExist ){
            res.status(400).json({
                ok:false,        
                msg: 'Email exist'
            });
        }

        const user = new User(req.body);


        //Crypt password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        await user.save();


        //Generate JWT

        const token = await generateToken(user.id);

        res.json({
            ok:true,        
            user,
            token
        });
        
    } catch (error) {

        res.status(500).json({
            ok:false,           
            msg: error
        });
    }
    
    

};

const login = async( req, res = response ) =>{

    const { email, password } = req.body;

    try {

        const userDB = await User.findOne({ email });

        if( userDB ){


            //Validate password
            const validPassword = bcrypt.compareSync( password, userDB.password );

            if(validPassword){

                const token = await generateToken(userDB.id);

                res.json({
                    ok:true,        
                    msg:'Logged in',
                    userDB,
                    token
                });

            }else{

                res.json({
                    ok:false,        
                    msg:'Invalid credencials'
                });
            }

           

        }else{

            res.status(404).json({
                ok:false,        
                msg:'Email does not exist'
            });

        }

       
        
    } catch (error) {

        res.status(500).json({
            ok:false,           
            msg: error
        });
        
    }

   
} 


const renewToken = async( req, res = response ) =>{


    try {

        const uid = req.uid;

        const user = await User.findById( uid );

        if( user ){

            const token = await generateToken( user.id );

            res.json({
                ok:true,
                user,
                token
            });

        }else{

            res.status(404).json({
                ok:false,
                msg:'User not found'
            });
        }
        
    } catch (error) {
         
        res.status(500).json({
            ok:false,            
            msg:'Token validation error '+error
        });
    }

   
}


module.exports = {
    createUser,
    login,
    renewToken
}