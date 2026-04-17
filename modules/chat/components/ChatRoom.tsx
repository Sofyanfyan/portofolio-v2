'use client'

import { useEffect, useState } from 'react'

import { tourChatRoom } from '@/common/constant/drivers'
import createDrivers from '@/common/libs/drivers'
import { IChatProfile } from '@/common/types/messages'

import useChat from '@/hooks/useChat'
import useHasMounted from '@/hooks/useHasMounted'

import ChatAuth from './ChatAuth'
import ChatItem from './ChatItem'
import ChatItemSkeleton from './ChatItemSkeleton'

const CHAT_PROFILE_STORAGE_KEY = 'codebayu-chat-profile'

export default function ChatRoom() {
  const mounted = useHasMounted()
  const [profile, setProfile] = useState<IChatProfile | null>(null)
  const { messages, loading, sendMessage, reply, cancleReply, deleteMessage, clickReply, chatListRef } = useChat({
    profile
  })
  const { runDriver, isProductTour } = createDrivers({ steps: tourChatRoom, product: 'chat-room', timing: 2000 })

  useEffect(() => {
    const savedProfile = localStorage.getItem(CHAT_PROFILE_STORAGE_KEY)
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile))
    }
  }, [])

  function saveProfile(nextProfile: IChatProfile) {
    localStorage.setItem(CHAT_PROFILE_STORAGE_KEY, JSON.stringify(nextProfile))
    setProfile(nextProfile)
  }

  function clearProfile() {
    localStorage.removeItem(CHAT_PROFILE_STORAGE_KEY)
    setProfile(null)
  }

  if (mounted && isProductTour) {
    runDriver()
  }

  return (
    <div>
      <div
        ref={chatListRef}
        className="no-scrollbar mb-4 h-[60vh] space-y-4 overflow-y-auto scroll-smooth border-b border-neutral-200 pb-2 dark:border-neutral-700 md:h-[65vh] 3xl:h-[75dvh]"
      >
        {loading ? (
          <ChatItemSkeleton />
        ) : (
          messages?.map(message => (
            <ChatItem
              key={message.id}
              {...message}
              sessionEmail={String(profile?.email || '')}
              deleteMessage={deleteMessage}
              clickReply={clickReply}
            />
          ))
        )}
      </div>
      <ChatAuth
        profile={profile}
        saveProfile={saveProfile}
        clearProfile={clearProfile}
        sendMessage={sendMessage}
        reply={reply}
        cancleReply={cancleReply}
      />
    </div>
  )
}
