import SectionHeading from '@/components/elements/SectionHeading'
import SectionSubHeading from '@/components/elements/SectionSubHeading'
import { BsPatchCheck as CertificateIcon } from 'react-icons/bs'

import { ICertificate } from '@/common/types/certificates'

import CertificateCard from './CertificateCard'

export default function CertificateList({ certificates }: { certificates: ICertificate[] }) {
  const sortedCertificates = [...certificates].sort((a, b) => {
    if (a.id == null) return 1
    if (b.id == null) return -1
    return b.id.localeCompare(a.id, undefined, { numeric: true, sensitivity: 'base' })
  })

  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <SectionHeading title="Certificates" icon={<CertificateIcon className="mr-1" />} />
        <SectionSubHeading>
          <p className="dark:text-neutral-400">Selected certifications and completed credentials</p>
        </SectionSubHeading>
      </div>

      {sortedCertificates.length > 0 ? (
        <div className="grid gap-5 md:grid-cols-2">
          {sortedCertificates.map((certificate, index) => (
            <CertificateCard key={certificate.id ?? `${certificate.name}-${certificate.from}-${index}`} {...certificate} />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-neutral-300 px-5 py-6 text-sm leading-6 text-neutral-600 dark:border-neutral-700 dark:text-neutral-400">
          Add documents to the <code>certificates</code> Firestore collection using the fields <code>from</code>,{' '}
          <code>link</code>, <code>logo</code>, and <code>name</code>.
        </div>
      )}
    </section>
  )
}
