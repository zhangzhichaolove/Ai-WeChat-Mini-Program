Page({
  data: {
    userInfo: {
      avatarUrl: '',
      nickName: ''
    }
  },

  onLoad: function() {
    // 获取缓存中的用户信息
    const userInfo = wx.getStorageSync('userInfo') || {};
    this.setData({
      userInfo
    });
  },

  chooseImage: function() {
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        const tempFilePath = res.tempFilePaths[0];
        this.setData({
          'userInfo.avatarUrl': tempFilePath
        });
      }
    });
  },

  onNicknameChange: function(e) {
    this.setData({
      'userInfo.nickName': e.detail.value
    });
  },

  saveSettings: function() {
    const { userInfo } = this.data;
    
    if (!userInfo.nickName.trim()) {
      wx.showToast({
        title: '请输入昵称',
        icon: 'none'
      });
      return;
    }

    // 保存到本地存储
    wx.setStorageSync('userInfo', userInfo);

    wx.showToast({
      title: '保存成功',
      icon: 'success',
      success: () => {
        // 延迟返回上一页
        setTimeout(() => {
          wx.navigateBack();
        }, 1500);
      }
    });
  }
}); 