import React, { useEffect, useState } from 'react';

//components
import { LatestBlogs, ContactInfo } from '..';

//custom hook
import { useSendMessage } from './useSendMessage';

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

const initialState = { message: '', name: '', email: '' };

const ContactPage = () => {
  const [message, setMessage] = useState(initialState);
  const [messageStatus, setMessageStatus] = useState('');
  const [messageValidation, setmessageValidation] = useState(initialState);
  const { sendMessage, isSending } = useSendMessage(
    setMessageStatus,
    setmessageValidation
  );
  useEffect(() => {
    const timeOut = setTimeout(() => {
      setMessageStatus('');
    }, 10000);

    return () => clearTimeout(timeOut);
  }, [messageStatus]);

  const handleChnage = (e) => {
    const { name, value } = e.target;

    setMessage((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessageStatus('');
    setmessageValidation({});
    if (
      message.message.trim().length > 9 &&
      message.name.trim().length > 4 &&
      emailRegex.test(message.email.trim())
    ) {
      sendMessage(message);
      setMessage({ message: '', name: '', email: '' });
    }
  };

  return (
    <section className='relative'>
      <img
        src='\img\hero.jpg'
        className='w-full max-h-[300px] md:max-h-[350px] lg:max-h-[400px] object-cover object-center mb-10 lg:mb-16'
        alt=' Man Walking thru the street with bagage'
      />
      <h2 className='absolute font-bold text-white text-[26px] md:text-[32px] lg:text-[40px] z-10 top-[10%]  max-w-[300px] md:max-w-[500px] lg:max-w-[600px] left-[10%] leading-7 md:leading-10'>
        Have an interesting news or idea? Don't hesitate to contact us!
      </h2>
      <p
        className={`${
          messageStatus?.startsWith('Fail')
            ? 'bg-red-100 text-red-700'
            : 'bg-green-100 text-green-700'
        } w-fit mx-auto p-2 mb-5 rounded-full px-4 transition-all duration-1000 ${
          !messageStatus ? 'scale-0' : 'scale-1'
        }`}
      >
        {messageStatus}
      </p>
      <div className='container mx-auto flex flex-col lg:grid lg:gap-x-10 lg:grid-cols-3 px-5 text-primary'>
        <form
          className='w-full h-fit lg:col-span-2 flex flex-col gap-5 lg:grid lg:grid-cols-2'
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className='w-full flex flex-col'>
            <p className='text-red-700 font-medium'>
              {messageValidation?.name}
            </p>
            <input
              type='text'
              name='name'
              required
              value={message.name}
              onChange={handleChnage}
              placeholder='You Name'
              className='outline-none border-2 border-gray-400 shadow-sm focus:shadow-lg focus:ring-gray-200 focus:ring-inset-1  focus:ring focus:ring-opacity-80  rounded-sm h-10 p-2'
            />
          </div>
          <div className='w-full flex flex-col'>
            <p className='text-red-700 font-medium'>
              {messageValidation?.email}
            </p>
            <input
              type='email'
              placeholder='You Email Adress (will not pe published)'
              required
              onChange={handleChnage}
              value={message.email}
              name='email'
              className='outline-none border-2 border-gray-400 shadow-sm focus:shadow-lg focus:ring-gray-200 focus:ring-inset-1  focus:ring focus:ring-opacity-80  rounded-sm h-10 p-2'
            />
          </div>
          <div className='w-full flex flex-col lg:col-span-2'>
            <p className='text-red-700 font-medium'>
              {messageValidation?.message}
            </p>
            <textarea
              required
              type='text'
              name='message'
              onChange={handleChnage}
              value={message.message}
              placeholder='Write your message here....'
              className='outline-none border-2 border-gray-400  focus:ring focus:ring-opacity-80 focus:ring-inset-1 focus:ring-gray-200 rounded-sm h-[400px] p-2  justify-normal'
              style={{ verticalAlign: 'top' }}
            />
          </div>
          <button
            disabled={isSending}
            type='submit'
            className={` ${
              isSending ? 'bg-slate-200' : 'bg-slate-500'
            } text-white rounded-sm col-span-2 w-full p-2 hover:bg-slate-600 transition-all duration-300 mb-10 lg:mb-20`}
          >
            Submit Your Message
          </button>
        </form>
        <div className='px-5 flex flex-col gap-5 my-10 lg:my-0 lg:mb-20'>
          <ContactInfo />
          <LatestBlogs />
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
