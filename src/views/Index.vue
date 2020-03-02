<template>
    <div class="index">
        <div class="merchantsInfo" :style="{backgroundImage:'url('+data.avatar+')'}">
            <div class="infoContent">
                <img :src="data.avatar" alt="" width="60px" height="60px">
                <div class="info-right">
                    <h3><img src="../assets/imgs/brand@2x.png" alt="" height="20px;">{{data.name}}</h3>
                    <p>{{data.description}} / {{data.deliveryTime}}分钟送达</p>
                    <p><img src="../assets/imgs/decrease_1@2x.png" alt="" width="14px" height="14px">在线支付满{{data.minPrice}}减{{data.deliveryPrice}}</p>
                </div>
            </div>
            <div class="bulletin">
                <img src="../assets/imgs/bulletin@2x.png" alt="" height="20px"><span @click="showdiv">{{data.bulletin}}</span>
            </div>
        </div>
        <div class="nav">
            <Menu mode="horizontal" active-name="1">
                <MenuItem name="1"><router-link to="/">商品</router-link></MenuItem>
                <MenuItem name="2"><router-link to="/merchants">商家</router-link></MenuItem>
                <MenuItem name="4"><router-link to="/evaluation">评价</router-link></MenuItem>
            </Menu>
        </div>

        <router-view></router-view>

        <!-- 站位盒子 -->
        <div class="box"></div>

        <!-- 购物车板子 -->
        <transition name="slide-fade">
            <div class="shopcar-barde" v-show="shopCarShow">
                <ul class="content">
                    <div class="info" v-for="item in shopCarGoods" :key="item.id">
                        <div class="info-content">
                            <img :src="item.image" alt="">
                            <div class="goodsInfo">
                                <h5>{{item.name}}</h5>
                                <p  v-if="item.description!=''">{{item.description}}</p>
                                <p>月售{{item.sellCount}}份&emsp;好评率{{item.rating}}%</p>
                                <p class="price">￥{{item.price*item.num}}&emsp;</p>
                                <div>
                                    <button @click="clickDecNum(item.name)">-</button>
                                    &emsp;{{item.num}}&emsp;<button @click="clickAddNum(item.name)">+</button>                                
                                </div>
                            </div>
                        </div>
                    </div>
                </ul>
            </div>
        </transition>
        <!-- 购物车 -->
        <div class="shopcar-div">
            <div class="icon" @click=" shopCarShow = !shopCarShow"><Icon type="md-cart" /></div>
            <div class="total-price">￥<span>{{totalPrice}}</span></div>
            <div class="distribution-price">另需配送费￥<span>{{data.deliveryPrice}}</span>元</div>
            <div class="mini-price">￥<span>{{data.minPrice}}</span>起送</div>
        </div>

        <!-- 商家公告 -->
        <div class="announcement" v-show="this.floag">
            <h3>{{data.name}}</h3>
            <p><Rate allow-half v-model="data.serviceScore" /></p>
            <Divider>优惠信息</Divider>
            <p v-for="(v,i) in data.supports" :key="i"><img src="../assets/imgs/decrease_1@2x.png" alt="" width="14px" height="14px">{{v.description}}</p>
            <Divider>商家公告</Divider>
            <p>{{data.bulletin}}</p>
            <p @click="hinddiv"><Icon type="md-close"/></p>
        </div>
    </div>
</template>

<script>

import { merchantsInfo,goodsInfo } from '../api/apis.js';
import BScroll from 'better-scroll'
    export default {
        data(){
            return{
                data:{},
                floag:false,
                shopCarShow:false,
            }
        },
        created(){
            //发送请求商家信息
            merchantsInfo().then(res=>{
                this.data=res.data.data;
            });
             //发送请求商品信息
            goodsInfo().then(res=>{
                this.$store.commit('initGoodsList',res.data.data);
            });
        },
        mounted(){
            new BScroll(document.querySelector(".shopcar-barde"),{click:true})
        },
        computed:{
            //拿到num发生改变的数据
            shopCarGoods(){
                return this.$store.getters.getGoods;
            },
            //计算总价
            totalPrice(){
                var totalprice=0;             
                for(let obj of this.$store.getters.getGoods){
                    totalprice+=obj.price*obj.num
                }
                return totalprice
            }
        },
        methods:{
            //展示公告页面
            showdiv(){
                this.floag=true;
            },
            //关闭公告页面
            hinddiv(){
                // console.log(1111)
                this.floag=false;
            },
            //减少数量
            clickDecNum(name){
                console.log(name)
                this.$store.commit('decNum',name)
            },
            //数量增加
            clickAddNum(name){
                this.$store.commit('addNum',name)
            },
            
        }
    }
