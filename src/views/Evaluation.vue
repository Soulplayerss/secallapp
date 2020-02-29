<template>
    <div class="evaluation">
        <!-- 头部 -->
        <div class="evaluationTop">
            <div class="leftDiv">
                <p><span>{{data1.score}}</span></p>
                <h3>综合评分</h3>
                <p>高于周边商家{{data1.rankRate}}</p>
            </div>
            <div class="rightDiv">
                <div>服务态度<Rate allow-half v-model="data1.serviceScore" /><span>{{data1.serviceScore}}</span></div>
                <div>食物评分<Rate allow-half v-model="data1.foodScore" /><span>{{data1.foodScore}}</span></div> 
                <div>送达时间<span>{{data1.deliveryTime}}分钟</span></div>              
            </div>
        </div>
        <div class="bottomDiv"></div>
        <!-- 分类按钮 -->
        <div class="species">
            <Button type="primary">全部&emsp;{{data2.length}}</Button>
            <Button type="info">满意</Button>
            <Button type="info">不满意</Button>
        </div>
        <!-- 选择 -->
        <div class="choose"><Icon type="md-checkmark-circle" />只看有内容的评价</div>

        <!-- 评价区域 -->
        <div class="comments" v-for="item in data2" :key="item.id">
            <div class="leftImg">
                <img :src="item.avatar" alt="" width="40px" height="40px">
            </div>
            <div class="rightInfo">
                <h4>{{item.username}}<span>{{item.rateTime | formatDate}}</span></h4>
                <p><Rate allow-half v-model="item.score" /><span v-show="item.deliveryTime!=''">{{item.deliveryTime}}分钟送达</span></p>
                <h3>{{item.text}}</h3>
                <div class="recommend">
                    <Icon type="md-thumbs-up" v-show="item.rateType==0" :class="{rateType0:item.rateType==0}"/>
                    <Icon type="md-thumbs-down" v-show="item.rateType==1" :class="{rateType1:item.rateType==1}"/>
                    <span v-for="(v,i) in item.recommend" :key="i">{{v}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { evalutionInfo,merchantsInfo } from '../api/apis.js'
    
    export default {
        data(){
            return{
                data1:[],
                data2:[],
            }
        },
        created(){
            //发送请求商家信息
            merchantsInfo().then(res=>{
                console.log(res.data)
                this.data1=res.data.data;
                // console.log(this.data)
            })
            //发送请求评论信息
            evalutionInfo().then(res=>{
                console.log(res.data)
                this.data2=res.data.data;
                // console.log(this.data)
            })
        },
        filters: {
            formatDate: function (value) {
                let date = new Date(value);
                let y = date.getFullYear();
                let MM = date.getMonth() + 1;
                MM = MM < 10 ? ('0' + MM) : MM;
                let d = date.getDate();
                d = d < 10 ? ('0' + d) : d;
                let h = date.getHours();
                h = h < 10 ? ('0' + h) : h;
                let m = date.getMinutes();
                m = m < 10 ? ('0' + m) : m;
                let s = date.getSeconds();
                s = s < 10 ? ('0' + s) : s;
                return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
            }
        }
    }
</script>

<style lang="less" scoped>
    .evaluation{
        height: 67vh;
        overflow: auto;
        .evaluationTop{
            height: 100px;
            display: flex;
            justify-content: flex-start;
            .leftDiv{
                width: 120px;
                height: 70px;
                margin: 15px 0;
                text-align: center;
                border-right: solid 1px #ccc;
                p{
                    font-size: 12px;
                    color: #9a9fa3;
                    span{
                        color: #ff6600;
                        font-weight: bold;
                        font-size: 18px;
                    }
                }
            }
            .rightDiv{
                flex: 1;
                height: 70px;
                margin: 15px 0;
                font-size: 14px;
                padding-left: 20px;
                .ivu-rate{
                    font-size: 14px;
                    margin-left: 5px;;
                }
                span{
                    color: #ff6600;
                }
                div:last-child{
                    span{
                        color: #9a9fa3;
                        margin-left: 5px;
                    }
                }
            }
            
        }
        .bottomDiv{
            height: 20px;
            border-top: solid 1px #e7e7e7;
            border-bottom: solid 1px #e7e7e7; 
            background-color: #f5f6f8;               
        }
        .species{
            width: 95%;
            margin: 0 auto;
            padding: 20px;
            border-bottom: solid 1px #ccc;
            button{
                margin-right: 20px;
            }
        }
        .choose{
            height: 50px;
            line-height: 50px;
            padding-left: 20px;
            font-size: 16px;
            border-bottom: solid 1px #ccc;
        }
        .comments{
            width: 95%;
            padding: 20px 0;
            margin: 0 auto;
            border-bottom: solid 1px #ccc;
            display: flex;
            justify-content: flex-start;
            .leftImg{
                width: 40px;
                height: 40px;
                border-radius:50%;
                overflow: hidden; 
            }
            .rightInfo{
                flex: 1;
                padding: 0 20px;
                h4:nth-child(1){
                    display: flex;
                    justify-content: space-between;
                    span{
                        color: #9a9b9d;
                    }
                }
                p:nth-child(2){
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    color: #9a9b9d;                    
                }
                .recommend{
                    width: 100%;
                    .rateType0{
                        color: #00a0dc
                    }
                    .rateType1{
                        color: #b7babf
                    }
                    span{
                        display:inline-block;
                        height: 26px;
                        line-height: 26px;
                        margin: 0 10px;
                        border: solid 1px #f2f2f2;
                    }
                }
            }
        }
    }
</style>