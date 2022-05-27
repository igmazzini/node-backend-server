
const User = require('../models/user');

const getUsers = async( req, res = response ) =>{


    try {

        const from = Number(req.query.from) || 0;
        const to = Number(req.query.to) || 100;

        const users = await User.find({ _id: {$ne: req.uid }})
        .sort('-online')
        .skip(from)
        .limit(to);

        res.json({
            ok:true, 
            users,          
            msg:'All users',
            from,
            to
           
        });

       
        
    } catch (error) {
         
        res.status(500).json({
            ok:false,            
            msg:'Get users error '+error
        });
    }

   
}

module.exports = {
  getUsers
}