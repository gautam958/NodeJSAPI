var Objectid=require('mongodb').ObjectID;

module.exports=function(app,db){

    app.get('/notes/:id' ,(req,res) => { 
        const URLid=req.params.id;
        const id={'_id':new Objectid(URLid)};
        var dbobject=db.db('nodeDB');
        dbobject.collection('notes').findOne(id,(err,item) =>{
            if(err){
                res.send({'error':'An error has occured'});
            } else{
                res.send(item);
            }
        }); 
    });
    app.delete('/notes/:id' ,(req,res) => { 
        const URLid=req.params.id;
        const id={'_id':new Objectid(URLid)};
        var dbobject=db.db('nodeDB');
        dbobject.collection('notes').remove(id,(err,item) =>{
            if(err){
                res.send({'error':'An error has occured'});
            } else{
                res.send('notes deleted! '+URLid);
            }
        }); 
    });

    app.put('/notes/:id' ,(req,res) => { 
        const URLid=req.params.id;
        const id={'_id':new Objectid(URLid)};
        const note={text:req.body.body,title:req.body.title};
        var dbobject=db.db('nodeDB');
        dbobject.collection('notes').update(id,note,(err,item) =>{
            if(err){
                res.send({'error':'An error has occured'});
            } else{
                res.send(item);
            }
        }); 
    });

    app.post('/notes',(req,res)=>{
       console.log(req.body);
        // res.send('Hello')
        //console.log(db);
        const note={text:req.body.body,title:req.body.title};
      
        var dbobject=db.db('nodeDB');
        dbobject.collection('notes').insert(note,(err,result)=>{
            if(err){
                res.send({'error':'An error has occured'});
            } else{
                res.send(result.ops[0]);
            }
        }) 
    } );
}