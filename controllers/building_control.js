const build = require('../models/buldings')
const admin = require('../models/admin')


function addBuilding(body,res){

    body.location=body.location.split(',')
    body.location[0]=parseFloat(body.location[0])
    body.location[1]=parseFloat(body.location[1])
    console.log('BODY IN CONTROLE-----',body)
    admin.findOne({_id:body.adminID},(err,result)=>{
        if(err)
            res.json({Message:err});
        else{
            if(result==null)
                res.json({Message:'YOU ARE NOT THE ADMIN'})
            else{
                body.image = body.image.path
                var obj=new build(body);
                console.log('OBJ IN SAVE----------',obj)
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
    build.aggregate(
        [
            { "$geoNear": {
                "near": {
                    "type": "Point",
                    "coordinates": [body.long,body.lat]
                },
                "spherical": true,
                "maxDistance": 10000
            }}
        ]
        
    ).limit(6)
    .skip(0)
    .exec((err,data)=>{
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

// function nearBuilding(body,res){
    
// }

module.exports = {
    addBuilding,
    viewBuilding,
    //nearBuilding
}