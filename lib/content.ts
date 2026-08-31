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
 * `sound` plays on open and always stops when the dialog closes.
 * `soundSeconds` clips playback: the source file holds several meows, and
 * only the first one (roughly 0.7s) is wanted for a button press.
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
    // Rendered as a musical stave rather than a paragraph.
    staff: true,
    // Sourced from Pixabay, whose content licence permits commercial use
    // with no attribution required. Safe for a client business site.
    sound: "/meow.mp3",
    // Three meows: the recording has pauses at ~0.8s and ~1.8s.
    soundSeconds: 3.6,
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

// Projects grouped exactly as laid out in the design. A project gets `slug`
// and `image` once its case study exists; without them the card keeps the
// placeholder frame and links to the contact section.
type Project = {
  name: string;
  slug?: string;
  image?: string;
  tags: string[];
};

type ProjectGroup = {
  heading: string;
  accent: string;
  sub: string;
  projects: Project[];
};

export const projectGroups: ProjectGroup[] = [
  {
    heading: "Good ideas deserve",
    accent: "great branding",
    sub: "We co-create brands with founders who think beyond the ordinary.",
    projects: [
      {
        name: "From Mani",
        slug: "from-mani",
        image: "/projects/from-mani/thumb.jpg",
        tags: ["Brand Strategy", "Brand Identity", "Packaging Design"],
      },
      {
        name: "Spice Cabinet",
        slug: "spice-cabinet",
        image: "/projects/spice-cabinet/thumb.jpg",
        tags: ["Brand Strategy", "Brand Identity", "Packaging Design"],
      },
      {
        name: "Wild Cup Coffee Roasters",
        slug: "wild-cup",
        image: "/projects/wild-cup/thumb.jpg",
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
        slug: "burghar",
        image: "/projects/burghar/thumb.jpg",
        tags: ["Brand Identity", "Packaging Design", "Menu Design"],
      },
      {
        name: "Lush House",
        slug: "lush-house",
        image: "/projects/lush-house/thumb.jpg",
        tags: ["Brand Strategy", "Brand Identity", "Packaging Design"],
      },
      {
        name: "Wahid Marketing",
        slug: "wahid-marketing",
        image: "/projects/wahid-marketing/thumb.jpg",
        tags: ["Brand Identity", "Instore Design"],
      },
    ],
  },
  {
    heading: "From “Who's that?” to",
    accent: "“I know this brand.”",
    sub: "We make your brand impossible to scroll past.",
    projects: [
      {
        name: "Adorn Silver",
        slug: "adorn-silver",
        tags: ["Brand Strategy", "Social Campaigns", "Product Photography"],
      },
      {
        name: "303 Coffee",
        slug: "303-coffee",
        tags: ["Social Campaigns", "Brand Strategy"],
      },
      {
        name: "R. Mayur Kala",
        slug: "mayur-kala",
        tags: ["Brand Strategy", "Social Campaigns", "Product Photography"],
      },
    ],
  },
];

/**
 * Real client quotes only. While this is empty the whole "What they say
 * about us" section is hidden rather than showing placeholder names to
 * visitors — add entries in this shape and it reappears:
 *
 *   { quote: "…", name: "Priya Shah", role: "Founder, Adorn Silver" }
 */
export const testimonials: { quote: string; name: string; role: string }[] = [];

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

/**
 * Case studies.
 *
 * `panelCount`/`panelPath` are the deck artwork in order, exported from the
 * studio's presentation and stacked seamlessly on the project page.
 *
 * `posts` is for social-media work: each entry is one Instagram post or reel.
 * We deliberately link out rather than using Instagram's official embed —
 * embeds drag in their own chrome, expose like counts, cost a request each,
 * and go blank if a post is ever deleted or an ad blocker is on.
 *
 * `cover` is a still exported from the post (4:5, e.g. "/projects/x/01.jpg").
 * Instagram login-walls its pages, so covers can't be fetched automatically —
 * a tile without one renders as a labelled frame that still links out.
 */
