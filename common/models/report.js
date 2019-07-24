// Copyright IBM Corp. 2015,2016. All Rights Reserved.
// Node module: loopback-example-database
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
var app = require("../../server/server")
module.exports = function(Report) {
    Report.remoteMethod(
        'getNo',
        {
            description: 'get name like -> dindin',
            accepts:[
                {arg: 'number', type: 'string'}
            ],
            returns: {
                arg: 'number1', type: 'object', root: true
            },
            http: {path : '/getNo', verb: 'get'}
        }
    );
    
    Report.remoteMethod(
        'getNamePelanggan',
        {
            description: 'get name like -> dindin',
            accepts:[
                {arg: 'namaPelanggan', type: 'string'}
            ],
            returns: {
                arg: 'name', type: 'object', root: true
            },
            http: {path : '/getNamePelanggan', verb: 'get'}
        }


    );

    Report.remoteMethod(
        'getClientId',
        {
            description: 'get id like -> 1',
            accepts:[
                {arg: 'Id', type: 'string'}
            ],
            returns: {
                arg: 'id1', type: 'object', root: true
            },
            http: {path : '/getClientId', verb: 'get'}
        }


    );

    Report.getNo = function(number, callback){
        new Promise(function(resolve, reject){
            var filter = {
                where : {
                    no_transaksi : {
                        like : number
                    }
                }
            }
            Report.find(filter, function(err, result){
                if (err) reject (err)
                if (result === null){
                    err = new Error('Cannot find that number')
                    err.statusCode = 404
                    reject (err)
                }
                resolve (result)
            })
        }).then(function(number1){
            if (!number1) callback (err)
            return callback(null, number1)
        }).catch(function(err){
            callback (err)
        });
    },


    Report.getNamePelanggan = function(namaPelanggan, callback){
        new Promise(function(resolve, reject){
            var filter = {
                where : {
                    pelanggan : {
                        like : namaPelanggan
                    }
                }
            }
            Report.find(filter, function(err, result){
                if (err) reject (err)
                if (result === null){
                    err = new Error('Cannot find that number')
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
    },

    Report.getClientId = function(id, callback){
        new Promise(function(resolve, reject){
            var filter = {
                where : {
                    id : {
                        like : id
                    }
                }
            }
            Report.find(filter, function(err, result){
                if (err) reject (err)
                if (result === null){
                    err = new Error('Cannot find that number')
                    err.statusCode = 404
                    reject (err)
                }
                resolve (result)
            })
        }).then(function(id1){
            var clients = app.models.Clients
            var clientId = id1[0].id_client
            var filter = {
                where : {
                    id : clientId
                }
            }
            clients.find(filter, function(err, resclient){
                if (err) return (err)
				if (resclient === null) {
					err = new Error('Cannot find that name')
					err.statusCode = 404
					return(err)
                }
                
                id1[0].clients = resclient[0]
                return callback(null, id1)
            })
        }).catch(function(err){
            callback (err)
        });
    }
    
};