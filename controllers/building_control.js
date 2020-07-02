const build = require('../models/buldings')
const admin = require('../models/admin')


function addBuilding(body,res){
    //console.log('BODY IN CONTROLE-----',body)
    admin.findOne({_id:body.adminID},(err,result)=>{
        if(err)
            res.json({Message:err});
        else{
            if(result==null)
                res.json({Message:'YOU ARE NOT THE ADMIN'})
            else{
                body.image = body.image.path
                var obj=new build(body);
                obj.save(function(err,data){
                    if(err)
                        res.json({Message:'ERROR in save'});
                    else
                        res.json({Message:'Added'});
                })
            }
        }
    })
}

function viewBuilding(body,res){
    build.findOne({},{skip:0},{limit:6},(err,data)=>{
        if(err)
            res.json({err})
        else{
            if(data==null)
                res.json({Message:'USER NOT FOUND..'})
            else{
                res.json({data})
            }
        }
    })
}

module.exports = {
    addBuilding,
    viewBuilding
}