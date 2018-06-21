// pages/logs/logs.js
Page({
//函数调用形式
  /**
   * 页面的初始数据
   */
  data: {
    latitude: 34.8,
    longitude: 119
  },
  //(3)给controls绑定一个事件bindcontroltap
  bindcontroltap: function(e){
    console.log(e)
    switch (e.controlId) {  
    //e事件中controls有控件id的值，判定所点击的控件
      case 1: 
        this.movetoCenter(); //在监听页面事件中
        break;
      case 2:
        if(this.timer){
          wx.navigateBack({  //栈内随意跳转
            delta: 1  //默认值
          })
        }else{  //当time没有值undered时候
          //微信提供的一个接口，扫码接口
          wx.scanCode({
            success: () => {
              console.log('扫码成功');
              wx.request({ //给服务器发送信息
                url: 'https://www.easy-mock.com/mock/5af6fdf7cd6ea04cb0708135/ofo/password',
                success: (res) => {
                  //访问服务器成功
                  wx.hideLoading();  //与下面的showLoading对应，取消功能
                  wx.redirectTo({    //跳转页面功能，并且把参数传过去
                    url: '../scanreault/index?password=' + res.data.data.password + '&number=' + res.data.data.number,
                    success: () => {
                      wx.showToast({ //弹出接口
                        title: '获取密码成功',
                        duration: 1000
                      })
                    }
                  })
                }
              })
              //微信接口，图层转转
              wx.showLoading({  //与上面的hideLoading对应，添加功能
                title: '正在获取密码',
              })
            },
            fail: () => {
              console.log('扫码失败')
            }
          });
        }
      
        break;
      case 3:
        wx.navigateTo({  //不销毁跳转，其他页面在后台
          url: '../warn/index',
        });
        break;
      case 4:
        wx.navigateTo({
          url: '../my/index',
        })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.timer = options.timer;
    //(1)获取经纬度接口
    wx.getLocation({
      success: (res) => {
        //箭头函数this指向当前实例
        // console.log(res) 经纬度参数
        this.setData({  
      //通过this的原型属性setData就可以改变data参数
          latitude: res.latitude,
          longitude: res.longitude
        })
      }
    }),
    //（2）获取当前手机的参数型号屏幕等，为了添加控件
    wx.getSystemInfo({
      success: (res) => {
        // console.log(res);  rex.XXX获取屏幕的属性高度宽度等
        this.setData({
          //map中的组件属性，利用this.setData修改
          controls:[{  //添加控件
            id: 1,      //id，有点击事件的时候就是返回一个ID号
            iconPath:'/images/location.png', //控件的图片路径
            position:{  //控件相对于地图的位置
              width: 50,
              height: 50,
              left: 20,
              top: res.windowHeight - 80
            },
            clickable: true  //是否允许点击
          },{
            id: 2,
            iconPath: '/images/use.png',
            position: {
              width: 90,
              height: 90,
              top: res.windowHeight - 100,
              left: res.windowWidth / 2 - 45
            },
            clickable: true
          },{
            id: 3,
            iconPath: '/images/warn.png',
            position: {
              width: 50,
              height: 50,
              top: res.windowHeight - 80,
              left: res.windowWidth - 70
            },
            clickable: true
          },{
            id: 4,
            iconPath: '/images/avatar.png',
            position: {
              width: 50,
              height: 50,
              top: res.windowHeight - 155,
              left: res.windowWidth - 70
            },
            clickable: true
          },{
            id: 5,
            iconPath: '/images/marker.png',
            position: {
              width: 30,
              height: 45,
              top: res.windowHeight / 2 - 45,
              left: res.windowWidth / 2 - 15
            }
          }]
        })
      },
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // console.log('onready初次渲染')
  },
  
  movetoCenter: function(){
    //调用createMapContext内的一个方法。将地图中心移动到当前定位点
    this.mapctx.moveToLocation();
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // console.log("onshow显示")
    //创建上下文对象参数为map标签的id
    this.mapctx = wx.createMapContext("ofo-map");
    this.movetoCenter();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    // console.log("onhide隐藏")
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    // console.log('onunload页面卸载')
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