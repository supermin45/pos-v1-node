
const datbase = require('../main/datbase.js');
var loadAllItems = datbase.loadAllItems() ;
var loadPromotions = datbase.loadPromotions() ;
module.exports = function  printInventory(inputs) {
      	let allItems = [];
        let promotions = [];
        allItems = loadAllItems;
        promotions = loadPromotions;

        let goodsInfo = [];
        goodsInfo = baseInformation(inputs, allItems);

        let promotion = [];
        promotion =  get_promotion(goodsInfo, promotions);

        goodsInfo = add_1(goodsInfo, promotion);
        
        let subtotal = [];
        subtotal = calculate_1(goodsInfo);

        let payMent = [];
        payMent = calculate_2(goodsInfo);

        console.log('***<没钱赚商店>购物清单***\n'+
        '名称：'+goodsInfo[0].name+'，'+'数量：'+goodsInfo[0].count+goodsInfo[0].unit+'，'+'单价：'+goodsInfo[0].price+'(元)'+'，'+'小计：'+subtotal[0]+'(元)\n'+
         '名称：'+goodsInfo[1].name+'，'+'数量：'+goodsInfo[1].count+goodsInfo[1].unit+'，'+'单价：'+goodsInfo[1].price+'(元)'+'，'+'小计：'+subtotal[1]+'(元)\n'+
         '名称：'+goodsInfo[2].name+'，'+'数量：'+goodsInfo[2].count+goodsInfo[2].unit+'，'+'单价：'+goodsInfo[2].price+'(元)'+'，'+'小计：'+subtotal[2]+'(元)\n'+
         '----------------------\n'+
         '挥泪赠送商品：\n'+
         '名称：'+promotion[0].name+'，'+'数量：'+promotion[0].count+promotion[0].unit+'\n'+
         '名称：'+promotion[1].name+'，'+'数量：'+promotion[1].count+promotion[1].unit+'\n'+
         '----------------------\n'+
         '总计：'+payMent[0]+'(元)\n'+
         '节省：'+payMent[1]+'(元)\n'+
         '**********************'
        );


      };
      
     
      function baseInformation(inputs, allItems) {
        
        let num = 1;
        let barcode = [];
        let count = [];
        for (let i = 0; i < inputs.length; i++) {
      	   for (let j = i + 1; j < inputs.length; j++) {
      	   	if (inputs[i] === inputs[j]) {
      	   		num++;
      	   		inputs.splice(j, 1);
      	   		j--;
      	   	}
      	   }
      	   barcode[i] = inputs[i];
           count[i] = num;
           num = 1;
        }

        let goodsInfo = [];
        for (let i = 0; i < barcode.length; i++) {
        	goodsInfo[i] = {barcode: ' ',name: ' ', unit: ' ', price: 0, count: 0, saveCount: 0};
        	goodsInfo[i].barcode =  barcode[i];
        	goodsInfo[i].count = count[i];
        }
        let c = [];
        for (let i in goodsInfo) {
            if(goodsInfo[i].barcode.indexOf('-') > -1) {
            		
                c = goodsInfo[i].barcode.split('-');
            	goodsInfo[i].barcode = c[0];
                goodsInfo[i].count = c[1];
            }
        }
        
        for (let i = 0; i <allItems.length; i++) {
        	for (let j = 0; j < goodsInfo.length; j++) {
                if (goodsInfo[j].barcode === allItems[i].barcode) {
                	
                	goodsInfo[j].unit = allItems[i].unit;
                	let p = allItems[i].price;
                	goodsInfo[j].price = p.toFixed(2);
                	goodsInfo[j].name = allItems[i].name;
                }
        	}
        }
        return goodsInfo;
      }
      

      
      function get_promotion(goodsInfo, promotions) {
        let promotion = [];
        let pro = [];
        pro =  promotions[0].barcodes;
        for (let i = 0; i < goodsInfo.length; i++) {
         	for (let j = 0; j < pro.length; j++) {
         		if (goodsInfo[i].barcode === pro[j]) {
         		   promotion[i] = {name: ' ', count: 0, unit: ' '};
                   promotion[i].name = goodsInfo[i].name;
                   promotion[i].unit = goodsInfo[i].unit;
                   promotion[i].count = 1;
         		}
         	}
        }
        promotion.splice(1, 1);
        return promotion;
      }
      function add_1(goodsInfo, promotion) {
      	for (let i = 0; i < goodsInfo.length; i++) {
      		for (let j = 0; j < promotion.length; j++) {
      			if (goodsInfo[i].name === promotion[j].name) {
      				goodsInfo[i].saveCount = 1;
      			}
      		}
      	}
      	return goodsInfo;
      }

      
      function calculate_1(goodsInfo) {
      	let subtotal = [];
      	for (let i = 0; i < goodsInfo.length; i++) {
      		let p1 = goodsInfo[i].price * goodsInfo[i].count;
            let p2 = goodsInfo[i].price * goodsInfo[i].saveCount;
            let p = p1 - p2;
            subtotal.push(p.toFixed(2));
      	}
        
        return subtotal;
      }
    
      function calculate_2(goodsInfo) {
      	let total = 0;
      	let save = 0;
      	for (let i = 0; i < goodsInfo.length; i++) {
           let k = goodsInfo[i].count * goodsInfo[i].price - goodsInfo[i].saveCount * goodsInfo[i].price;
           total += k;
           let m = goodsInfo[i].price * goodsInfo[i].saveCount;
           save += m;
      	}
      	let payMent = [];
      	payMent.push(total.toFixed(2));
      	payMent.push(save.toFixed(2));
      	return payMent;
      }