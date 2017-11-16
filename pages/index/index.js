//index.js
//获取应用实例
const app = getApp()

const API_BASE='https://yfblog.cn/wp-json'

const API_ROUTE='wp/v2/posts'

Page({
  data: {
      entities:[]
  },
  //事件处理函数

  onLoad () {
      wx.request({
          url:`${ API_BASE }/${ API_ROUTE }`,
          success:(response)=>{
              console.log(response)
              const entities =response.data
              this.setData({
                  entities
              })
          }
      })
  }
})
