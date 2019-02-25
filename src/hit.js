let store = [];

const logHit = function(){
  let time = new Date();
  store.push(time)
}
const getHits =() =>{
 let now = new Date();
 let target = now - 5;
 let latestHit=[];
 for(let i = store.length; i>=0; i--){
   if(store[i]<target){
     latestHit =  store.slice(i+1);
   }
   break;
 }
 store = latestHit;
 return store.length;
}
