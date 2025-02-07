Page({
  data: {
    messages: [],
    inputMessage: '',
    scrollToMessage: ''
  },

  onInputChange(e) {
    this.setData({
      inputMessage: e.detail.value
    });
  },

  async sendMessage() {
    if (!this.data.inputMessage.trim()) return;

    const userMessage = {
      type: 'user',
      content: this.data.inputMessage
    };

    this.setData({
      messages: [...this.data.messages, userMessage],
      inputMessage: ''
    });

    // 这里需要替换为实际的AI API调用
    try {
      const aiResponse = await this.getAIResponse(userMessage.content);
      const aiMessage = {
        type: 'ai',
        content: aiResponse
      };

      this.setData({
        messages: [...this.data.messages, aiMessage],
        scrollToMessage: `msg-${this.data.messages.length}`
      });
    } catch (error) {
      console.error('AI响应错误：', error);
    }
  },

  async getAIResponse(message) {
    // 这里需要实现实际的AI API调用
    // 示例返回
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('这是AI的回复消息');
      }, 1000);
    });
  }
}); 