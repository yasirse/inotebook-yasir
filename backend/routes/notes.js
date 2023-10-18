const express=require('express')
const Router=express.Router()

Router.get('/',(req,res)=>{
    obj={
        notes:'hello',
        id:34
    }
    res.json(obj);
})

module.exports=Router

