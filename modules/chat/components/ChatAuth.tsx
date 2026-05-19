import { Button } from '@/components/ui/button'
import { FaSignOutAlt as SignOutIcon } from 'react-icons/fa'
import { FcGoogle as GoogleIcon } from 'react-icons/fc'

import { IChatProfile, IReply } from '@/common/types/messages'

import ChatAvatar from './ChatAvatar'
import ChatInput from './ChatInput'

interface ChatAuthProps {
  profile: IChatProfile | null
  authLoading: boolean
  signInWithGoogle: () => void
  signOut: () => void
  sendMessage: (message: string) => Promise<void> | void
  reply: IReply
  cancleReply: () => void
}

export default function ChatAuth({
  profile,
  authLoading,
  signInWithGoogle,
  signOut,
  reply,
  sendMessage,
  cancleReply
}: ChatAuthProps) {
  if (authLoading) {
    return (
      <div className="rounded-xl border border-neutral-200 p-4 text-sm text-neutral-600 dark:border-neutral-800 dark:text-neutral-300">
        Checking Google session...
      </div>
    )
  }

  return (
    <>
      {profile ? (
        <div>
          <ChatInput sendMessage={sendMessage} reply={reply} cancleReply={cancleReply} />
          <div className="mt-6 flex items-center justify-between text-sm">
            <div className=" flex items-center space-x-2 text-neutral-500">
              <ChatAvatar name={profile.name} image={profile.image} size={36} />
              <div className="flex flex-col">
                <span>{profile.name}</span>
                <span className="text-xs font-thin">{profile.email}</span>
              </div>
            </div>
            <button
              onClick={signOut}
              className="flex items-center space-x-2 text-xs text-red-500"
              aria-label="Sign out"
            >
              <span>Sign out</span>
              <SignOutIcon size={14} />
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-3 rounded-xl border border-neutral-200 p-4 dark:border-neutral-800">
          <p className="text-sm text-neutral-600 dark:text-neutral-200">Sign in with Google to join the chat room.</p>
          <Button
            id="google-sign-in"
            type="button"
            variant="outline"
            className="gap-2 bg-white text-neutral-800 dark:bg-neutral-950 dark:text-neutral-100"
            onClick={signInWithGoogle}
          >
            <GoogleIcon size={18} />
            Continue with Google
          </Button>
        </div>
      )}
    </>
  )
}
