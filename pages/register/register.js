// pages/register/register.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username:'',
    password:'',
    conpwd:''
  },

  input_name:function(e){
    this.setData({
      username:e.detail.value
    })
  },
  input_pwd: function (e) {
    this.setData({
      password: e.detail.value
    })
  },
  input_confirmpwd: function (e) {
    this.setData({
      conpwd: e.detail.value
    })
  },

  submitButton:function(){
    var app = getApp();
    var that = this;
    // console.log(this.data.password)
    if(this.data.password != this.data.conpwd){
      wx.showToast({
        title: '两次密码不一致',
        icon:'error',
        duration:1000
      })
    }
    else if(this.data.username == ''){
      wx.showToast({
        title: '用户名为空！',
        icon:'error',
        duration:1000
      })
    }
    else if(this.data.password == '' || this.data.conpwd == ''){
      wx.showToast({
        title: '密码为空！',
        icon:'error',
        duration:1000
      })
    }
    else{
      wx.request({
        url: 'http://localhost:9090/user/register',
        method:'POST',
        // header:{'content-type':'application/x-www-form-urlencoded'},
        data:{
          username: that.data.username,
          password: that.data.password,
          conpwd: that.data.conpwd
        },
        success:function(res){
          if(res.data.code == 200){
            app.globalData.status = 1
            wx.navigateTo({
              url: '../login2/login2',
            })
            wx.showToast({
              title: '注册成功~',
              icon:'success',
              duration:2000,
              mask:true
            })
          }else{
            wx.showToast({
              title: '注册失败',
              icon:'error',
              duration:1000
            })
          }
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  bindCountryCodeChange: function (e) {
    this.setData({
      countryCodeIndex: e.detail.value
    })
  },

  inputPhoneNum: function (e) {
    // console.log(e)
    this.setData({
      phoneNum: e.detail.value
    })
  },

  genVerifyCode: function () {
    var index = this.data.countryCodeIndex;
    var countryCode = this.data.countryCodes[index];
    var phoneNum = this.data.phoneNum;
    wx.request({
      //小程序访问的网络请求协议必须是https，url里面不能有端口号
      url: "http://localhost:8080/user/genCode",
      data: {
        countryCode: countryCode,
        phoneNum: phoneNum
      },
      method: 'GET',
      success: function (res) {
        wx.showToast({
          title: '已发送，请查收!',
          duration: 2000
        })
      }
    })
  },

  formSubmit: function (e) {
    var phoneNum = e.detail.value.phoneNum;
    var verifyCode = e.detail.value.verifyCode;
    wx.request({
      url: 'http://localhost:8080/user/verify',
    method:"POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded' 
      },
    data:{
      phoneNum:phoneNum,
      verifyCode:verifyCode
    },
    success:function(res){
      console.log('===========');
      console.log(res);
      if(res.data){
          //校验成功
          wx.request({
            url: 'http://localhost:8080/user/register',
            method:"POST",
            data:{
              phoneNum:phoneNum,
              regDate:new Date(),
              status:1
            },
            success: function (res) {
              //用户信息保存成功 跳转
              if(res.data){
                wx.navigateTo({
                  url: '../wallet/wallet',
                })
                // 记录用户信息 防止用户中途退出
                // 0 未注册 1 绑定 2实名认证
                getApp().globalData.status = 1  
                getApp().globalData.phoneNum = phoneNum
                //保存到本地存储
                wx.setStorageSync("status",1)
                wx.setStorageSync("phoneNum",phoneNum)
              }else{
                wx.showModal({
                  title: '提示',
                  content: '服务端错误，请稍后再试'                 
                })
              }
            }
          })
      }else{
        wx.showModal({
          title: '提示',
          content: '输入的验证码有误！',
          showCancel : false
        })
      }

    }
    })
  }


})