// pages/my/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {
      userUrl: "",
      nickname: "未登录"
    },
    actionText: "登录",
    btnType: "primary"
  },
  login: function(){ //登录
    if(this.data.actionText === "登录"){
      wx.login({
        success: () => {
          console.log(111)
          wx.getUserInfo({  
            success: (res) => {  //接口调用成功
              console.log(888)
              this.setData({
                userInfo:{
                  userUrl: res.userInfo.avatarUrl,
                  nickname: res.userInfo.nickName
                },
                actionText: "退出登录",
                btnType: "warn"               
              })
              wx.setStorage({  //存储上一次登录信息
                key: 'userInfo',
                data: {
                  userInfo:{
                    userUrl: res.userInfo.avatarUrl,
                    nickname: res.userInfo.nickName
                  },
                  actionText: "退出登录",
                  btnType: "warn"               
                },
              })
            },
            fail: (error) =>{
              console.log(error)
            }
          })
        }
      })  
    }else{
      wx.removeStorageSync("userInfo")  //删除绑定的数值
      this.setData({
        userInfo: {
          userUrl: "",
          nickname: "未登录"
        },
        actionText: "登录",
        btnType: "primary"
      })
    }
  },
  movetoWallet: function(){
    wx.navigateTo({
      url: '../wallet/index', 
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getStorage({
      key: 'userInfo',
      success: (res) => {
        console.log(res);
        this.setData({
          userInfo:{
            userUrl: res.data.userInfo.userUrl,
            nickname: res.data.userInfo.nickname
          },
          actionText: res.data.actionText,
          btnType: res.data.btnType
        })
      },
    })
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
  
  }
})