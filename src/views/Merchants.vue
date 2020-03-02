<template>
    <div class="merchants">
        <ul class="content">
            <!-- 顶部 -->
            <div class="merchants-top">
                <div class="top1">
                    <div>
                        <h3>{{data.name}}</h3>
                        <p><Rate allow-half v-model="data.score" />({{data.ratingCount}})月售{{data.sellCount}}单</p>
                    </div>
                    <div>
                        <p><Icon type="ios-heart" class="red"/></p>
                        <p>已收藏</p>
                    </div>
                </div>
                <div class="top2">
                    <div>
                        <p>起送价</p>
                        <p><span>{{data.minPrice}}</span>元</p>
                    </div>
                    <div>
                        <p>配送价</p>
                        <p><span>{{data.deliveryPrice}}</span>元</p>
                    </div>
                    <div>
                        <p>平均配送时间</p>
                        <p><span>{{data.deliveryTime}}</span>分钟</p>
                    </div>
                </div>
                <div class="bottomDiv"></div>
            </div>
            <!-- 活动优惠 -->
            <div class="activity">
                <h3>公告与活动</h3>
                <div class="bulletin">{{data.bulletin}}</div>
                <div class="supports" v-for="item in data.supports" :key="item.id">
                    <img v-show="item.type==0" src="../assets/imgs/decrease_1@2x.png" alt="" width="18px">
                    <img v-show="item.type==1" src="../assets/imgs/discount_1@2x.png" alt="" width="18px">
                    <img v-show="item.type==2" src="../assets/imgs/special_1@2x.png" alt="" width="18px">   
                    {{item.description}}
                </div>
            </div>
            <div class="bottomDiv"></div>
            <!-- 商家图片 -->
            <div class="merchantsImg">
                <h3>商家实景</h3>
                <ul>
                    <li v-for="item in data.pics" :key="item.id">
                        <img :src="item" alt="" height="80px" width="100px">
                    </li>
                </ul>
            </div>
            <div class="bottomDiv"></div>
            <!-- 商家信息 -->
            <div class="merchantsInfo">
                <h3>商家信息</h3>
                <div v-for="item in data.infos" :key="item.id">
                    {{ item }}
                </div>
            </div>
        </ul>
    </div>
</template>

<script>
import { merchantsInfo } from '../api/apis.js'
import BScroll from 'better-scroll'
    export default {
        data(){
            return{
                data:[],
            }
        },
        created(){
            //发送请求商家信息
            merchantsInfo().then(res=>{
                // console.log(res.data)
                this.data=res.data.data;
                console.log(this.data)
            })
        },
        mounted(){
            new BScroll(document.querySelector(".merchants"))
        }
    }
</script>

<style lang="less" scoped>
    .merchants{
        height: 67vh;
        overflow: auto;
        .merchants-top{
            .top1{
                width: 95%;
                height: 70px;
                margin: 0 auto;
                padding: 10px 0;
                display: flex;
                justify-content: space-between;
                align-items: center;
                border-bottom: solid 1px #ccc;
                .ivu-rate{
                    font-size: 14px;
                    margin-left: 5px;;
                }
                div:last-child{
                    p{
                        text-align: center;
                        .red{
                            color: red;
                            font-size: 24px;
                        }
                    }
                }
            }
            .top2{
                height: 55px;
                width: 95%;
                margin: 20px auto;
                display: flex;
                justify-content: space-around;
                div{
                    width: 33%;
                    height: 100%;
                    text-align: center;
                    color: #98999b;
                    border-right: solid 1px #ccc;
                    span{
                        font-size: 30px;
                        color: #081317;
                    }
                }
                div:last-child{
                    border: none;
                }
            }
            .bottomDiv{
                height: 20px;
                border-top: solid 1px #e7e7e7;
                border-bottom: solid 1px #e7e7e7; 
                background-color: #f5f6f8;               
            }
        }
        .activity{
            padding: 20px;
            .bulletin{
                padding: 10px;
                color: #fb170e;
            }
            .supports{
                height: 40px;
                display: flex;
                align-items: center;
                border-top: solid 1px #ccc;
                img{
                    margin-right: 10px;
                }
            }
        }
        .bottomDiv{
            height: 20px;
            border-top: solid 1px #e7e7e7;
            border-bottom: solid 1px #e7e7e7; 
            background-color: #f5f6f8;               
        }
        .merchantsImg{
            padding: 20px;
            ul{
                height: 80px;
                overflow: auto;
                list-style-type: none;
                li{
                    height: 80px;
                    margin-right: 5px;
                    float: left;
                }
            }
        }
        .merchantsInfo{
            padding: 20px 20px 0;
            div{
                height: 60px;
                padding-left: 10px;
                display: flex;
                align-items: center;
                border-top: solid 1px #ccc;
            }
        }
    }
</style>