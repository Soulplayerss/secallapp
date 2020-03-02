import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

//创建一个vuex的数据仓库，用来存放所有需要交互的数据
//store：每一个vuex最核心的部分，数据仓库
var store = new Vuex.Store({
    //存放所有交互数据
    state:{
        goodsList:[]
    },
    //改变数据，是改变state的唯一方式
    mutations:{
        //函数
        //初始化商品数组
        initGoodsList(state,newArr){
            state.goodsList=newArr
        },
        //数量相加
        addNum(state,name){
            for(let obj of state.goodsList){
                for(let res of obj.foods){
                    if(res.name==name){
                        res.num+=1
                        // console.log(res.name,res.num)
                    }
                }
            }
        },
        //数量减少
        decNum(state,name){
            for(let obj of state.goodsList){
                for(let res of obj.foods){
                    if(res.name==name){
                        res.num-=1
                        if(res.num<=0){
                            res.num=0
                        }
                    }
                }
            }
        }
    },

    //vuex版的计算属性
    getters:{
        //过滤增加的商品
        getGoods(state){
            var goodsObj=[];  //定义数组保存过滤后得值
            for(let obj of state.goodsList){
                obj.foods.filter(res=>{
                    if(res.num!=0){
                        goodsObj.push(res);
                    }
                })
            }
            
            //去重
            for(var i=0;i<goodsObj.length;i++){
                //定义一个变量保存当前的对象
                var item=goodsObj[i]
                //再次遍历数组
                //定义一个变量j，j是i的后一位
                for(var j=i+1;j<goodsObj.length;j++){
                    //判断前一项和后一项的名字是否相等，如果相等goodsObj就删除后一个相同的对象
                    if(item.name==goodsObj[j].name){
                        goodsObj.splice(j,1)
                        i--
                    }
                }
            }
            return goodsObj
        }
    }
})


export default store

//mutation函数必须手动调用
//参数一：要出发的mutation函数名，参数二：要出入的参数
// store.commit('','')