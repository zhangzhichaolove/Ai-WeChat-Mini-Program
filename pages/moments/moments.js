Page({
  data: {
    userInfo: {},
    momentsList: [],
    showPublishModal: false,
    newMoment: {
      content: "",
      images: [],
      location: "",
    },
    isLoading: false,
    noMore: false,
    page: 1,
    pageSize: 10,
    defaultImages: {
      avatar: "/images/my-image.png",
      cover: "/images/my-image.png",
      moment: "/images/default-image.jpg",
    },
  },

  onLoad: function () {
    this.loadUserInfo();
    this.loadMoments();
  },

  loadUserInfo: function () {
    const userInfo = wx.getStorageSync("userInfo") || {};
    this.setData({ userInfo });
  },

  loadMoments: function () {
    if (this.data.isLoading || this.data.noMore) return;

    this.setData({ isLoading: true });

    // 模拟加载数据
    setTimeout(() => {
      const newMoments = this.getMockMoments();

      this.setData({
        momentsList: [...this.data.momentsList, ...newMoments],
        isLoading: false,
        noMore: newMoments.length < this.data.pageSize,
        page: this.data.page + 1,
      });
    }, 1000);
  },

  getMockMoments: function () {
    const { defaultImages } = this.data;
    // 生成模拟数据
    const mockData = [
      {
        id: Date.now(),
        userInfo: {
          avatarUrl: this.data.userInfo.avatarUrl || defaultImages.avatar,
          nickName: this.data.userInfo.nickName || "我",
        },
        content: "分享一个有趣的AI对话，确实帮我解决了很多问题！",
        images: [defaultImages.moment],
        location: "北京市朝阳区",
        createTime: "刚刚",
        likes: ["小明", "小红"],
        comments: [
          {
            id: 1,
            userName: "小明",
            content: "AI确实很强大！",
          },
        ],
      },
      {
        id: Date.now() - 1000,
        userInfo: {
          avatarUrl: "/images/default-avatar.jpeg",
          nickName: "小红",
        },
        content: "今天天气真好，心情不错~",
        images: ["/images/default-image.jpg", "/images/default-image.jpg"],
        location: "上海市浦东新区",
        createTime: "10分钟前",
        likes: ["我", "小张"],
        comments: [],
      },
      {
        id: Date.now() - 2000,
        userInfo: {
          avatarUrl: "/images/default-avatar.jpeg",
          nickName: "小张",
        },
        content: "推荐一个很好用的AI助手，可以帮助提高工作效率！",
        images: [],
        location: "广州市天河区",
        createTime: "1小时前",
        likes: [],
        comments: [
          {
            id: 1,
            userName: "我",
            content: "确实很好用！",
          },
          {
            id: 2,
            userName: "小明",
            content: "我也在用，效果不错",
          },
        ],
      },
    ];

    // 根据页码返回不同的数据
    if (this.data.page === 1) {
      return mockData;
    } else if (this.data.page === 2) {
      return mockData.map((item) => ({
        ...item,
        id: item.id - 10000,
        createTime: "昨天",
      }));
    } else {
      return []; // 没有更多数据了
    }
  },

  showPublishModal: function () {
    this.setData({ showPublishModal: true });
  },

  hidePublishModal: function () {
    this.setData({
      showPublishModal: false,
      newMoment: {
        content: "",
        images: [],
        location: "",
      },
    });
  },

  onContentInput: function (e) {
    this.setData({
      "newMoment.content": e.detail.value,
    });
  },

  chooseImage: function () {
    const remainCount = 9 - this.data.newMoment.images.length;
    wx.chooseImage({
      count: remainCount,
      sizeType: ["compressed"],
      sourceType: ["album", "camera"],
      success: (res) => {
        this.setData({
          "newMoment.images": [
            ...this.data.newMoment.images,
            ...res.tempFilePaths,
          ],
        });
      },
    });
  },

  deleteImage: function (e) {
    const index = e.currentTarget.dataset.index;
    const images = this.data.newMoment.images;
    images.splice(index, 1);
    this.setData({
      "newMoment.images": images,
    });
  },

  chooseLocation: function () {
    wx.chooseLocation({
      success: (res) => {
        this.setData({
          "newMoment.location": res.name,
        });
      },
    });
  },

  publishMoment: function () {
    const { content, images, location } = this.data.newMoment;

    if (!content.trim()) {
      wx.showToast({
        title: "请输入内容",
        icon: "none",
      });
      return;
    }

    // 这里应该调用接口保存数据
    const newMoment = {
      id: Date.now(),
      userInfo: {
        avatarUrl: this.data.userInfo.avatarUrl || this.data.defaultImages.avatar,
        nickName: this.data.userInfo.nickName || '我'
      },
      content,
      images,
      location,
      createTime: "刚刚",
      likes: [],
      comments: []
    };

    this.setData({
      momentsList: [newMoment, ...this.data.momentsList],
      showPublishModal: false,
      newMoment: {
        content: "",
        images: [],
        location: "",
      },
    });

    wx.showToast({
      title: "发布成功",
      icon: "success",
    });
  },

  previewImage: function (e) {
    const { urls, current } = e.currentTarget.dataset;
    wx.previewImage({
      urls,
      current,
    });
  },

  toggleLikeComment: function (e) {
    const { id } = e.currentTarget.dataset;
    wx.showActionSheet({
      itemList: ["点赞", "评论"],
      success: (res) => {
        if (res.tapIndex === 0) {
          this.likeMoment(id);
        } else {
          this.showCommentInput(id);
        }
      },
    });
  },

  likeMoment: function (momentId) {
    // 这里应该调用接口处理点赞
    const moments = this.data.momentsList.map(moment => {
      if (moment.id === momentId) {
        const likes = [...moment.likes];
        // 使用用户昵称，如果没有则使用默认值"我"
        const nickname = this.data.userInfo.nickName || '我';
        const index = likes.indexOf(nickname);
        if (index === -1) {
          likes.push(nickname);
        } else {
          likes.splice(index, 1);
        }
        return { ...moment, likes };
      }
      return moment;
    });

    this.setData({ momentsList: moments });
  },

  showCommentInput: function (momentId) {
    wx.showModal({
      title: "评论",
      editable: true,
      placeholderText: "请输入评论内容",
      success: (res) => {
        if (res.confirm && res.content) {
          this.addComment(momentId, res.content);
        }
      },
    });
  },

  addComment: function (momentId, content) {
    // 这里应该调用接口处理评论
    const moments = this.data.momentsList.map(moment => {
      if (moment.id === momentId) {
        const comments = [...moment.comments, {
          id: Date.now(),
          userName: this.data.userInfo.nickName || '我',
          content
        }];
        return { ...moment, comments };
      }
      return moment;
    });

    this.setData({ momentsList: moments });
  },

  onPullDownRefresh: function () {
    this.setData(
      {
        momentsList: [],
        page: 1,
        noMore: false,
      },
      () => {
        this.loadMoments();
        wx.stopPullDownRefresh();
      }
    );
  },

  onReachBottom: function () {
    this.loadMoments();
  },
});
