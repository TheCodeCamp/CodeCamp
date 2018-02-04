const mongoose = require('mongoose')     
const SolutionJson = require('./solution.json')

const SolutionSchema = new mongoose.Schema(SolutionJson);
//const Solution = mongoose.model('Solution',SolutionSchema)
SolutionSchema.statics.getObjcount =async function(username,code){
    var User = this;
    return new Promise((resolve,reject)=>{
        User.count({$and:[{username:username},{code:code}]},(err,count)=>{
            if(err){
                reject('can not get user')
            }
            console.log(count)
            resolve(count+1)
        })
    })
}

module.exports= mongoose.model('Solution',SolutionSchema)
