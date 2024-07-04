'use client'
import {
  FileImage,
  Mic,
  Paperclip,
  PlusCircle,
  SendHorizontal,
  Smile,
  ThumbsUp
} from 'lucide-react'
import { cn } from '@/lib/utils'

import { HiPaperAirplane, HiPhoto } from 'react-icons/hi2'
import MessageInput from './MessageInput'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import axios from 'axios'
//import { CldUploadButton } from 'next-cloudinary'
import useConversation from '@/hooks/useConversation'
import { EmojiPicker } from '@/components/chat/emoji-picker'
import Link from 'next/link'
import { buttonVariants } from '@/components/chat/ui/button'

const Form = () => {
  const { conversationId } = useConversation()

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<FieldValues>({
    defaultValues: {
      message: ''
    }
  })

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setValue('message', '', { shouldValidate: true })
    axios.post('/api/messages', {
      ...data,
      conversationId: conversationId,
      cache: 'no-store'
    })
  }

  const handleUpload = (result: any) => {
    axios.post('/api/messages', {
      image: result.info.secure_url,
      conversationId: conversationId,
      cache: 'no-store'
    })
  }

  const handleThumbsUp = () => {
    /*  const newMessage: Message = {
      id: message.length + 1,
      name: loggedInUserData.name,
      avatar: loggedInUserData.avatar,
      message: ''
    }
    sendMessage(newMessage)
    setMessage('') */
    // setValue('message', '👍', { shouldValidate: true })
    axios.post('/api/messages', {
      message: '👍',
      //...data,
      conversationId: conversationId,
      cache: 'no-store'
    })
  }

  return (
    <div
      className="
      
      bottom-0
        py-4 
        px-4 
        bg-white 
        border-t 
        flex 
        items-center 
        gap-2 
        lg:gap-4 
        w-full
      "
    >
      {/* <CldUploadButton
        options={{ maxFiles: 1 }}
        onUpload={handleUpload}
        uploadPreset="zbhgu6ih"
      >
        <HiPhoto size={30} className="text-sky-500" />
      </CldUploadButton> */}

      <Link
        href="#"
        className={cn(
          buttonVariants({ variant: 'ghost', size: 'icon' }),
          'h-9 w-9',
          'dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white shrink-0'
        )}
        onClick={handleThumbsUp}
      >
        <ThumbsUp size={20} className="text-muted-foreground" />
      </Link>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center gap-2 lg:gap-4 w-full"
      >
        <MessageInput
          id="message"
          register={register}
          errors={errors}
          required
          //type="submit"
          placeholder="Write a message"
        />
        <button
          type="submit"
          className="
            rounded-full 
            p-2 
            bg-sky-500 
            cursor-pointer 
            hover:bg-sky-600 
            transition
          "
        >
          <HiPaperAirplane size={18} className="text-white" />
        </button>
      </form>
    </div>
  )
}

export default Form
