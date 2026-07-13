export interface StatItem {
  value: string;
  label: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
  color: string;
}

export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  category: string;
}

export interface TestimonialItem {
  id: string;
  quote: string;
  name: string;
  role: string;
  rating: number;
  avatar: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export const companyData = {
  name: "ThePaintGuy",
  tagline: "Premium Painting Services",
  phone: "+1 (555) 234-5678",
  email: "hello@thepaintguy.com",
  address: "1234 Paint Street, Suite 100, Austin, TX 78701",
  hours: "Mon–Fri: 8AM – 6PM | Sat: 9AM – 3PM",
  social: {
    instagram: "#",
    facebook: "#",
    twitter: "#",
    linkedin: "#",
  },
};

export const navItems: NavItem[] = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Gallery", href: "#gallery" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export const stats: StatItem[] = [
  { value: "15+", label: "Years Experience" },
  { value: "2,500+", label: "Projects Completed" },
  { value: "98%", label: "Happy Clients" },
  { value: "4.9", label: "Five Star Reviews" },
];

export const services: ServiceItem[] = [
  {
    id: "residential",
    title: "Residential",
    description:
      "Transform your home with our expert residential painting services. From single rooms to complete home makeovers.",
    icon: "home",
    color: "#4361ee",
  },
  {
    id: "commercial",
    title: "Commercial",
    description:
      "Professional painting solutions for offices, retail spaces, and commercial properties that leave lasting impressions.",
    icon: "building",
    color: "#e94560",
  },
  {
    id: "interior",
    title: "Interior",
    description:
      "Precise interior painting with premium finishes, accent walls, and custom color consultations.",
    icon: "palette",
    color: "#f0a500",
  },
  {
    id: "exterior",
    title: "Exterior",
    description:
      "Durable exterior coatings that protect and beautify your property against the elements.",
    icon: "sun",
    color: "#2ec4b6",
  },
];

export const processSteps: ProcessStep[] = [
  {
    step: 1,
    title: "Preparation",
    description:
      "We carefully prepare every surface — patching, sanding, and priming to ensure a flawless foundation.",
    color: "#4361ee",
  },
  {
    step: 2,
    title: "Priming",
    description:
      "A quality primer seals surfaces and provides the perfect base for vibrant, long-lasting color.",
    color: "#e94560",
  },
  {
    step: 3,
    title: "Painting",
    description:
      "Our skilled artisans apply each coat with precision, using premium paints for a stunning finish.",
    color: "#f0a500",
  },
  {
    step: 4,
    title: "Inspection",
    description:
      "A thorough quality inspection ensures every detail meets our exacting standards.",
    color: "#2ec4b6",
  },
  {
    step: 5,
    title: "Cleanup",
    description:
      "We leave your space spotless, with only beautiful new walls to show for our visit.",
    color: "#4361ee",
  },
];

export const galleryItems: GalleryItem[] = [
  { id: "g1", src: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=600&h=400&fit=crop", alt: "Modern living room with accent wall", category: "Interior" },
  { id: "g2", src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=400&fit=crop", alt: "Exterior home painting", category: "Exterior" },
  { id: "g3", src: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop", alt: "Commercial office space", category: "Commercial" },
  { id: "g4", src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=400&fit=crop", alt: "Luxury home exterior", category: "Exterior" },
  { id: "g5", src: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop", alt: "Cozy bedroom renovation", category: "Interior" },
  { id: "g6", src: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&h=400&fit=crop", alt: "Modern house with fresh paint", category: "Residential" },
  { id: "g7", src: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&h=400&fit=crop", alt: "Interior detail work", category: "Interior" },
  { id: "g8", src: "https://images.unsplash.com/photo-1600573472591-ee6981cf81d6?w=600&h=400&fit=crop", alt: "Fresh exterior coat", category: "Exterior" },
];

export const testimonials: TestimonialItem[] = [
  {
    id: "t1",
    quote:
      "Absolutely stunning transformation. The team was professional, punctual, and the quality exceeded our expectations.",
    name: "Sarah Mitchell",
    role: "Homeowner, Austin",
    rating: 5,
    avatar: "SM",
  },
  {
    id: "t2",
    quote:
      "They completely revitalized our office space. Our clients constantly compliment the fresh, modern look.",
    name: "David Chen",
    role: "CEO, TechStart Inc.",
    rating: 5,
    avatar: "DC",
  },
  {
    id: "t3",
    quote:
      "From color consultation to final touches, every detail was perfect. Worth every penny.",
    name: "Emily Rodriguez",
    role: "Interior Designer",
    rating: 5,
    avatar: "ER",
  },
];

export const galleryCategories = ["All", "Interior", "Exterior", "Commercial", "Residential"];
