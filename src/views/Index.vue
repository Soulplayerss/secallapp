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
                <MenuItem name="1"> <router-link to="/">商品</router-link></MenuItem>
                <MenuItem name="2"> <router-link to="/merchants">商家</router-link></MenuItem>
                <MenuItem name="4"><router-link to="/evaluation">评价</router-link></MenuItem>
            </Menu>
        </div>

        <router-view></router-view>

        <!-- 站位盒子 -->
        <div class="box"></div>
        <!-- 购物车 -->
        <div class="shopcar-div">
            <div class="icon"><Icon type="md-cart" /></div>
            <div class="total-price">￥<span>0</span></div>
            <div class="distribution-price">另需配送费￥<span>{{data.deliveryPrice}}</span>元</div>
            <div class="mini-price">￥<span>{{data.minPrice}}</span>起送</div>
        </div>

        <!-- 商家公告 -->
        <div class="announcement" v-show="this.floag">
            <h3>{{data.name}}</h3>
            <p>
                <img src="../assets/imgs/star24_on@2x.png" alt="">
                <img src="../assets/imgs/star24_on@2x.png" alt="">
                <img src="../assets/imgs/star24_on@2x.png" alt="">
                <img src="../assets/imgs/star24_on@2x.png" alt="">
                <img src="../assets/imgs/star24_off@2x.png" alt="">
            </p>
            <Divider>优惠信息</Divider>
            <p v-for="(v,i) in data.supports" :key="i"><img src="../assets/imgs/decrease_1@2x.png" alt="" width="14px" height="14px">{{v.description}}</p>
            <Divider>商家公告</Divider>
            <p>{{data.bulletin}}</p>
            <p @click="hinddiv"><Icon type="md-close"/></p>
        </div>
    </div>
</template>

<script>

import { merchantsInfo } from '../api/apis.js';
    export default {
        data(){
            return{
                data:{},
                floag:false
            }
        },
        created(){
            //发送请求商家信息
            merchantsInfo().then(res=>{
                // console.log(res.data)
                this.data=res.data.data;
            })
        },
        methods:{
            active(){
                var activeList=document.getElementsByTagName('li');
                for(var i=0; i < activeList.length;i++){
                    activeList[i].style.color="blue"
                }
            },
            showdiv(){
                this.floag=true;
            },
            hinddiv(){
                console.log(1111)
                this.floag=false;
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
                img{
                    width: 16px;
                    height: 16px;
                    margin-right: 10px;
                }
            }
            p:nth-child(2){
                width: 50%;
                margin: 0 auto;
                display: flex;
                justify-content: space-around;
                
            }
            p:last-child{
                margin-top: 40px;
                display: flex;
                justify-content: center;
                font-size: 20px;
            }
        }
        .box{height: 50px;}
    }
    
</style>