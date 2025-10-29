 

const person = {
  firstName: "TABET",
  lastName: "Alaaddine",
  get name() {
    return `${this.firstName} ${this.lastName}`;
  },
  role: "Software Engineer | DevOps | AWS | AZURE | ERP & CRM - Service now, SAP -",
  avatar: "/images/avatar.jpeg",
  email: "alta.tabet@gmail.com",
  location: "Casablanca,Morocco",
  languages: ["English", "Frensh", "Arabe"],
};

const newsletter = {
  display: true,
  title: <>Subscribe to {person.firstName}'s Newsletter</>,
  description: (
    <>
      I occasionally write about AI, technology, and share thoughts on the intersection of
      creativity and engineering.
    </>
  ),
};

const social = [
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/TABET-Alaa",
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/alaaddine-tabet-9010241aa/",
  },
  {
    name: "X",
    icon: "x",
    link: "",
  },
  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
  },
];

const home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Home",
  title: `${person.name}'s Portfolio`,
  description: `Portfolio website showcasing my work as a ${person.role}`,
  headline: <>Building scalable systems for the enterprise world</>,
  featured: {
    display: true,
    title: <>Explore my <strong className="ml-4">Technology Stack</strong></>,
    href: "/#technologies",
  },
  subline: (
    <>
      I'm Alaaddine TABET, focused on monolith-to-microservices migration, cloud technologies, and ERP systems for enterprise applications.
    </>
  ),
};
/* I'm [Your Name], a final-year CS student focused on cloud, microservices, and enterprise systems like ERP. I learn by building. */
const about = {
  path: "/about",
  label: "About",
  title: `About – ${person.name}`,
  description: `Meet ${person.name}, ${person.role} from ${person.location}`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: true,
    link: `mailto:${person.email}`,
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        I am a passionate software developer and fifth-year computer engineering 
        student specializing in DevOps methodologies, cloud technologies (AWS 
        and Azure), and ERP systems such as ServiceNow and SAP. My work focuses 
        on bridging the gap between development and operations while exploring 
        the transformative potential of intelligent automation and cloud-driven 
        solutions. Currently seeking opportunities to apply my technical expertise
         in innovative environments, I thrive on solving complex challenges 
         through automation, continuous integration, and scalable system design. 
         I bring a rigorous, adaptable approach to modern technology challenges, 
         with a strong drive to learn and contribute to ambitious projects that 
         push the boundaries of what's possible in the DevOps, cloud, and ERP 
         landscape.
      </>
    ),
  },
  work: {
    display: true, 
    title: "Work Experience",
    experiences: [
           {
  company: "Digitalia Solutions",
  timeframe: "Juillet 2025 - Septembre 2025",
  role: " Ingénieur Full Stack",
  achievements: [
    <>
    Design and development of an HR mini-ERP for SMEs, including modules for leave management, absence tracking, time tracking, and document generation .
    </>,
    <>
      Built with Spring Boot (backend), Angular (frontend), and PostgreSQL.
    </>,
    <>
      Delivered a functional prototype automating HR workflows and providing a clean, intuitive user interface.
    </>,
  ],
  images: [],
},
      {
  company: "FINATECH GROUP",
  timeframe: "Avril 2024 - Juin 2024",
  role: "Intégrateur de Solutions IT",
  achievements: [
    <>
      Étude et mise en place d'un système de gestion de suivi des tickets et incidents basé sur la solution open-source GLPI, remplaçant le système manuel Excel.
    </>,
    <>
      Configuration technique avancée : OAuth avec Gmail, notifications personnalisées, arborescence clients et génération de rapports statistiques pour l'amélioration continue du service.
    </>,
  ],
  images: [],
},
{
  company: "GRENER HOLDING",
  timeframe: "Avril 2023 - Juin 2023",
  role: "Frontend Développeur",
  achievements: [
    <>
      Conception et développement d'un Energy Management System IoT pour l'Industrie 4.0 utilisant React.js, Tailwind CSS et Django REST API.
    </>,
    <>
      Création de tableaux de bord interactifs pour le monitoring en temps réel de la consommation énergétique et collaboration avec les équipes pour définir le cahier des charges.
    </>,
  ],
  images: [],
},
    ],
  },
  studies: {
    display: true, // set to false to hide this section
    title: "Studies",
    institutions: [
      {
        name: "Ecole Marocaine des Sciences d'Ingénieur (EMSI)",
        description: <>Engineering Cycle in Computer Methods Applied to Business Management (MIAGE) (2024-2026).</>,
      },
      {
        name: "Ecole Supérieure de Technologie Casa (ESTC)",
        description: <>Professional License in Software Engineering & Systems and Network Administration (2023-2024). </>,
      },
      {
        name: "Ecole Supérieure de Technologie Casa (ESTC)",
        description: <>D.U.T in Computer Engineering (2021-2023).</>,
      },
    ],
  },
  technical: {
    display: false, // set to false to hide this section
    title: "Technical skills",
    skills: [
      {
        title: "Figma",
        description: <>Able to prototype in Figma with Once UI with unnatural speed.</>,
        // optional: leave the array empty if you don't want to display images
        images: [
          {
            src: "/images/projects/project-01/cover-02.jpg",
            alt: "Project image",
            width: 16,
            height: 9,
          },
          {
            src: "/images/projects/project-01/cover-03.jpg",
            alt: "Project image",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        title: "Next.js",
        description: <>Building next gen apps with Next.js + Once UI + Supabase.</>,
        // optional: leave the array empty if you don't want to display images
        images: [
          {
            src: "/images/projects/project-01/cover-04.jpg",
            alt: "Project image",
            width: 16,
            height: 9,
          },
        ],
      },
    ],
  },
};

const blog = {
  path: "/blog",
  label: "Blog",
  title: "Writing about design and tech...",
  description: `Read what ${person.name} has been up to recently`,
  // The full examples moved to /blogexample; /blog shows a simple example
};

const work = {
  path: "/work",
  label: "Work",
  title: `Projects – ${person.name}`,
  description: `Professional projects and work by ${person.name}`,
  // Create new project pages by adding a new .mdx file to app/work/projects
  // All projects will be listed on the /home and /work routes
};

const gallery = {
  path: "/gallery",
  label: "Gallery",
  title: `Photo gallery – ${person.name}`,
  description: `A photo collection by ${person.name}`,
  // Images by https://lorant.one
  // These are placeholder images, replace with your own
  images: [
    {
      src: "/images/gallery/horizontal-1.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/horizontal-2.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/horizontal-3.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/horizontal-4.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-1.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/vertical-2.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/vertical-3.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/vertical-4.jpg",
      alt: "image",
      orientation: "vertical",
    },
  ],
};

const certifications = {
  path: "/certifications",
  label: "Certifications",
  title: `Certifications – ${person.name}`,
  description: `Professional certifications and credentials held by ${person.name}`,
};

export { person, social, newsletter, home, about, blog, work, gallery, certifications };
