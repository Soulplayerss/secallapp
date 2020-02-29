<template>
    <div class="goodsList">
        <div class="goodsList-left">
            <ul class="content">
                <div @click="clickLeftList(i)" :class="{selected:curSelected==i}" v-for="(v,i) in data" :key="i">
                    <img v-show="v.type==1" src="../assets/imgs/decrease_1@2x.png" alt="" width="14px">
                    <img v-show="v.type==2" src="../assets/imgs/discount_1@2x.png" alt="" width="14px">                
                    {{v.name}}
                </div>
            </ul>
        </div>
        <div class="goodsList-right">
           <ul class="content">
                <div v-for="(v,i) in data" :key="i">
                    <div class="title" :id="i">{{v.name}}</div>
                    <div class="info" v-for="(x,z) in v.foods" :key="z">
                        <div class="info-content">
                            <img :src="x.image" alt="">
                            <div class="goodsInfo">
                                <h5>{{x.name}}</h5>
                                <p  v-if="x.description!=''">{{x.description}}</p>
                                <p>月售{{x.sellCount}}份&emsp;好评率{{x.rating}}%</p>
                                <p>￥{{x.price}}&emsp;<span v-show="x.oldPrice!=''">￥{{x.oldPrice}}</span></p>
                                <div>
                                    <button v-show="x.num==0 ? 'disabled' : ''" @click="Reduction(z)">-</button>
                                    &emsp;{{x.num}}&emsp;<button @click="Reduction(z)">+</button>                                
                                </div>
                            </div>
                        </div>
                    </div>               
                </div>
           </ul>
        </div>
    </div>
</template>

<script>
import { goodsInfo } from '../api/apis.js'
import BScroll from 'better-scroll'

    export default {
        data(){
            return{
                data:[],
                curSelected:0
            }
        },
        created(){
            //发送请求商家信息
            goodsInfo().then(res=>{
                // console.log(res.data)
                this.data=res.data.data;
                console.log(this.data)
            })
        },
        methods:{
            Reduction(){
                console.log(111)
            },
            clickLeftList(index){
                // console.log(111)
                this.curSelected=index;
                this.rightDiv.scrollToElement(document.getElementById(index),600)
            }
        },
        mounted(){
            new BScroll(document.querySelector(".goodsList-left"),{click:true})
            this.rightDiv=new BScroll(document.querySelector(".goodsList-right"))
        }
    }
</script>

<style lang="less" scoped>
    .goodsList{
        height: 67vh;
        display: flex;
        justify-content: space-around;
        padding-bottom: 20px;
        .goodsList-left{
            height: 100%;
            width: 92px;
            overflow: auto;
            background-color: #f4f5f7;
            div{
                padding: 0 5px;
                height: 50px;
                font-size: 14px;
                text-align: center;
                border-bottom: solid 1px #e0e1e3;
                border-right: solid 2px #d9dce1;
                display: flex;
                justify-content: center;
                align-items: center;
                img{
                    margin-top: -20px;
                }
            }
            .selected{
                background-color: #fff;
                border-right: solid 2px #fff;
            }
        }
        .goodsList-right{
            height: 100%;
            overflow: auto;
            flex: 1;
            .title{
                padding: 0 20px;
                background-color: #f4f5f7;
                height: 30px;
                line-height: 30px;
                font-size: 14px;
            }
            .info{
                padding: 20px 20px 0 20px;
                font-size: 12px;
                .info-content{
                    padding-bottom: 20px;
                    border-bottom: solid 1px #ccc;
                    display: flex;
                    justify-content: flex-start;
                    img{
                        width: 60px;
                        height: 60px;
                        margin-right: 10px;
                    }
                    .goodsInfo{
                        flex: 1;
                        position: relative;
                        p{
                            width: 100%;
                            height: 18px;
                            color: #93989c;
                            overflow: hidden;
                            span{
                                text-decoration: line-through;
                                font-size: 12px;
                                color: #93989c
                            }
                        }
                        p:nth-child(4){
                            color: #ff6600;
                            font-size: 14px;
                        }
                        div{
                            width: 60px;
                            height: 20px;
                            position: absolute;
                            right: 0px;
                            bottom: -5px;
                            button{
                                width: 20px;
                                height: 20px;
                                border-radius: 50%;
                                text-align: center;
                                line-height: 20px;
                                font-size: 16px;
                                color: white;
                                border: none;
                                padding: 0;
                                background-color: #00a0dc;
                            }
                        }
                    }
                }
            }
        }
    }
</style>