const expressJwt = require('express-jwt');

const api = process.env.API_URL;
function authJwt(){
    const secret = process.env.secret;
    return expressJwt({
        secret,
        algorithms: ['HS256']
    }).unless({
        path: [
            
                {url: `${api}/products`, methods: ['GET', 'OPTIONS'] },

                `${api}/users/login`,
                `${api}/users/register`
            
        ]
    })
}

module.exports = authJwt;