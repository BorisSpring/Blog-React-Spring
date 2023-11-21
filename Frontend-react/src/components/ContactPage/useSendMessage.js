import { useMutation } from '@tanstack/react-query';
import { sendMessage as sendMessageApi } from '../../api/actions';

export function useSendMessage(setMessageStatus, setmessageValidation) {
  const { mutate: sendMessage, isLoading: isSending } = useMutation({
    mutationFn: async (message) => await sendMessageApi(message),
    onSuccess: (message) => {
      message.id
        ? setMessageStatus('Message has been sent susecfully')
        : setmessageValidation(message);
    },
  });

  return { sendMessage, isSending };
}
