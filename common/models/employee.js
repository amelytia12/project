// Copyright IBM Corp. 2015,2016. All Rights Reserved.
// Node module: loopback-example-database
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

module.exports = function(Employee) {
    Employee.remoteMethod(
        'getEmail',
        {
            description: 'get name like -> dindin',
            accepts:[
                {arg: 'email', type: 'string'}
            ],
            returns: {
                arg: 'email1', type: 'object', root: true
            },
            http: {path : '/getEmail', verb: 'get'}
        },

        'getName',
        {
            description: 'get name like -> dindin',
            accepts:[
                {arg: 'lastName', type: 'string'}
            ],
            returns: {
                arg: 'name', type: 'object', root: true
            },
            http: {path : '/getName', verb: 'get'}
        }


    );

    Employee.getEmail = function(email, callback){
        new Promise(function(resolve, reject){
            var filter = {
                where : {
                    email_addres : {
                        like : email
                    }
                }
            }
            Employee.find(filter, function(err, result){
                if (err) reject (err)
                if (result === null){
                    err = new Error('Cannot find that email')
                    err.statusCode = 404
                    reject (err)
                }
                resolve (result)
            })
        }).then(function(email1){
            if (!email1) callback (err)
            return callback(null, email1)
        }).catch(function(err){
            callback (err)
        });
    },

    Employee.getName = function(lastName, callback){
        new Promise(function(resolve, reject){
            var filter = {
                where : {
                    last_name : {
                        like : lastName
                    }
                }
            }
            Employee.find(filter, function(err, result){
                if (err) reject (err)
                if (result === null){
                    err = new Error('Cannot find that email')
                    err.statusCode = 404
                    reject (err)
                }
                resolve (result)
            })
        }).then(function(name){
            if (!name) callback (err)
            return callback(null, name)
        }).catch(function(err){
            callback (err)
        });
    }
};
