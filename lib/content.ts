// ============================================================
// Content for Artistically Yours — taken from the client's
// design PDF. All copy lives here so it's easy to update.
// ============================================================

export const site = {
  name: "Artistically Yours",
  email: "artisticallyyours01@gmail.com",
  phone: "+91 9588472910",
  // Any entry left as "#" renders as plain text rather than a dead link.
  socials: [
    { label: "instagram", href: "https://www.instagram.com/artisticallyyours" },
    {
      label: "linkedin",
      href: "https://www.linkedin.com/company/artisticallyyours/",
    },
  ],
};

export const nav = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/#projects" },
  { label: "About us", href: "/about" },
];

export const hero = {
  line1: "Build what you're",
  accent: "proud",
  line1End: "of.",
  line2: "We'll help the world see it.",
};

/**
 * The two "press here" buttons under the hero. Each opens a small dialog.
 * `sound` is played if the matching file exists in /public — drop in
 * meow.mp3 to give the meow button audio; without it the dialog is silent.
 */
export const heroPrompts = [
  {
    id: "english",
    label: "for English",
    body: "Two creatives, one cat, too much coffee, and a shared obsession with building brands that people love.",
  },
  {
    id: "meow",
    label: "for Meow",
    body: "Meow meow, mrrrow meow — meow meow meow, mrow mrow, and meeeow meow purr meow meow meow meow.",
    sound: "/meow.mp3",
  },
];

// Big ghost word behind the services stack
export const servicesGhost = "artistically yours";

// `lines` are rendered one per line, matching the line breaks in the design.
export const services = [
  {
    title: "Brand Identity",
    lines: [
      "Your visuals set the vibe before you ever say hello.",
      "They should feel like you, not just look good.",
      "We believe every element should have a purpose, because the best brands are built with intention, not decoration.",
    ],
    tags: [
      "Logo Kit",
      "Colour Palette",
      "Font Suite",
      "Brand Pattern",
      "Stationery",
      "More",
    ],
  },
  {
    title: "Packaging",
    lines: [
      "We try to hit three core principles when it comes to packaging design:",
    ],
    bullets: ["Built with purpose", "Designed to connect", "Made to last"],
    tags: ["Concepts", "Dieline Design", "Illustrated Artwork"],
  },
  {
    title: "Socials",
    lines: [
      "Your audience is already scrolling.",
      "We make sure they stop, notice, and remember your brand.",
    ],
    tags: ["Concepts", "Unique To You", "Reels", "Design Posts"],
  },
  {
    title: "UI/UX Design",
    lines: [
      "Design isn't just how it looks.",
      "It's how it works, how it feels, and how effortlessly people move through it.",
    ],
    tags: ["Website", "Experience", "UI/UX"],
  },
];

// Projects grouped exactly as laid out in the design.
export const projectGroups = [
  {
    heading: "Good ideas deserve",
    accent: "great branding",
    sub: "We co-create brands with founders who think beyond the ordinary.",
    projects: [
      {
        name: "From Mani",
        tags: ["Brand Strategy", "Brand Identity", "Packaging Design"],
      },
      {
        name: "Spice Cabinet",
        tags: ["Brand Strategy", "Brand Identity", "Packaging Design"],
      },
      {
        name: "Wild Cup Coffee Roasters",
        tags: [
          "Brand Strategy",
          "Brand Identity",
          "Packaging Design",
          "Social Media",
        ],
      },
    ],
  },
  {
    heading: "We take what's familiar and make it",
    accent: "unforgettable",
    sub: "A thoughtful refresh can change everything.",
    projects: [
      {
        name: "Burghar",
        tags: ["Brand Identity", "Packaging Design", "Menu Design"],
      },
      {
        name: "Lush House",
        tags: ["Brand Strategy", "Brand Identity", "Packaging Design"],
      },
      { name: "Wahid Marketing", tags: ["Brand Identity", "Instore Design"] },
    ],
  },
  {
    heading: "From “Who's that?” to",
    accent: "“I know this brand.”",
    sub: "We make your brand impossible to scroll past.",
    projects: [
      {
        name: "Adorn Silver",
        tags: ["Brand Strategy", "Social Campaigns", "Product Photography"],
      },
      { name: "303 Coffee", tags: ["Social Campaigns", "Brand Strategy"] },
      {
        name: "R. Mayur Kala",
        tags: ["Brand Strategy", "Social Campaigns", "Product Photography"],
      },
    ],
  },
];

export const testimonials = [
  {
    quote:
      "Working together was a genuine pleasure — our vision became a digital experience beyond what we imagined.",
    name: "Client Name",
    role: "designation",
  },
  {
    quote:
      "Working together was a genuine pleasure — our vision became a digital experience beyond what we imagined.",
    name: "Client Name",
    role: "designation",
  },
];

// Wordmarks stand in for client logos — swap for real SVGs.
export const clientLogos = [
  "Bica",
  "Nine Eight",
  "White Tiger",
  "Aeromist",
  "Innerhood",
  "Emrld",
  "Saaqi",
  "Bonte",
];

export const contact = {
  heading: "Let's Talk",
  sub: "Have a project you'd like our eyes on? Tell us more.",
  bell: "Ring Our Bell",
  // Paste the free access key from https://web3forms.com (generated with
  // artisticallyyours01@gmail.com) to start receiving enquiries by email.
  // While this is empty the form stays in demo mode and sends nothing.
  web3formsKey: "7d519e19-3a4c-4577-a1f8-4e13b6f50835",
};

export const about = {
  headingLines: ["Designing brands with heart, soul", "& a hint of chaos."],
  // Each group is a spaced paragraph; entries inside a group sit on their own
  // line with no gap, matching the breaks in the design.
  paragraphs: [
    [
      "Artistically Yours began with two people who believed good brands deserve more than good design.",
    ],
    [
      "Kajal sees the world through colour, composition, and endless “what if's.” She's the creative force behind every identity we build, obsessing over the tiny details that make brands feel unforgettable.",
    ],
    [
      "Shreyans is the calm to Kajal's creative chaos. While ideas fly around the studio, he keeps everything moving, from operations and strategy to social media, making sure every project reaches the finish line beautifully.",
      "Together, we believe branding isn't just about looking good. It's about making people feel something.",
    ],
    [
      "And then there's Zeppelin, or Zepu as everyone calls him. Our resident supervisor, occasional keyboard sitter, and the inspiration behind our mascot. If you've spotted a little cat around our brand, now you know why.",
    ],
    [
      "We run on coffee, curiosity, honest conversations, and the excitement of building brands that people remember long after the first hello. Because at the end of the day, we're not just designing identities. We're helping people fall in love with their own businesses again.",
    ],
  ],
};

export const success = {
  // "Success," is set in the italic accent face, as in the design.
  headingAccent: "Success,",
  headingLine2: "to us, is simple.",
  lines: [
    "It's when people can't stop talking about your brand. Because we know the answer isn't luck.",
    "It's thoughtful strategy, meaningful design, and a team that cared about your business as much as you do.",
  ],
  closingBefore: "After all, that's what being ",
  closingAccent: "Artistically Yours",
  closingAfter: " means.",
};
