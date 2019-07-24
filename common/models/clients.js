// Copyright IBM Corp. 2015,2016. All Rights Reserved.
// Node module: loopback-example-database
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

module.exports = function(Clients) {
    Clients.remoteMethod(
        'getNamePer',
        {
            description: 'get namePerusahaan like -> olaho',
            accepts:[
                {arg: 'namePerusahaan', type: 'string'}
            ],
            returns: {
                arg: 'namePer1', type: 'object', root: true
            },
            http: {path : '/getNamePer', verb: 'get'}
        }
    );

    Clients.getNamePer = function(namePerusahaan, callback){
        new Promise(function(resolve, reject){
            var filter = {
                where : {
                    nama_perusahaan : {
                        like : namePerusahaan
                    }
                }
            }
            Clients.find(filter, function(err, result){
                if (err) reject (err)
                if (result === null){
                    err = new Error('Cannot find that namePerusahaan')
                    err.statusCode = 404
                    reject (err)
                }
                resolve (result)
            })
        }).then(function(namePer1){
            if (!namePer1) callback (err)
            return callback(null, namePer1)
        }).catch(function(err){
            callback (err)
        });
    }
};