import Saweria from '@/components/elements/Saweria'
import TypeAnimation from '@/components/elements/TypeAnimation'

export default function Introduction() {
  return (
    <section className="space-y-2 bg-cover bg-no-repeat">
      <div className="flex items-center justify-between">
        <div className="font-sora flex gap-2 text-2xl font-bold lg:text-3xl 3xl:text-4xl">
          <TypeAnimation sequence={["Hi, I'm Achmad Sofyan", "Hi, I'm Fullstack Developer"]} delay={3000} />
        </div>
        <Saweria />
      </div>

      <div className="space-y-4 3xl:text-lg">
        <ul className="ml-5 flex list-disc flex-col gap-1 text-neutral-700 dark:text-neutral-400 lg:flex-row lg:gap-8">
          <li>Remote worker</li>
          <li>
            Based in Surabaya <span className="ml-1">🇮🇩</span>
          </li>
        </ul>
        <p className="leading-[1.8] text-neutral-800 dark:text-neutral-300 md:leading-loose">
          Full-Stack Developer with expertise in AI-driven platforms and scalable backend systems. Skilled in Laravel,
          Node.js, React, and AWS, with a strong focus on clean architecture, automation, and delivering
          high-performance, user-centric applications.
        </p>
      </div>
    </section>
  )
}
