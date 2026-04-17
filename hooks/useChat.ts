'use client'

import { serializeFirestoreDocument } from '@/services/firestore'
import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query } from 'firebase/firestore'
import { useEffect, useRef, useState } from 'react'

import { firestore } from '@/common/libs/firebase'
import { IChatProfile, IMessage } from '@/common/types/messages'

import { useNotif } from '@/hooks/useNotif'

export default function useChat({ profile }: { profile: IChatProfile | null }) {
  const [messages, setMessages] = useState<IMessage[]>([])
  const [loading, setLoading] = useState(true)
  const [reply, setReply] = useState({ isReply: false, name: '' })
  const [hasScrolledUp, setHasScrolledUp] = useState(false)
  const chatListRef = useRef<HTMLDivElement | null>(null)
  const notif = useNotif()

  async function sendMessage(message: string) {
    if (!profile) {
      return notif('Please fill your profile first')
    }

    await addDoc(collection(firestore, 'chat_messages'), {
      name: profile.name,
      email: profile.email,
      image: profile.image || '',
      message,
      created_at: new Date().toISOString(),
      is_show: true,
      is_reply: reply.isReply,
      reply_to: reply.name
    })
  }

  async function deleteMessage(id: string) {
    await deleteDoc(doc(firestore, 'chat_messages', id))
  }

  function clickReply(name: string) {
    if (!profile) return notif('Please fill your profile to reply')
    setReply({ isReply: true, name })
  }

  function cancleReply() {
    setReply({ isReply: false, name: '' })
  }

  useEffect(() => {
    const messagesQuery = query(collection(firestore, 'chat_messages'), orderBy('created_at', 'asc'))
    const unsubscribe = onSnapshot(messagesQuery, snapshot => {
      const transformMessages = snapshot.docs
        .map(item => serializeFirestoreDocument<IMessage>(item.id, item.data()))
        .filter(message => message.is_show)
      setMessages(transformMessages)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  useEffect(() => {
    if (chatListRef.current && !hasScrolledUp) {
      chatListRef.current.scrollTop = chatListRef.current.scrollHeight
    }
  }, [messages, hasScrolledUp])

  useEffect(() => {
    const handleScroll = () => {
      if (chatListRef.current) {
        const isScrolledToBottom =
          chatListRef.current.scrollHeight - chatListRef.current.clientHeight <= chatListRef.current.scrollTop + 5

        if (isScrolledToBottom) {
          setHasScrolledUp(false)
        } else {
          setHasScrolledUp(true)
        }
      }
    }

    chatListRef.current?.addEventListener('scroll', handleScroll)

    const currentChatListRef = chatListRef.current

    return () => {
      currentChatListRef?.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return { messages, loading, reply, sendMessage, deleteMessage, clickReply, cancleReply, chatListRef }
}
