let store = {};

const logHit = function(){
  let time = new Date();
  let sec = round(time);
  if(store.sec){
    store[sec]++;
  }else{
    store[sec]=1;
  }
  //could prune here
}

const prune = () => {
  setInterval(() => {
    let now = new Date();
    let target = now - 5;
    for(let i in store){
      if(i<target){
       delete store[i];
      }
    }
  }, 5000);
}

const getHits =() =>{
 let now = new Date();
 let target = now - 5;
 let latestHitCount=0;
 for(let i in store){
   if(i<target){
    delete store[i];
   }else {
     latestHitCount += store[i];
   }
 }
 
 return latestHitCount;
}
