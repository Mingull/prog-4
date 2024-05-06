import l from"dotenv";import d from"express";import{Router as i}from"express";var n={_data:[{id:0,firstName:"Hendrik",lastName:"van Dam",emailAddress:"hvd@server.nl"},{id:1,firstName:"Marieke",lastName:"Jansen",emailAddress:"m@server.nl"}],_index:2,getAll(e){setTimeout(()=>{e({err:null,data:this._data})},1500)},getById(e,s){setTimeout(()=>{e<0||e>=this._data.length?s({err:{message:`User with id '${e}' could not be found`},data:null}):s({err:null,data:this._data[e]})},1500)},add(e,s){setTimeout(()=>{let t=this._data.some(r=>r.emailAddress===e.emailAddress);if(console.log({emailExists:t}),t)s({err:{message:`User with email '${e.emailAddress}' already exists`},data:null});else{let r={id:this._index++,...e};this._data.push(r),s({err:null,data:r})}},1500)},update(e,s,t){setTimeout(()=>{if(e<0||e>=this._data.length||typeof e!="number")t({err:{message:"Invalid id provided. Id must be a number and must be within the range of the current users."},data:null});else{let r=this._data[e];if(!r)return t({err:{message:`User with id '${e}' could not be found`},data:null});console.log({user:r});let u={...r,...s};this._data[e]=u,t({err:null,data:u})}},1500)},delete(e,s){setTimeout(()=>{if(e<0||e>=this._data.length)s({err:{message:"Invalid id provided. Id must be a number and must be within the range of the current users."},data:null});else{let t=this._data[e];if(!t)return s({err:{message:`User with id '${e}' could not be found`},data:null});this._data=this._data.filter(r=>r.id!==e),this._index=this._data.length,s({err:null,data:t})}},1500)}};var a=i();a.get("/",async(e,s)=>{n.getAll(({data:t,err:r})=>{r?s.json({status:500,error:r}):s.json({status:200,result:t})})});a.post("/register",(e,s)=>{n.add(e.body,({data:t,err:r})=>{r?s.json({status:500,error:r}):s.json({status:200,result:t})})});a.get("/:userId",async(e,s)=>{n.getById(Number.parseInt(e.params.userId),({data:t,err:r})=>{t?s.json({status:200,result:{...t}}):s.json({status:404,error:r})})});a.put("/:userId",async(e,s)=>{n.update(Number.parseInt(e.params.userId),e.body,({data:t,err:r})=>{t?s.json({status:200,result:t}):s.json({status:404,error:r})})});a.delete("/:userId",async(e,s)=>{n.delete(Number.parseInt(e.params.userId),({data:t,err:r})=>{t?s.json({status:200,result:t}):s.json({status:404,error:r})})});l.config();var o=d();o.use(d.json());o.use(d.urlencoded({extended:!0}));o.get("/",(e,s)=>{s.json({status:200,result:"Hello World"})});o.use("/users",a);o.listen(process.env.PORT,()=>{console.log("Server is running on port "+process.env.PORT)});
