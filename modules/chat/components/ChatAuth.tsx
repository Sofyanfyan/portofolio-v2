import InputField from '@/components/elements/InputField'
import { useForm } from 'react-hook-form'
import { FaSignOutAlt as SignOutIcon } from 'react-icons/fa'

import { IChatProfile, IReply } from '@/common/types/messages'

import ChatInput from './ChatInput'

interface ChatProfileForm {
  name: string
  email: string
}

interface ChatAuthProps {
  profile: IChatProfile | null
  saveProfile: (profile: IChatProfile) => void
  clearProfile: () => void
  sendMessage: (message: string) => void
  reply: IReply
  cancleReply: () => void
}
function getInitials(name: string) {
  return name
    .split(' ')
    .slice(0, 2)
    .map(item => item.charAt(0).toUpperCase())
    .join('')
}

export default function ChatAuth({
  profile,
  saveProfile,
  clearProfile,
  reply,
  sendMessage,
  cancleReply
}: ChatAuthProps) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ChatProfileForm>({
    defaultValues: {
      name: profile?.name || '',
      email: profile?.email || ''
    }
  })

  return (
    <>
      {profile ? (
        <div>
          <ChatInput sendMessage={sendMessage} reply={reply} cancleReply={cancleReply} />
          <div className="mt-6 flex items-center justify-between text-sm">
            <div className=" flex items-center space-x-2 text-neutral-500">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-200 text-xs font-semibold text-neutral-700 dark:bg-neutral-800 dark:text-neutral-200">
                {getInitials(profile.name)}
              </div>
              <div className="flex flex-col">
                <span>{profile.name}</span>
                <span className="text-xs font-thin">{profile.email}</span>
              </div>
            </div>
            <button
              onClick={clearProfile}
              className="flex items-center space-x-2 text-xs text-red-500"
              aria-label="Reset profile"
            >
              <span>Reset</span>
              <SignOutIcon size={14} />
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit(saveProfile)} className="space-y-3 rounded-xl border p-4 dark:border-neutral-800">
          <p className="text-sm text-neutral-600 dark:text-neutral-200">Fill in your profile to join the chat</p>
          <InputField register={register} name="name" error={errors} rule={{ required: true }} />
          <InputField
            register={register}
            name="email"
            error={errors}
            rule={{
              required: true,
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'email is invalid'
              }
            }}
          />
          <button className="rounded-lg bg-neutral-700 px-4 py-2 text-sm text-white dark:bg-neutral-200 dark:text-black">
            Save Profile
          </button>
        </form>
      )}
    </>
  )
}
