import { message } from 'antd';

const messageSuccess = (content: string, duration = 3) => {
  message.destroy();
  void message.success({
    content,
    duration,
  });
};

const messageError = (content: string, duration = 3) => {
  message.destroy();
  void message.error({
    content,
    duration,
  });
};

export { messageSuccess, messageError };