</script>

<style lang="less" scoped>
    body,html,.index{
        height: 100%;
    }
    .index{
        .merchantsInfo{
            width:100%;
            height: 130px;
            color: white;
            .infoContent{
                background-color: rgba(0, 0, 0, 0.5);
                padding: 20px 15px;
                display: flex;
                justify-content: flex-start;
                img{
                    margin-right: 10px;
                }
                .info-right{
                    h3{
                        img{
                            margin-right: 5px;
                        }
                        line-height: 20px;
                        font-size: 18px;
                        display: flex;
                        justify-content: flex-start                 
                    }
                    p{
                        line-height: 24px;
                        color: #edecea;
                        display: flex;
                        justify-content: flex-start  
                    }
                    p:nth-child(3){
                        line-height: 16px;
                        font-size: 12px;
                        img{
                            margin-right: 5px;
                        }
                    }      
                }
            }
            .bulletin{
                height: 30px;
                width: 100%;
                line-height: 20px;
                font-size: 12px;
                background-color: rgba(0, 0, 0, 0.7);
                padding: 5px 15px;
                display: flex;
                justify-content: flex-start;
                img{
                    margin-right: 5px;
                }  
                span{
                    flex: 1;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                }
            }
        }
        .nav{
            height: 40px;
            line-height: 40px;
            border-bottom: solid 1px #dcdee2cc;
            a{
                color: #333;
            }
            .ivu-menu-horizontal{
                width: 100%;
                height: 40px;
                line-height: 40px;
                display: flex;
                justify-content: space-around;
            }
        }
        .shopcar-div{
            height: 50px;
            width: 100%;
            position: fixed;
            left: 0;
            bottom: 0;
            background-color: #141c27;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            .icon{
                height: 55px;
                width: 55px;
                border-radius: 50%;
                border: solid 5px #141c27;
                background-color: #2b343d;
                position: absolute;
                top: -10px;
                left: 10px;
                font-size: 30px;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            .total-price{
                box-sizing: border-box;
                height: 25px;
                width: 35%;
                line-height: 25px;
                padding-right:10px;
                font-size: 18px;
                font-weight: bold;
                text-align: right;
                border-right: solid 1px #777;
            }
            .distribution-price{
                width: 40%;
                padding: 10px;
            }
            .mini-price{
                width: 25%;
                height: 50px;
                line-height: 50px;
                text-align: center;
                background: #2b343b;
            }
        }
        .announcement{
            position: fixed;
            top: 0;
            z-index: 99999;
            width: 100%;
            height: 100%;
            padding: 50px;
            color: #d9dde0;
            background-color: rgba(0, 0, 0, 0.8);
            .ivu-divider-horizontal{
                color:#fff;
            }
            h3{
                text-align: center;
            }
            p{
                display: flex;
                justify-content: flex-start;
                margin: 10px 0;
                line-height: 16px;
            }
            p:nth-child(2){
                margin: 10 auto;
                display: flex;
                justify-content: center;
                
            }
            p:nth-child(8){
                line-height: 26px;
                
            }
            p:last-child{
                margin-top: 40px;
                display: flex;
                justify-content: center;
                font-size: 20px;
            }
        }
        .box{height: 50px;}
        .shopcar-barde{
            max-height: 226px;
            overflow: auto;
            width: 100%;
            position: fixed;
            bottom: 50px;
            .info{
                padding: 20px 20px 0 20px;
                font-size: 12px;
                background-color: #f2f2f2;
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
                        }
                        .price{
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
        /* 可以设置不同的进入和离开动画 */
        /* 设置持续时间和动画函数 */
        .slide-fade-enter-active {
        transition: all .8s ease;
        }
        .slide-fade-leave-active {
        transition: all .8s ease;
        }
        .slide-fade-enter, .slide-fade-leave-to
        /* .slide-fade-leave-active for below version 2.1.8 */ {
        transform: translateY(200px);
        opacity: 0;
        }
    }
    
</style>