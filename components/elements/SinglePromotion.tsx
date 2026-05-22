import { IAdsBanner } from '@/common/types/ads'

interface SinglePromotionProps {
  data?: IAdsBanner
}

export default function SinglePromotion({ data }: SinglePromotionProps) {
  void data
  return null
}
