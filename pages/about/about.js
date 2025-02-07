Page({
  data: {
    version: '1.0.0',
    currentYear: new Date().getFullYear()
  },

  onLoad: function() {
    // 获取小程序版本信息
    const accountInfo = wx.getAccountInfoSync();
    if (accountInfo && accountInfo.miniProgram) {
      this.setData({
        version: accountInfo.miniProgram.version || '1.0.0'
      });
    }
  },

  checkUpdate: function() {
    const updateManager = wx.getUpdateManager();

    updateManager.onCheckForUpdate((res) => {
      if (res.hasUpdate) {
        wx.showModal({
          title: '更新提示',
          content: '发现新版本，是否立即更新？',
          success: (res) => {
            if (res.confirm) {
              this.updateApp(updateManager);
            }
          }
        });
      } else {
        wx.showToast({
          title: '已是最新版本',
          icon: 'success'
        });
      }
    });
  },

  updateApp: function(updateManager) {
    wx.showLoading({
      title: '更新中...'
    });

    updateManager.onUpdateReady(() => {
      wx.hideLoading();
      updateManager.applyUpdate();
    });

    updateManager.onUpdateFailed(() => {
      wx.hideLoading();
      wx.showModal({
        title: '更新提示',
        content: '新版本下载失败，请检查网络后重试',
        showCancel: false
      });
    });
  },

  contactUs: function() {
    wx.showModal({
      title: '联系我们',
      content: '邮箱：support@example.com\n电话：400-xxx-xxxx',
      showCancel: false
    });
  },

  showPrivacyPolicy: function() {
    // 这里可以跳转到隐私政策页面或显示隐私政策内容
    wx.showModal({
      title: '隐私政策',
      content: '这里是隐私政策内容...',
      showCancel: false
    });
  }
}); 