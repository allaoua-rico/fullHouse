export default function basketSorter(basket){
    basket.sort(function(a, b){
        let x = a.title.toLowerCase();
        let y = b.title.toLowerCase();
        if (x < y) {return -1;}
        if (x > y) {return 1;}
        return 0;
      })
    //   console.log(basket);
      
      let count=0;
      let currentItem=basket[0]?.title;
      let counter;
      let slicedArray=[]
      if(currentItem){
        basket.map((item,index)=>{
          //add 1 until a different title is matched
          item.title===currentItem && count++;
    
    
          if(item.title!==currentItem){
             counter=JSON.parse(JSON.stringify(count));
             count=1;
             currentItem=item.title;
             slicedArray.push({...basket[index-1],counter})
          }
        //handle the last item
        index==basket.length-1 && slicedArray.push({...item,counter:count})
        })
      }
    return slicedArray;
} 