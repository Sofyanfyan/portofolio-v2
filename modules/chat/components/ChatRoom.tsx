'use client'

import { type User, onAuthStateChanged, signInWithPopup, signOut as signOutFirebase } from 'firebase/auth'
import { useEffect, useState } from 'react'

import { tourChatRoom } from '@/common/constant/drivers'
import createDrivers from '@/common/libs/drivers'
import { auth, googleAuthProvider } from '@/common/libs/firebaseAuth'
import { IChatProfile } from '@/common/types/messages'

import useChat from '@/hooks/useChat'
import useHasMounted from '@/hooks/useHasMounted'
import { useNotif } from '@/hooks/useNotif'

import ChatAuth from './ChatAuth'
import ChatItem from './ChatItem'
import ChatItemSkeleton from './ChatItemSkeleton'

function getProfileFromGoogleUser(user: User): IChatProfile {
  return {
    uid: user.uid,
    name: user.displayName || user.email?.split('@')[0] || 'Google User',
    email: user.email || '',
    image: user.photoURL || ''
  }
}

export default function ChatRoom() {
  const mounted = useHasMounted()
  const [profile, setProfile] = useState<IChatProfile | null>(null)
  const [authLoading, setAuthLoading] = useState(true)
  const [currentTime, setCurrentTime] = useState(Date.now())
  const notif = useNotif()
  const { messages, loading, sendMessage, reply, cancleReply, deleteMessage, clickReply, chatListRef } = useChat({
    profile
  })
  const { runDriver, isProductTour } = createDrivers({ steps: tourChatRoom, product: 'chat-room', timing: 2000 })

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setProfile(user?.email ? getProfileFromGoogleUser(user) : null)
      setAuthLoading(false)
    })

    return () => unsubscribe()
  }, [])

  useEffect(() => {
    const interval = window.setInterval(() => {
      setCurrentTime(Date.now())
    }, 30000)

    return () => window.clearInterval(interval)
  }, [])

  async function signInWithGoogle() {
    try {
      await signInWithPopup(auth, googleAuthProvider)
    } catch {
      notif('Google sign-in failed. Please try again.')
    }
  }

  async function signOut() {
    try {
      await signOutFirebase(auth)
      cancleReply()
    } catch {
      notif('Sign out failed. Please try again.')
    }
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
              sessionUid={String(profile?.uid || '')}
              currentTime={currentTime}
              deleteMessage={deleteMessage}
              clickReply={clickReply}
            />
          ))
        )}
      </div>
      <ChatAuth
        profile={profile}
        authLoading={authLoading}
        signInWithGoogle={signInWithGoogle}
        signOut={signOut}
        sendMessage={sendMessage}
        reply={reply}
        cancleReply={cancleReply}
      />
    </div>
  )
}
