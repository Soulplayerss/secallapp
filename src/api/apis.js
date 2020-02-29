import axios from 'axios'
//创建请求对象
let req=axios.create({
    baseURL:'http://192.168.1.5:3000',//设置基本路径
    timeout:10000   //10秒未请求到，提示超时
})

//请求商家信息
export function merchantsInfo(){
    return req.get('/api/seller')
}

//商家列表
export function goodsInfo(){
    return req.get('/api/goods')
}

//商家评价
export function evalutionInfo(){
    return req.get('/api/ratings')
}