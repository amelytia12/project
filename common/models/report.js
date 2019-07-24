// Copyright IBM Corp. 2015,2016. All Rights Reserved.
// Node module: loopback-example-database
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

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
    }
};