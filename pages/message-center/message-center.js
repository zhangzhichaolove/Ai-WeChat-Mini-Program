Page({
  data: {
    messages: [],
    hasUnread: false
  },

  onLoad: function() {
    // 清除旧数据，确保重新初始化
    wx.removeStorageSync('messages');
    wx.removeStorageSync('hasInitMessages');
    
    // 添加测试数据
    this.initTestMessages();
    this.loadMessages();
  },

  onShow: function() {
    // 更新消息列表
    this.loadMessages();
  },

  loadMessages: function() {
    try {
      // 从本地存储获取消息列表
      const messages = wx.getStorageSync('messages') || [];
      console.log('loadMessages - 获取到的消息数量:', messages.length);
      
      const hasUnread = messages.some(msg => !msg.isRead);
      
      this.setData({
        messages,
        hasUnread
      });
    } catch (error) {
      console.error('加载消息失败:', error);
      this.setData({
        messages: [],
        hasUnread: false
      });
    }
  },

  readMessage: function(e) {
    const messageId = e.currentTarget.dataset.id;
    const messages = this.data.messages.map(msg => {
      if (msg.id === messageId) {
        return { ...msg, isRead: true };
      }
      return msg;
    });

    this.setData({
      messages,
      hasUnread: messages.some(msg => !msg.isRead)
    });

    // 保存到本地存储
    wx.setStorageSync('messages', messages);

    // 显示消息详情
    const message = messages.find(msg => msg.id === messageId);
    if (message) {
      wx.showModal({
        title: message.title,
        content: message.content,
        showCancel: false
      });
    }
  },

  readAllMessages: function() {
    const messages = this.data.messages.map(msg => ({
      ...msg,
      isRead: true
    }));

    this.setData({
      messages,
      hasUnread: false
    });

    // 保存到本地存储
    wx.setStorageSync('messages', messages);

    wx.showToast({
      title: '已全部设为已读',
      icon: 'success'
    });
  },

  initTestMessages: function() {
    // 直接初始化测试数据，不检查hasInit
    const testMessages = [
      {
        id: 1,
        title: '欢迎使用AI助手',
        content: '感谢您使用AI助手！我们将为您提供智能、便捷的服务体验。如果您在使用过程中有任何问题，请随时联系我们。',
        time: '2024-01-15 10:00',
        isRead: false
      },
      {
        id: 2,
        title: '新功能上线通知',
        content: '我们最新上线了智能对话、图片识别等功能，欢迎体验！同时优化了用户界面，提升了响应速度。',
        time: '2024-01-14 15:30',
        isRead: false
      },
      {
        id: 3,
        title: '系统维护通知',
        content: '系统将于本周六凌晨2:00-4:00进行例行维护，维护期间可能影响使用，请您提前安排好使用时间。',
        time: '2024-01-13 09:15',
        isRead: true
      },
      {
        id: 4,
        title: '每日使用提醒',
        content: '昨日您与AI助手进行了3次对话，AI助手帮助您解决了2个问题，欢迎继续使用！',
        time: '2024-01-12 20:00',
        isRead: true
      },
      {
        id: 5,
        title: '账号安全提醒',
        content: '为了保障您的账号安全，建议定期更新密码，并开启安全验证。如发现异常登录，请及时联系客服。',
        time: '2024-01-11 14:20',
        isRead: true
      },
      {
        id: 6,
        title: 'AI对话能力升级',
        content: '我们的AI模型已完成升级，现在可以更好地理解上下文，提供更准确的回答。快来体验新版本吧！',
        time: '2024-01-10 16:45',
        isRead: true
      },
      {
        id: 7,
        title: '每周使用报告',
        content: '本周您已使用AI助手15次，解决问题效率提升30%。查看详细报告，了解更多使用情况。',
        time: '2024-01-09 08:30',
        isRead: true
      },
      {
        id: 8,
        title: '新年优惠活动',
        content: '春节期间，开通会员享受8折优惠！还有新年限定头像框等你来领取！',
        time: '2024-01-08 12:00',
        isRead: false
      },
      {
        id: 9,
        title: '用户反馈致谢',
        content: '感谢您提交的功能建议，我们已采纳并计划在下个版本中实现。您的支持是我们进步的动力！',
        time: '2024-01-07 14:20',
        isRead: true
      },
      {
        id: 10,
        title: '隐私政策更新',
        content: '我们更新了隐私政策，进一步加强了用户数据保护措施。请查看最新版本的隐私政策。',
        time: '2024-01-06 09:00',
        isRead: false
      },
      {
        id: 11,
        title: '社区活动预告',
        content: '本周六下午3点，我们将举办线上用户交流会，届时产品团队将为大家答疑解惑。',
        time: '2024-01-05 11:30',
        isRead: true
      },
      {
        id: 12,
        title: '积分奖励到账',
        content: '恭喜您获得签到奖励积分+5，已连续签到7天，明天签到可获得双倍积分！',
        time: '2024-01-04 20:15',
        isRead: true
      },
      {
        id: 13,
        title: '版本更新提醒',
        content: 'v2.5.0版本已发布，修复了已知问题，优化了用户体验。建议您及时更新到最新版本。',
        time: '2024-01-03 17:40',
        isRead: true
      },
      {
        id: 14,
        title: '定制服务上线',
        content: '现在您可以根据个人需求定制AI助手的对话风格和专业领域了！',
        time: '2024-01-02 13:25',
        isRead: false
      },
      {
        id: 15,
        title: '年度总结报告',
        content: '2023年，您与AI助手共进行了520次对话，解决了365个问题，查看完整年度报告>>',
        time: '2024-01-01 00:00',
        isRead: true
      }
    ];

    // 直接保存测试数据到本地存储
    try {
      wx.setStorageSync('messages', testMessages);
      
      // 验证数据是否正确保存
      const savedMessages = wx.getStorageSync('messages') || [];
    } catch (error) {
      console.error('保存数据失败:', error);
    }
  }
}); 