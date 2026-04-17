import EmptyState from '@/components/elements/EmptyState'
import { motion } from 'framer-motion'

import { BlogItem } from '@/common/types/blog'
import { ILearn } from '@/common/types/learn'

import LearnSubContentItem from './LearnSubContentItem'

interface ContentListsProps {
  content: ILearn
  articles: BlogItem[]
}
export default function ContentLists({ content, articles }: ContentListsProps) {
  const learns = [...articles].sort((firstItem, secondItem) => {
    const firstDate = new Date(firstItem.created_at).getTime()
    const secondDate = new Date(secondItem.created_at).getTime()
    return firstDate - secondDate
  })

  if (learns.length === 0) {
    return <EmptyState message="No Data" />
  }

  return (
    <div className="flex flex-col gap-3">
      {learns?.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <LearnSubContentItem
            parent={content.title}
            contentSlug={content?.slug}
            subContentSlug={item?.slug}
            title={item.title}
            language={content.language}
            difficulty={content.level}
            postId={item.id}
          />
        </motion.div>
      ))}
    </div>
  )
}
