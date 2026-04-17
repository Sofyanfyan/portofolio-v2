import { BiLogoPostgresql } from 'react-icons/bi'
import { BsFillBootstrapFill } from 'react-icons/bs'
import {
  SiChakraui,
  SiExpo,
  SiExpress,
  SiFirebase,
  SiFramer,
  SiGithub,
  SiGraphql,
  SiJavascript,
  SiJest,
  SiJson,
  SiLaravel,
  SiLivewire,
  SiMongodb,
  SiMui,
  SiNextdotjs,
  SiNodedotjs,
  SiPhp,
  SiPrisma,
  SiReact,
  SiReacthookform,
  SiReactquery,
  SiReactrouter,
  SiReacttable,
  SiRedux,
  SiSass,
  SiTailwindcss,
  SiTypescript,
  SiVite,
  SiVuedotjs
} from 'react-icons/si'

type stacksProps = {
  [key: string]: JSX.Element
}

const iconSize = '100%'

export const STACKS: stacksProps = {
  PHP: <SiPhp size={iconSize} className="text-blue-500" />,
  JavaScript: <SiJavascript size={iconSize} className="text-yellow-400" />,
  TypeScript: <SiTypescript size={iconSize} className="text-blue-400" />,
  'Next.js': <SiNextdotjs size={iconSize} />,
  'React.js': <SiReact size={iconSize} className="text-sky-500" />,
  TailwindCSS: <SiTailwindcss size={iconSize} className="text-cyan-300" />,
  Bootstrap: <BsFillBootstrapFill size={iconSize} className="text-purple-500" />,
  GraphQL: <SiGraphql size={iconSize} className="text-pink-600" />,
  'Material UI': <SiMui size={iconSize} className="text-sky-400" />,
  Vite: <SiVite size={iconSize} className="text-purple-500" />,
  PostgreSql: <BiLogoPostgresql size={iconSize} className="text-blue-400" />,
  ChakraUI: <SiChakraui size={iconSize} className="text-teal-500" />,
  'React Native': <SiReact size={iconSize} className="text-sky-600" />,
  Expo: <SiExpo size={iconSize} />,
  Livewire: <SiLivewire size={iconSize} className="text-pink-500" />,
  SASS: <SiSass size={iconSize} className="text-pink-600" />,
  Firebase: <SiFirebase size={iconSize} className="text-yellow-500" />,
  Laravel: <SiLaravel size={iconSize} className="text-red-600" />,
  'Framer Motion': <SiFramer size={iconSize} />,
  'Vue.js': <SiVuedotjs size={iconSize} className="text-green-500" />,
  Jest: <SiJest size={iconSize} className="text-orange-600" />,
  'Express.js': <SiExpress size={iconSize} />,
  Redux: <SiRedux size={iconSize} className="text-purple-500" />,
  'React Query': <SiReactquery size={iconSize} className="text-red-600" />,
  Prisma: <SiPrisma size={iconSize} className="text-teal-500" />,
  'Node JS': <SiNodedotjs size={iconSize} className="text-green-600" />,
  Github: <SiGithub size={iconSize} />,
  'React Router': <SiReactrouter size={iconSize} className="text-pink-500" />,
  'React Hook Form': <SiReacthookform size={iconSize} className="text-pink-500" />,
  'React Table': <SiReacttable size={iconSize} className="text-rose-600" />,
  Json: <SiJson className="text-neutral-700" />,
  Mongodb: <SiMongodb size={iconSize} className="text-green-600" />
}
