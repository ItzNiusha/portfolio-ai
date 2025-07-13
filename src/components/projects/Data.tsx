import Image from 'next/image';
import { Image as Img } from 'lucide-react';
import { ChevronRight, Link } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { url } from 'inspector';

// Enhanced project content array with all projects
const PROJECT_CONTENT = [
  {
    title: 'Discord Bot',
    description:
      'Developed an open-source music bot for Discord using JavaScript and Node.js, supporting playback from multiple platforms. Implemented features for seamless music management, enhancing user engagement.',
    techStack: [
      'Node.js',
      'Discord.js',
      'ytdl-core',
      'Discord API',
      'JavaScript',
      'PostgreSQL',
      'Jest',
    ],
    date: '2025',
    links: [
      {
        name: 'Usage tutorial',
        url: '',
      },
    ],
    images: [
      {
        src: '/discord-1.png',
        alt: 'Discord landing page',
      },
      {
        src: '/discord-2.png',
        alt: 'Discord chat interface',
      },
    ],
  },
  {
    title: 'Old Portfolio',
    description:
      'My previous traditional portfolio built with pure HTML, CSS, and JavaScript. It features a smooth, interactive user experience with custom-designed UI components, responsive layouts, and engaging visual effects. This project showcases my ability to deliver clean, modern front-end solutions.',
    techStack: ['HTML', 'CSS', 'JavaScript', 'GitHub Actions'],
    date: '2024',
    links: [
      {
        name: 'Website',
        url: 'https://itzniusha.github.io/portfolio-pra/',
      },
      {
        name: 'GitHub',
        url: 'https://github.com/ItzNiusha/portfolio-pra',
      },
    ],
    images: [
      {
        src: '/old-portfolio-1.png',
        alt: 'Old Portfolio landing page',
      },
      {
        src: '/old-portfolio.png',
        alt: 'Old Portfolio projects',
      },
      {
        src: '/old-portfolio-2.png',
        alt: 'Old Portfolio projects',
      },
    ],
  },

  {
    title: 'Quiz Planet',
    description:
      'I developed Quiz Planet, an Android quiz app with vibrant space-themed visuals and interactive multiple-choice questions. Building it helped me master Kotlin and Java, implement user authentication, and work with Firebase for real-time data. I learned to design responsive UIs and add custom animations for a lively user experience. This project strengthened my skills in mobile development and applying clean code principles.',
    techStack: [
      'Kotlin',
      'OOP',
      'MVP',
      'Firebase',
      'Android SDK',
      'CI/CD',
      'GitHub Actions',
      'Java',
      'JSON',
    ],
    date: '2024',
    links: [
      {
        name: 'GitHub',
        url: 'https://github.com/ItzNiusha/quiz-planet',
      },
    ],
    images: [
      {
        src: '/quiz1.jpeg',
        alt: 'Quiz main page',
      },
      {
        src: '/quiz2.jpeg',
        alt: 'Quiz game',
      },
    ],
  },
  {
    title: 'Practice Portfolio',
    description:
      "A simple portfolio built with HTML, CSS, JavaScript, and Three.js. I created it mainly to experiment with different JavaScript frameworks, and through it, I discovered a real interest in 3D with Three.js. Though it's not fully finished, there's a quiet beauty in its simplicity and the process taught me a lot.",
    techStack: [
      'HTML',
      'CSS',
      'JavaScript',
      'Three.js',
      'GitHub Actions',
      'CI/CD',
    ],
    date: '2024',

    links: [
      {
        name: 'website',
        url: 'https://itzniusha.github.io/dev-portfolio-practice/',
      },
      {
        name: 'github',
        url: 'https://github.com/ItzNiusha/dev-portfolio-practice',
      },
    ],
    images: [
      {
        src: '/pc-pf-1.png',
        alt: 'Pf main page',
      },
      {
        src: '/pc-pf-2.png',
        alt: 'Pf about page',
      },
      {
        src: '/pc-pf-3.png',
        alt: 'Pf projects page',
      },
    ],
  },
];

// Define interface for project prop
interface ProjectProps {
  title: string;
  description?: string;
  techStack?: string[];
  date?: string;
  links?: { name: string; url: string }[];
  images?: { src: string; alt: string }[];
}

const ProjectContent = ({ project }: { project: ProjectProps }) => {
  // Find the matching project data
  const projectData = PROJECT_CONTENT.find((p) => p.title === project.title);

  if (!projectData) {
    return <div>Project details not available</div>;
  }

  return (
    // ADDED: Force dark background and theme for the card
    <div className="space-y-10 rounded-3xl bg-[#18181b] p-4 text-neutral-100 shadow-xl md:p-8">
      {/* Header section with description */}
      <div className="rounded-3xl bg-[#232326] p-8 dark:bg-[#232326]">
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-sm text-neutral-400">
            <span>{projectData.date}</span>
          </div>

          <p className="font-sans text-base leading-relaxed text-neutral-100 md:text-lg">
            {projectData.description}
          </p>

          {/* Tech stack */}
          <div className="pt-4">
            <h3 className="mb-3 text-sm tracking-wide text-neutral-400 uppercase">
              Technologies
            </h3>
            <div className="flex flex-wrap gap-2">
              {projectData.techStack.map((tech, index) => (
                <span
                  key={index}
                  className="rounded-full border border-[#343438] bg-[#232326] px-3 py-1 text-sm text-neutral-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Links section */}
      {projectData.links && projectData.links.length > 0 && (
        <div className="mb-24">
          <div className="mb-4 flex items-center gap-2 px-6">
            <h3 className="text-sm tracking-wide text-neutral-400">Links</h3>
            <Link className="text-muted-foreground w-4 text-neutral-400" />
          </div>
          <Separator className="my-4 bg-[#343438]" />
          <div className="space-y-3">
            {projectData.links.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between rounded-xl bg-[#232326] p-4 transition-colors hover:bg-[#29292d]"
              >
                <span className="font-light text-neutral-100 capitalize">
                  {link.name}
                </span>
                <ChevronRight className="h-4 w-4 text-neutral-400 transition-transform group-hover:translate-x-1" />
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Images gallery */}
      {projectData.images && projectData.images.length > 0 && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-4">
            {projectData.images.map((image, index) => (
              <div
                key={index}
                className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-[#232326]"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-contain transition-transform"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Main data export with updated content
export const data = [
  {
    category: 'Side Project',
    title: 'Discord Bot',
    src: '/bot-preview.png',
    content: <ProjectContent project={{ title: 'Discord Bot' }} />,
  },
  {
    category: 'Web Development',
    title: 'Old Portfolio',
    src: '/old-pf-prev-2.png',
    content: <ProjectContent project={{ title: 'Old Portfolio' }} />,
  },
  {
    category: 'App Development',
    title: 'Quiz Planet',
    src: '/quiz-preview-1.png',
    content: <ProjectContent project={{ title: 'Quiz Planet' }} />,
  },

  {
    category: 'For Practice',
    title: 'Portfolio',
    src: '/smile-prev-2.png',
    content: <ProjectContent project={{ title: 'Practice Portfolio' }} />,
  },
];
