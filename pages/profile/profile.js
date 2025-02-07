Page({
  data: {
    userInfo: {},
    unreadCount: 0  // 添加未读消息计数
  },

  onShow: function() {
    // 获取用户信息
    const userInfo = wx.getStorageSync('userInfo') || {};
    
    // 获取未读消息数量
    const messages = wx.getStorageSync('messages') || [];
    const unreadCount = messages.filter(msg => !msg.isRead).length;
    
    this.setData({
      userInfo,
      unreadCount
    });
  },

  // 跳转到设置页面
  navigateToSettings: function() {
    wx.navigateTo({
      url: '/pages/settings/settings'
    });
  },

  // 添加跳转到关于我们的方法
  navigateToAbout: function() {
    wx.navigateTo({
      url: '/pages/about/about'
    });
  },

  // 添加跳转到消息中心的方法
  navigateToMessageCenter: function() {
    wx.navigateTo({
      url: '/pages/message-center/message-center'
    });
  }
}) 