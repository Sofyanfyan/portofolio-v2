import Link from 'next/link'

import { BsPatchCheck as CertificateIcon } from 'react-icons/bs'
import { FiExternalLink } from 'react-icons/fi'

import { Card } from '@/components/elements/Card'
import Image from '@/components/elements/Image'
import { Button } from '@/components/ui/button'

import { getCloudinaryUrl } from '@/common/libs/cloudinary'
import { ICertificate } from '@/common/types/certificates'

export default function CertificateCard({ from, link, logo, name }: ICertificate) {
  return (
    <Card className="overflow-hidden rounded-l-sm rounded-r-xl border border-l-0 border-neutral-300 bg-white px-5 py-4 !shadow-none transition-all duration-300 dark:border-neutral-700 dark:bg-neutral-950">
      <div className="flex min-w-0 items-start justify-between gap-4">
        <div className="min-w-0 flex-1 space-y-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400">
              <CertificateIcon className="text-sm" />
              Certificate
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">{name}</h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">{from}</p>
          </div>

          <div>
            <Button asChild size="sm" variant="outline" className="gap-2 rounded-full px-4">
              <Link href={link} target="_blank" rel="noopener noreferrer">
                Show Credential
                <FiExternalLink className="text-sm" />
              </Link>
            </Button>
          </div>
        </div>

        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-neutral-200 bg-gradient-to-br from-neutral-50 to-neutral-100 shadow-sm dark:border-neutral-800 dark:from-neutral-900 dark:to-neutral-950">
          {logo ? (
            <Image src={getCloudinaryUrl(logo)} width={36} height={36} alt={name} className="object-contain" />
          ) : (
            <CertificateIcon className="text-[22px] text-neutral-500 dark:text-neutral-300" />
          )}
        </div>
      </div>
    </Card>
  )
}
