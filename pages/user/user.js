var app = getApp()
Page({  
    data: {    
        userInfo: {},    
        hasUserInfo: false,        
        canIUse: wx.canIUse('button.open-type.getUserInfo'),    
        orderItems: [
      {        
        typeId: 0,        
        name: '待付款',        
        url: 'bill',        
        imageurl: '/icon/_订单 待付款.png',
      },
      {        
        typeId: 1,        
        name: '待评价',        
        url: 'bill',        
        imageurl: '/icon/待评价.png'
      },
      {        
        typeId: 2,        
        name: '售后',        
        url: 'bill',        
        imageurl: '/icon/售后.png'
      },
      {        
        typeId: 3,        
        name: '更多',        
        url: 'bill',        
        imageurl: '/icon/更多.png'
      }
    ],
  },  
    //事件处理函数
  toOrder: function () {
    wx.navigateTo({      
      url: '../more/more'
    })
  },
  toMap: function (){
    wx.navigateTo({      
      url: '../map/index'
    })
  },
  onLoad: function () {    
    if (app.globalData.userInfo) {      
        this.setData({        
        userInfo: app.globalData.userInfo,        
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {        
        this.setData({          
          userInfo: res.userInfo,          
          hasUserInfo: true
        })
      }
    } else {      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({ success: res => {
          app.globalData.userInfo = res.userInfo;          
          this.setData({            
            userInfo: res.userInfo,            
            hasUserInfo: true
          })
        }
      })
    }
  },  
  getUserInfo: function (e) {    
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo    
    this.setData({      
        userInfo: e.detail.userInfo,      
        hasUserInfo: true
    })
  }
})


