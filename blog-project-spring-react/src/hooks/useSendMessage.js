import { useMutation } from '@tanstack/react-query';
import { sendMessage as sendMessageApi } from '../api/actions';
import toast from 'react-hot-toast';

export function useSendMessage(setMessageStatus) {
  const { mutate: sendMessage, isLoading: isSending } = useMutation({
    mutationFn: async (message) => await sendMessageApi(message),
    onSuccess: (message) => {
      setMessageStatus(
        message?.id > 0
          ? 'Message has been sent suscesfully'
          : 'Fail to send message, Please Try Again'
      );
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { sendMessage, isSending };
}
