import Tooltip from '@/components/elements/Tooltip'
import { formatDistanceToNow } from 'date-fns'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { FiTrash2 as DeleteIcon } from 'react-icons/fi'
import { ImReply } from 'react-icons/im'
import { MdVerified as VerifiedIcon } from 'react-icons/md'

import { canDeleteChatMessage, isChatAuthor } from '@/common/libs/chat'
import { IMessage } from '@/common/types/messages'

import ChatAvatar from './ChatAvatar'

interface IChatItemProps extends IMessage {
  currentTime: number
  deleteMessage: (id: string) => void
  sessionEmail: string
  sessionUid: string
  clickReply: (name: string) => void
}

export default function ChatItem({
  id,
  name,
  message,
  image,
  uid,
  email,
  created_at,
  sessionEmail,
  sessionUid,
  currentTime,
  is_reply,
  reply_to,
  deleteMessage,
  clickReply
}: IChatItemProps) {
  const [onHover, setOnHover] = useState(false)
  const time = formatDistanceToNow(new Date(created_at), { addSuffix: true })
  const canDeleteMessage = canDeleteChatMessage({
    createdAt: created_at,
    email,
    now: currentTime,
    sessionEmail,
    sessionUid,
    uid
  })

  return (
    <motion.div
      id="chat-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex w-full items-end space-x-2"
    >
      <ChatAvatar name={name} image={image} className="mb-6" />
      <div className="flex w-full flex-col space-y-[2px]">
        <div
          className="flex w-full max-w-[90%] items-end space-x-2"
          onMouseEnter={() => setOnHover(true)}
          onMouseLeave={() => setOnHover(false)}
        >
          <div className="rounded-[20px] rounded-bl-sm border border-teal-900 bg-teal-100 px-3 py-2 font-sans dark:border-teal-100  dark:bg-teal-900 dark:text-teal-200">
            <p className="text-teal-900 dark:text-teal-100">
              {is_reply && (
                <>
                  <span className="mr-1 whitespace-nowrap text-yellow-600 dark:text-yellow-200">@{reply_to}</span>{' '}
                  <span>{message}</span>
                </>
              )}
              {!is_reply && <>{message}</>}
            </p>
          </div>
          {onHover && (
            <Tooltip title="Reply">
              <motion.button
                aria-label="Reply"
                initial={{ opacity: 0, transform: 'rotate(-45deg)' }}
                animate={{ opacity: 1, transform: 'rotate(0deg)' }}
                onClick={() => clickReply(name)}
              >
                <ImReply size={18} className="text-neutral-400" />
              </motion.button>
            </Tooltip>
          )}
        </div>
        <div className="flex items-center space-x-1 text-neutral-500">
          <div className="flex items-center space-x-1">
            <span className="text-xs">{name}</span>
            {isChatAuthor(email) && (
              <Tooltip title="Author">
                <VerifiedIcon size={15} className="text-blue-400" />
              </Tooltip>
            )}
          </div>
          <span>•</span>
          <span className="text-xs ">{time}</span>
        </div>
      </div>
      {canDeleteMessage && (
        <Tooltip title="Delete message">
          <button onClick={() => deleteMessage(id)} aria-label="Delete">
            <DeleteIcon size={15} className="text-red-500" />
          </button>
        </Tooltip>
      )}
    </motion.div>
  )
}
