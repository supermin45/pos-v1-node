
const datbase = require('../main/datbase.js');
var loadAllItems = datbase.loadAllItems() ;
var loadPromotions = datbase.loadPromotions() ;
   module.exports =  function  printInventory(inputs){
       
      let allItems = [];
    let promotions = [];
    
    allItems = loadAllItems;
    promotions = loadPromotions;
    
    
    let count = 1;
    let item = [];
    let xiaoji = [];
    //获取商品购买个数
    for (var i=0; i<inputs.length; i++) {
            	for (var j=i+1; j<inputs.length; j++) {
            		if (inputs[i] === inputs[j]) {
            			count++;
                        inputs.splice(j,1);
                        j--;
            		}
            	}
            	item[i] = inputs[i];
            	xiaoji[i] = count;
            	count = 1;
            }
            var total = new Array();
            for (var i=0; i<item.length; i++) {
            	total[i] = {item:' ', xiaoji:0};
            	total[i].item = item[i];
            	total[i].xiaoji = xiaoji[i];
            }
            let c = [];
            for (let i in total) {
            	if(total[i].item.indexOf('-') > -1) {
            		
            		c = total[i].item.split('-');
            		total[i].item = c[0];
                    total[i].xiaoji = c[1];
            	}
            }
    

    
   
    
    //商品信息
    let total2 = [];
    for (let i in total) {
    	total2[i] = {item:' ', count: 0, price: 0,save: 0,unit: ' ',name:''};
    	total2[i].item = total[i].item;
    	total2[i].count = total[i].xiaoji;
    }

    for (let i in allItems) {
    	for (let j in total2) {
    		if (allItems[i].barcode === total2[j].item) {
    			
    			let f = allItems[i].price;
    			total2[j].price = f.toFixed(2);
    			total2[j].unit = allItems[i].unit;
    			total2[j].name = allItems[i].name;
    		}
    	}
    }
    //挥泪赠送商品
    let e = [];
    let promote = [];
    e = promotions[0].barcodes;
    for (let i in total2) {
    	for (let j in e) {
    		if (total2[i].item === e[j]) {
    			total2[i].save = 1;
    			promote[i] = {name:' ', count1: 0,unit:' '};
        promote[i].name = total2[i].name;
        promote[i].unit = total2[i].unit;
    		}
    	}
    	
    	promote[i] = {name:' ', count1: 0,unit:' '};
    	promote[i].name = total2[i].name;
    	promote[i].unit = total2[i].unit;
    }
    promote.splice(1,1);
    for (let i in total2) {
    	for (let j in promote) {
    		if (total2[i].name === promote[j].name) {
    			promote[j].count1 = total2[i].save;
    			
    		}
    	}
    }
    //小计
    let little = [];
    for (let i in total2) {
        let p1 = total2[i].price * total2[i].count;
        let p2 = total2[i].price * total2[i].save;
        let p = p1 - p2;
        little.push(p.toFixed(2));
    }
//总计和节省
    let buy1 = 0;
    let buy2 = 0;
    for (let i in total2) {
        let k = total2[i].count * total2[i].price - total2[i].save * total2[i].price;
        buy1 += k;

        let m = total2[i].price * total2[i].save;
        buy2 += m;
     }
     let buy = [];
     buy.push(buy1.toFixed(2));
     buy.push(buy2.toFixed(2));
     
   //输出结果 
    console.log('***<没钱赚商店>购物清单***\n'+
        '名称：'+total2[0].name+'，'+'数量：'+total2[0].count+total2[0].unit+'，'+'单价：'+total2[0].price+'(元)'+'，'+'小计：'+little[0]+'(元)\n'+
         '名称：'+total2[1].name+'，'+'数量：'+total2[1].count+total2[1].unit+'，'+'单价：'+total2[1].price+'(元)'+'，'+'小计：'+little[1]+'(元)\n'+
         '名称：'+total2[2].name+'，'+'数量：'+total2[2].count+total2[2].unit+'，'+'单价：'+total2[2].price+'(元)'+'，'+'小计：'+little[2]+'(元)\n'+
         '----------------------\n'+
         '挥泪赠送商品：\n'+
         '名称：'+promote[0].name+'，'+'数量：'+promote[0].count1+promote[0].unit+'\n'+
         '名称：'+promote[1].name+'，'+'数量：'+promote[1].count1+promote[1].unit+'\n'+
         '----------------------\n'+
         '总计：'+buy[0]+'(元)\n'+
         '节省：'+buy[1]+'(元)\n'+
         '**********************'
        );
   };