export const caseStudies = {
  "from-mani": {
    name: "FROM MĀNI",
    client: "Maanavi Homes",
    location: "Surat",
    year: "2025",
    discipline: "Brand Identity Design",
    summary:
      "The logo for FROM MĀNI has been designed to embody the brand's essence of refined minimalism, warmth, and timeless luxury. As a curator of meaningful objects for the home, the identity reflects both the intimacy of a personal touch and the sophistication of global design.",
    tags: ["Brand Strategy", "Brand Identity", "Packaging Design"],
    panelCount: 10,
    panelPath: "/projects/from-mani",
  },
  "spice-cabinet": {
    name: "The Spice Cabinet",
    client: "The Spice Cabinet",
    location: "",
    year: "2025",
    discipline: "Branding and Packaging Design",
    summary:
      "At the heart of The Spice Cabinet lies a story as comforting as a home-cooked meal, a story of a mother and daughter who turned their shared love for authentic Indian flavors into something truly special. Born in the mother's kitchen, every recipe carries with it a pinch of nostalgia, a dash of warmth, and the promise of quality. What started as a collection of homemade spice blends soon grew into a brand built on trust, authenticity, and love — the kind that reminds you of your mom's cooking, no matter where you are.",
    tags: ["Brand Strategy", "Brand Identity", "Packaging Design"],
    panelCount: 9,
    panelPath: "/projects/spice-cabinet",
  },
  "wild-cup": {
    name: "The Wild Cup",
    client: "The Wild Cup",
    location: "Nagpur, Maharashtra",
    year: "2025",
    discipline: "Brand Identity Design",
    summary:
      "At The Wild Cup, we believe that the origin of coffee and the origin of human instinct are deeply intertwined. Both begin in the wild — untamed, raw, and rooted. Our caf\u00e9 and roastery is built on the idea that coffee isn't just a drink, but a way to return to the core of who we are. The Wild Cup invites you to slow down, reconnect, and sip into something primal — a cup that awakens not only your senses but your spirit. We swap the noise for nature.",
    tags: ["Brand Strategy", "Brand Identity", "Packaging Design", "Social Media"],
    panelCount: 12,
    panelPath: "/projects/wild-cup",
  },
  burghar: {
    name: "BURGHAR",
    client: "Burghar",
    location: "",
    year: "2026",
    discipline: "Brand Identity",
    summary:
      "BURGHAR is not just a burger joint. It's a house of flavour. Built from the wordplay Bur + Ghar (\u0918\u0930), the name itself defines the brand's soul: global burgers, desi heart. A place where big, juicy burgers meet the unapologetic chaos of Indian street food culture. We don't do subtle. We do bold buns, messy sauces, real meat, loud colours and zero tolerance for bland.",
    tags: ["Brand Identity", "Packaging Design", "Menu Design"],
    panelCount: 8,
    panelPath: "/projects/burghar",
  },
  "lush-house": {
    name: "Lush House",
    client: "Lush House In-between",
    location: "",
    year: "2024",
    discipline: "Brand Identity, Illustrations & Art Direction",
    summary:
      "Lush House brings together comforting tastes from across the world, thoughtfully made and gently served. At Lush House, slow living is not an idea, it's a feeling. It lives in unhurried mornings, lingering conversations, and food made with patience and care. This is a space designed to pause, breathe, and be present, where time softens and everyday moments feel gently held.",
    tags: ["Brand Strategy", "Brand Identity", "Packaging Design"],
    panelCount: 10,
    panelPath: "/projects/lush-house",
  },
  "adorn-silver": {
    name: "Adorn Silver",
    client: "Adorn Silver",
    location: "",
    year: "2025",
    discipline: "Social Media Design & Art Direction",
    summary:
      "Silver jewellery lives or dies on how it catches the light — and on a feed, you get one scroll-length to prove it. We built Adorn Silver a social language of close-up product photography, considered styling and a consistent grid, so every post reads as the same brand before the caption is ever opened.",
    tags: ["Brand Strategy", "Social Campaigns", "Product Photography"],
    postsHeading: "Selected social work",
    postsSub: "Tap any piece to open it on Instagram.",
    profile: "https://www.instagram.com/adornsilver.co",
    posts: [
      {
        url: "https://www.instagram.com/reel/DJOqFFIJV5Z/",
        type: "reel",
        caption: "Manufacturing of a silver biscuit",
        cover: "/projects/adorn-silver/silver-biscuit.jpg",
        video: "/projects/adorn-silver/silver-biscuit",
      },
      {
        url: "https://www.instagram.com/p/DTnOBTrCRnE/",
        type: "post",
        caption: "Anna",
        cover: "/projects/adorn-silver/post.jpg",
      },
      {
        url: "https://www.instagram.com/reel/Da-dx-vs7vO/",
        type: "reel",
        caption: "Nok Jhok",
        cover: "/projects/adorn-silver/nok-jhok.jpg",
        video: "/projects/adorn-silver/nok-jhok",
      },
      {
        url: "https://www.instagram.com/reel/DLuojaKpmR4/",
        type: "reel",
        caption: "Yin Yang",
        cover: "/projects/adorn-silver/yin-yang.jpg",
        video: "/projects/adorn-silver/yin-yang",
      },
    ],
  },
  "303-coffee": {
    name: "303 Coffee",
    client: "Three Not Three Coffee",
    location: "",
    year: "2025",
    discipline: "Social Media Design & Campaign Art Direction",
    summary:
      "A coffee brand's feed has to do what its counter does: make you want the next cup. We work with 303 in drops — each one a self-contained campaign with its own look, built so the launch lands as an event rather than another post in the grid.",
    tags: ["Social Campaigns", "Brand Strategy"],
    postsHeading: "Selected social work",
    postsSub: "Tap any piece to open it on Instagram.",
    profile: "https://www.instagram.com/threenotthreecoffee",
    posts: [
      {
        url: "https://www.instagram.com/reel/DXMk0aLjAW2/",
        type: "reel",
        caption: "Aam Teaser",
        cover: "/projects/303-coffee/mango-teaser.jpg",
        video: "/projects/303-coffee/mango-teaser",
      },
      {
        url: "https://www.instagram.com/p/DX9Iv-Bj-lr/",
        type: "post",
        caption: "Aam Drop pictures",
        cover: "/projects/303-coffee/aam-market.jpg",
      },
      {
        url: "https://www.instagram.com/reel/DbQEv6CPpGp/",
        type: "reel",
        caption: "Bean Drop",
        cover: "/projects/303-coffee/bean-drop.jpg",
        video: "/projects/303-coffee/bean-drop",
      },
      {
        url: "https://www.instagram.com/reel/Daz46c5Pr4X/",
        type: "reel",
        caption: "Dear Forks",
        cover: "/projects/303-coffee/dear-forks.jpg",
        video: "/projects/303-coffee/dear-forks",
      },
    ],
  },
  "wahid-marketing": {
    name: "Wahid Marketing",
    client: "Wahid Marketing",
    location: "",
    year: "2025",
    discipline: "Brand Identity Design",
    summary:
      "Plumbing under one roof. The word \u201cWahid\u201d is set in a bold serif, for strength, reliability and trustworthiness, with a subtle detail between the \u2018a\u2019 and the \u2018h\u2019 that reads as connection \u2014 the seamless flow of solutions the brand provides. \u201cMarketing\u201d sits beneath in a clean sans, balancing modernity with professionalism. The interplay of serif and sans reflects tradition blended with modernity, much like Wahid Marketing\u2019s own approach of combining experience, integrity and innovation. The structured box mirrors their systematic processes, while the water drop conveys solution-oriented clarity.",
    tags: ["Brand Identity", "Instore Design"],
    panelCount: 8,
    panelPath: "/projects/wahid-marketing",
    panelWidth: 1320,
    panelHeight: 1259,
  },
  "mayur-kala": {
    name: "R. Mayur Kala",
    client: "R. Mayur Kala",
    location: "",
    year: "2025",
    discipline: "Social Media Design & Product Photography",
    summary:
      "Good work deserves to be seen properly. For R. Mayur Kala we built a social presence around short-form video — shot close, lit to show the detail, and cut so the first second of a reel earns the rest of it.",
    tags: ["Brand Strategy", "Social Campaigns", "Product Photography"],
    postsHeading: "Selected social work",
    postsSub: "Tap any piece to open it on Instagram.",
    profile: "https://www.instagram.com/rmayurkala",
    posts: [
      {
        url: "https://www.instagram.com/reel/DW8Q1auD_yA/",
        type: "reel",
        caption: "Pooja in the spotlight",
        cover: "/projects/mayur-kala/pooja.jpg",
        video: "/projects/mayur-kala/pooja",
      },
      {
        url: "https://www.instagram.com/reel/DQLdGmUj5Xs/",
        type: "reel",
        caption: "Lotus",
        cover: "/projects/mayur-kala/lotus.jpg",
        video: "/projects/mayur-kala/lotus",
      },
      {
        url: "https://www.instagram.com/reel/DV3IJZZjUlJ/",
        type: "reel",
        caption: "Fruits",
        cover: "/projects/mayur-kala/fruits.jpg",
        video: "/projects/mayur-kala/fruits",
      },
      {
        url: "https://www.instagram.com/reel/DVBVlKqjanV/",
        type: "reel",
        caption: "Curtains",
        cover: "/projects/mayur-kala/curtains.jpg",
        video: "/projects/mayur-kala/curtains",
      },
    ],
  },
} as const;
