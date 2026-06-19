export const profile = {
  name: 'Shubham Kashikar',
  title: 'Senior Software Developer / Tech Lead',
  location: 'United States',
  email: 'shubhamkashikar.ars@gmail.com',
  github: 'https://github.com/skashika',
  linkedin: '#',
  summary:
    'Full-stack software developer and technical lead with 8+ years of experience building AI-powered kiosks, web applications, cloud APIs, admin dashboards, analytics platforms, and government technology solutions.',
  heroHighlights: ['Full Stack Engineering', 'AI & RAG Systems', 'GovTech / Court Kiosks', 'Cloud Architecture'],
};

export const stats = [
  { value: '8+', label: 'Years Experience' },
  { value: '3+', label: 'Team Leadership' },
  { value: '20+', label: 'Court / GovTech Deployments' },
  { value: 'End-to-End', label: 'Product Delivery' },
];

export const skillGroups = [
  {
    title: 'Frontend Engineering',
    skills: ['Vue 2/3', 'Vuetify 2/3', 'Vite', 'React', 'Material UI', 'Responsive UI', 'Kiosk UI', 'i18n / Multilingual UX'],
  },
  {
    title: 'Backend & APIs',
    skills: ['Node.js', 'Express', 'REST APIs', 'Java', 'Microservices', 'JWT', 'RBAC', 'Socket.io', 'API Security'],
  },
  {
    title: 'Databases & Data',
    skills: ['PostgreSQL', 'SQL', 'MongoDB', 'Firebase', 'Firestore', 'Supabase', 'Oracle SQL', 'Strapi', 'Data Migration'],
  },
  {
    title: 'Cloud & DevOps',
    skills: ['AWS', 'Google Cloud', 'DigitalOcean', 'App Engine', 'Cloud Run', 'Lambda', 'S3', 'GitHub', 'CI/CD', 'Vercel'],
  },
  {
    title: 'AI & Automation',
    skills: ['OpenAI API', 'RAG Pipelines', 'Pinecone', 'Embeddings', 'Prompt Engineering', 'Speech Recognition', 'Azure Speech', 'TensorFlow.js'],
  },
  {
    title: 'Integrations & Products',
    skills: ['Stripe', 'PayPal', 'QR Workflows', 'Hearing Lookup', 'E-Filing Help', 'Telepresence', 'Admin Dashboards', 'Analytics'],
  },
  {
    title: 'Kiosk & Hardware',
    skills: ['Electron', 'Windows Kiosk Mode', 'WebView', 'Printer Integration', 'Touchscreen Devices', 'Remote Config', 'Device Monitoring'],
  },
  {
    title: 'Leadership',
    skills: ['Solution Architecture', 'Client Delivery', 'Team Leadership', 'Code Reviews', 'Requirement Analysis', 'Production Support'],
  },
];

export const projects = [
  {
    title: 'FormFlow',
    category: 'AI Workflow Product',
    description:
      'A guided form-completion platform designed to help users complete complex forms through structured questions, intelligent validation, multilingual support, and secure session handling.',
    tags: ['Vue', 'Node.js', 'AI Assistant', 'Government Forms', 'Secure Sessions'],
  },
  {
    title: 'Court Kiosk Platform',
    category: 'GovTech / Self-Service',
    description:
      'Interactive kiosk and web platform for courts, counties, and public service locations with wayfinding, hearing lookup, QR access, multilingual FAQs, and remote configuration.',
    tags: ['Vue', 'Vuetify', 'PostgreSQL', 'Firebase', 'Electron', 'Kiosk Mode'],
  },
  {
    title: 'AI Knowledge Assistant',
    category: 'RAG / Search',
    description:
      'AI assistant using embeddings, vector search, strict response rules, and domain-specific knowledge bases to answer public-service questions accurately and consistently.',
    tags: ['OpenAI', 'Pinecone', 'RAG', 'Embeddings', 'Prompt Engineering'],
  },
  {
    title: 'Telepresence & Clerk Connect',
    category: 'Realtime Communication',
    description:
      'On-demand video and communication workflow connecting kiosk users with staff, including presence tracking, queue management, and realtime updates.',
    tags: ['Socket.io', 'Node.js', 'Vue', 'Firebase', 'Realtime'],
  },
  {
    title: 'Analytics & Session Intelligence',
    category: 'Data Platform',
    description:
      'Session analytics platform for kiosk utilization, user flows, language changes, action tracking, and client-level reporting across deployments.',
    tags: ['PostgreSQL', 'Python', 'Analytics', 'Dashboards', 'JSONB'],
  },
  {
    title: 'Enterprise Data & Microservices',
    category: 'Backend Engineering',
    description:
      'Built data migration, PL/SQL, Java microservices, BRMS workflows, and runtime data-fetch/scanner integrations in enterprise environments.',
    tags: ['Java', 'Microservices', 'SQL', 'PL/SQL', 'BRMS'],
  },
];

export const experience = [
  {
    role: 'Senior Software Developer / Solution Architect',
    company: 'Advanced Robot Solutions LLC',
    period: 'June 2022 – Present',
    points: [
      'Lead development of AI-powered kiosks, web applications, admin dashboards, and cloud APIs for courts and government clients.',
      'Architected products for hearing lookup, wayfinding, QR access, e-filing support, FormFlow, telepresence, analytics, and multilingual FAQ search.',
      'Implemented secure API patterns, RBAC, client-scoped permissions, database migrations, real-time configuration, and deployment workflows.',
    ],
  },
  {
    role: 'Full Stack Developer',
    company: 'Advanced Robot Solutions LLC',
    period: 'June 2021 – May 2022',
    points: [
      'Built kiosk/browser applications using Vue, Vuetify, Firebase, SQL databases, payment integrations, and realtime services.',
      'Developed analytics, video calling workflows, multilingual features, and integrations for public-facing service platforms.',
    ],
  },
  {
    role: 'Software Engineer',
    company: 'Tech Mahindra Pvt. Ltd.',
    period: 'July 2016 – June 2019',
    points: [
      'Worked on Java, microservices, Business Rule Management System, SQL, MongoDB, PL/SQL data migration, and production data workflows.',
      'Supported enterprise data processing, runtime integration, and backend service development.',
    ],
  },
];
