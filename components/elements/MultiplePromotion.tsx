import { IAdsBanner } from '@/common/types/ads'

interface MultiplePromotionProps {
  data?: IAdsBanner[]
}

export default function MultiplePromotion({ data }: MultiplePromotionProps) {
  void data
  return null
}
