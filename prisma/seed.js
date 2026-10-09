const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting Struggle of Students (SS) Database Seed...');

  // 1. Clear existing records for a fresh clean state
  await prisma.meetingRegistration.deleteMany({});
  await prisma.onlineMeeting.deleteMany({});
  await prisma.volunteerApplication.deleteMany({});
  await prisma.event.deleteMany({});
  await prisma.opportunityApplication.deleteMany({});
  await prisma.opportunity.deleteMany({});
  await prisma.serviceEnquiry.deleteMany({});
  await prisma.service.deleteMany({});
  await prisma.placement.deleteMany({});
  await prisma.teamMember.deleteMany({});
  await prisma.communityMember.deleteMany({});
  await prisma.contactMessage.deleteMany({});
  await prisma.announcement.deleteMany({});
  await prisma.admin.deleteMany({});

  // 2. Admin User
  const passwordHash = await bcrypt.hash('admin_ss_secret_2026', 10);
  const admin = await prisma.admin.create({
    data: {
      name: 'SS Core Administration',
      email: 'admin@struggleofstudents.org',
      passwordHash: passwordHash,
      role: 'SUPERADMIN',
    },
  });
  console.log(`✅ Admin created: ${admin.email}`);

  // 3. Announcements
  await prisma.announcement.createMany({
    data: [
      {
        title: 'SS Annual Flagship Summit 2026 Announced!',
        content: 'Join 2,500+ students across 40+ colleges for two days of tech talks, cultural jams, and career networking.',
        badgeText: 'FLAGSHIP EVENT',
        linkUrl: '/events',
        priority: 1,
      },
      {
        title: 'SS Internship & Placement Cohort 4 is Now Open!',
        content: 'Free 1-on-1 resume reviews and direct referrals to top tech startups and MNCs for all community members.',
        badgeText: 'CAREER UPDATE',
        linkUrl: '/opportunities',
        priority: 2,
      },
    ],
  });

  // 4. Team Members & Leadership
  const teamData = [
    {
      name: 'Aryan Sharma',
      designation: 'Founder & Community President',
      department: 'LEADERSHIP',
      responsibilities: 'Strategic vision, campus outreach partnerships, overall ecosystem leadership, and student advocacy.',
      bio: 'Final year engineering student passionate about solving real campus problems. Founded Struggle of Students (SS) to give students an authentic platform to learn, perform, and land top careers.',
      photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
      college: 'Delhi Technological University (DTU)',
      linkedinUrl: 'https://linkedin.com/in/aryan-sharma-ss',
      githubUrl: 'https://github.com/aryansharma',
      instagramUrl: 'https://instagram.com/aryansharma.ss',
      orderIndex: 1,
      isActive: true,
      isLeadership: true,
    },
    {
      name: 'Riya Sen',
      designation: 'Co-Founder & Director of Operations',
      department: 'LEADERSHIP',
      responsibilities: 'Overseeing inter-college chapters, volunteer logistics, partner college coordination, and annual conventions.',
      bio: 'Passionate community builder and public speaker with experience managing 100+ on-ground student volunteers across universities.',
      photoUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80',
      college: 'Netaji Subhas University of Technology (NSUT)',
      linkedinUrl: 'https://linkedin.com/in/riya-sen',
      instagramUrl: 'https://instagram.com/riya.sen',
      orderIndex: 2,
      isActive: true,
      isLeadership: true,
    },
    {
      name: 'Kabir Verma',
      designation: 'Lead, SS Band & Creative Director',
      department: 'CREATIVE_BAND',
      responsibilities: 'Leading the musical troupe, college fest live performances, sound curation, jam sessions, and band bookings.',
      bio: 'Multi-instrumentalist and lead vocalist. Kabir leads the official SS Band that rocks stages at major college fests and cultural nights.',
      photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
      college: 'Faculty of Music & Fine Arts, DU',
      instagramUrl: 'https://instagram.com/kabirvermamusic',
      orderIndex: 3,
      isActive: true,
      isLeadership: true,
    },
    {
      name: 'Devansh Malhotra',
      designation: 'Head of SS IT Solutions & Tech Lead',
      department: 'TECH_DEV',
      responsibilities: 'Architecture of SS web platforms, open-source community projects, student software consulting, and hackathons.',
      bio: 'Full-stack builder and open-source contributor. Empowers students to build real software for campuses and local businesses.',
      photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
      college: 'IIT Delhi',
      githubUrl: 'https://github.com/devanshmalhotra',
      linkedinUrl: 'https://linkedin.com/in/devansh-malhotra',
      orderIndex: 4,
      isActive: true,
      isLeadership: false,
    },
    {
      name: 'Ananya Mukherjee',
      designation: 'Director of Placement & Corporate Relations',
      department: 'LEADERSHIP',
      responsibilities: 'Industry tie-ups, off-campus drive referrals, alumni mentorship cohorts, and interview preparation clinics.',
      bio: 'Placed at Microsoft; now mentors hundreds of tier-2 and tier-3 college students on coding DSA and system design interviews.',
      photoUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80',
      college: 'IIIT Hyderabad',
      linkedinUrl: 'https://linkedin.com/in/ananya-mukherjee',
      orderIndex: 5,
      isActive: true,
      isLeadership: true,
    },
    {
      name: 'Rohan Mehra',
      designation: 'Head of SS Event Management',
      department: 'EVENTS',
      responsibilities: 'College fest stage design, artist coordination, audio-visual technical setups, crowd management, and sports tournaments.',
      bio: 'Master of high-energy college fests. Has coordinated events with 5,000+ attendees without a glitch.',
      photoUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=600&q=80',
      college: 'Thapar Institute of Engineering and Technology',
      instagramUrl: 'https://instagram.com/rohan_mehra_events',
      orderIndex: 6,
      isActive: true,
      isLeadership: false,
    },
    {
      name: 'Sneha Patel',
      designation: 'Lead, Student Problems & Guidance Cell',
      department: 'OPERATIONS',
      responsibilities: 'Student grievance peer support, academic counseling, anti-ragging helpline coordination, and mental health workshops.',
      bio: 'Psychology & law student dedicated to providing a safe, confidential space for student challenges and rights.',
      photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80',
      college: 'National Law University',
      linkedinUrl: 'https://linkedin.com/in/sneha-patel-guidance',
      orderIndex: 7,
      isActive: true,
      isLeadership: false,
    },
    {
      name: 'Aditya Kashyap',
      designation: 'Head of Public Relations & Campus Chapters',
      department: 'PR_OUTREACH',
      responsibilities: 'Campus ambassador network across 45+ colleges, media coverage, brand sponsorships, and social media buzz.',
      bio: 'Digital storytelling specialist and growth hacker. Scaled SS community from 200 to 5,000+ active student members.',
      photoUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80',
      college: 'Shaheed Sukhdev College of Business Studies',
      instagramUrl: 'https://instagram.com/aditya_kashyap',
      orderIndex: 8,
      isActive: true,
      isLeadership: false,
    },
  ];

  for (const member of teamData) {
    await prisma.teamMember.create({ data: member });
  }
  console.log(`✅ Seeded ${teamData.length} team & leadership members.`);

  // 5. Events & Volunteering
  const events = [
    {
      title: 'SS HackNite 2026: 36-Hour National Student Hackathon',
      slug: 'ss-hacknite-2026',
      description: 'The premier national student hackathon bringing together 500+ builders, designers, and innovators. Tracks include AI/ML, Decentralized Web, HealthTech, and Campus Automation with a prize pool of ₹2,50,000+.',
      shortDescription: 'Build real-world solutions in 36 hours. Cash prizes, direct startup interviews, and free swag for all participants.',
      category: 'TECH',
      bannerUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80',
      eventDate: new Date('2026-11-15T09:00:00Z'),
      time: '09:00 AM - 09:00 PM (36 Hours)',
      venue: 'Main Auditorium & Innovation Center, North Campus, New Delhi',
      mode: 'HYBRID',
      registrationLink: 'https://forms.gle/ss-hacknite-2026',
      volunteerCapacity: 12,
      volunteerSlotsFilled: 5,
      isFeatured: true,
      isPublished: true,
      deadline: new Date('2026-11-05T23:59:59Z'),
      requirements: 'Open to all undergraduate & postgraduate students. Basic knowledge of logistics, technical moderation, or crowd management.',
    },
    {
      title: 'Acoustic Euphoria: Annual Battle of College Bands',
      slug: 'acoustic-euphoria-2026',
      description: 'Headlined by the official SS Band! Top 12 college rock and indie bands battle it out on stage for the champion trophy, recording studio vouchers, and cash awards.',
      shortDescription: 'Electrifying live performances, food stalls, and an evening of pure musical passion created for student music lovers.',
      category: 'CULTURAL',
      bannerUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80',
      eventDate: new Date('2026-11-28T17:00:00Z'),
      time: '05:00 PM - 10:30 PM',
      venue: 'Open Air Amphitheatre, South Campus',
      mode: 'OFFLINE',
      registrationLink: 'https://forms.gle/ss-acoustic-euphoria',
      volunteerCapacity: 8,
      volunteerSlotsFilled: 8, // Fully filled to demonstrate "Volunteer Slots Full" feature!
      isFeatured: true,
      isPublished: true,
      deadline: new Date('2026-11-20T23:59:59Z'),
      requirements: 'Stage coordination, artist green room management, sound desk support, and entrance ticketing.',
    },
    {
      title: 'Off-Campus Tech Placement BootCamp & Mock Day',
      slug: 'off-campus-tech-placement-bootcamp',
      description: 'Intensive 2-day hands-on workshop covering high-frequency LeetCode patterns, system design fundamentals, resume restructuring, and 1-on-1 mock interviews with engineers from Google, Amazon, and Uber.',
      shortDescription: 'Master the off-campus placement strategy and get your resume directly shortlisted at top tier product companies.',
      category: 'WORKSHOP',
      bannerUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80',
      eventDate: new Date('2026-12-05T10:00:00Z'),
      time: '10:00 AM - 05:00 PM',
      venue: 'Virtual & Seminar Hall B',
      mode: 'HYBRID',
      registrationLink: 'https://forms.gle/ss-placement-bootcamp',
      volunteerCapacity: 6,
      volunteerSlotsFilled: 2,
      isFeatured: false,
      isPublished: true,
      deadline: new Date('2026-11-30T23:59:59Z'),
      requirements: 'Tech room moderators, attendance management, speaker host assistance.',
    },
  ];

  for (const ev of events) {
    const createdEvent = await prisma.event.create({ data: ev });
    // Seed some initial volunteer applications
    if (ev.slug === 'acoustic-euphoria-2026') {
      for (let i = 1; i <= 8; i++) {
        await prisma.volunteerApplication.create({
          data: {
            eventId: createdEvent.id,
            fullName: `Volunteer ${i}`,
            email: `volunteer${i}@college.edu`,
            phone: `+91 98765 4321${i}`,
            college: 'Delhi University',
            branchYear: 'B.Sc / 2nd Year',
            skills: 'Stage Management, Sound Check',
            motivation: 'Love live concerts and want to support SS Band!',
            status: 'APPROVED',
          },
        });
      }
    } else if (ev.slug === 'ss-hacknite-2026') {
      for (let i = 1; i <= 5; i++) {
        await prisma.volunteerApplication.create({
          data: {
            eventId: createdEvent.id,
            fullName: `Student Volunteer ${i}`,
            email: `hackvolunteer${i}@tech.edu`,
            phone: `+91 98123 4567${i}`,
            college: 'DTU',
            branchYear: 'B.Tech CSE / 3rd Year',
            skills: 'Discord moderation, Registration Desk',
            motivation: 'Excited to help organize a 36-hour hackathon!',
            status: 'APPROVED',
          },
        });
      }
    }
  }
  console.log(`✅ Seeded ${events.length} events with volunteer capacity and registrations.`);

  // 6. Opportunities Hub
  const opportunities = [
    {
      title: 'Full-Stack Software Engineer Intern (Next.js & TypeScript)',
      slug: 'full-stack-intern-ss-tech',
      organization: 'SS IT Solutions & Partner Tech Labs',
      category: 'INTERNSHIP',
      location: 'New Delhi / Remote',
      type: 'HYBRID',
      stipendOrPerks: '₹25,000 / month + Certificate + PPO Opportunity',
      deadline: new Date('2026-11-25T23:59:59Z'),
      eligibility: 'Open to pre-final and final year B.Tech/BCA/MCA students with good React, Node.js, and SQL fundamentals.',
      description: 'Work alongside senior engineers building web products used by over 50,000 students across partner colleges. Build real features, write clean test-driven code, and contribute to open-source student tooling.',
      responsibilities: 'Build responsive Next.js frontend pages, craft robust REST/GraphQL APIs, optimize database queries, write unit tests.',
      skillsRequired: 'Next.js, TypeScript, Tailwind CSS, PostgreSQL/SQLite, Git, REST APIs',
      isOpen: true,
      featured: true,
    },
    {
      title: 'SS Campus Ambassador & College Chapter Lead 2026-27',
      slug: 'ss-campus-ambassador-2026',
      organization: 'Struggle of Students (SS) Community',
      category: 'CAMPUS_AMBASSADOR',
      location: 'Your College Campus',
      type: 'REMOTE',
      stipendOrPerks: 'Monthly performance stipend up to ₹8,000 + Leadership LOR + Free Event Passes',
      deadline: new Date('2026-12-10T23:59:59Z'),
      eligibility: '1st, 2nd, or 3rd year students passionate about community building, events, and networking.',
      description: 'Be the official voice of SS in your college! Organize campus meetups, introduce students to exclusive placement cohorts, coordinate band shows, and build your university chapter.',
      responsibilities: 'Represent SS at college clubs, drive event registrations, coordinate student feedback, lead on-campus flash jams.',
      skillsRequired: 'Communication, Event Coordination, Social Media Outreach, Team Leadership',
      isOpen: true,
      featured: true,
    },
    {
      title: 'UI/UX Product Designer (Design System & Mobile)',
      slug: 'ui-ux-product-designer',
      organization: 'SS Creative Lab',
      category: 'PROJECT',
      location: 'Remote',
      type: 'REMOTE',
      stipendOrPerks: '₹18,000 / month + Design Portfolio Showcase',
      deadline: new Date('2026-11-20T23:59:59Z'),
      eligibility: 'Passionate student designers with Figma portfolio demonstrating web/mobile wireframes and prototypes.',
      description: 'Redesign student tools and event portals with modern, youthful Gen-Z visual flair, micro-interactions, and accessible typography.',
      responsibilities: 'Create Figma design components, conduct user testing with campus students, hand off specs to frontend developers.',
      skillsRequired: 'Figma, Design Systems, Wireframing, Prototyping, Modern Typography',
      isOpen: true,
      featured: false,
    },
    {
      title: 'Live Stage Sound Engineer & Vocalist Auditions',
      slug: 'ss-band-vocalist-audition',
      organization: 'SS Band Official',
      category: 'TALENT_SHOWCASE',
      location: 'New Delhi Studio & College Fests',
      type: 'ONSITE',
      stipendOrPerks: 'Paid Gig Honorarium per concert + Tour Travel + Recording Credits',
      deadline: new Date('2026-11-18T23:59:59Z'),
      eligibility: 'Student musicians: Vocalists, Drummers, Bassists, and Synthesizer players currently enrolled in college.',
      description: 'Audition for the core performing roster of SS Band for the upcoming winter college fest season spanning 15+ university stages.',
      responsibilities: 'Attend weekly band rehearsals, perform at college fests and charity concerts, collaborate on original student singles.',
      skillsRequired: 'Musical proficiency, Stage presence, Harmony singing, Improvisation',
      isOpen: true,
      featured: true,
    },
    {
      title: 'Community Mental Wellness & Peer Support Fellow',
      slug: 'peer-support-fellow',
      organization: 'SS Student Guidance Cell',
      category: 'LEADERSHIP',
      location: 'Remote & Campus Helpdesk',
      type: 'REMOTE',
      stipendOrPerks: 'Certificate of Student Advocacy + Formal Peer Counseling Training',
      deadline: new Date('2026-12-01T23:59:59Z'),
      eligibility: 'Empathetic students interested in psychology, student welfare, or community service.',
      description: 'Provide an active listening ear, guide fellow students dealing with exam stress or hostel adaptation, and triage cases to certified counselors.',
      responsibilities: 'Host weekly anonymous peer check-in circles, share stress-management guides, uphold absolute confidentiality.',
      skillsRequired: 'Active listening, Empathy, Discretion, Emotional intelligence',
      isOpen: true,
      featured: false,
    },
  ];

  for (const opp of opportunities) {
    await prisma.opportunity.create({ data: opp });
  }
  console.log(`✅ Seeded ${opportunities.length} opportunities.`);

  // 7. Verified Placements Showcase
  const placements = [
    {
      studentName: 'Tanya Bansal',
      college: 'Indira Gandhi Delhi Technical University for Women (IGDTUW)',
      degree: 'B.Tech CSE',
      batchYear: '2025',
      company: 'Google',
      companyLogoUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg',
      role: 'Software Development Engineer (SWE)',
      packageLpa: '₹45 LPA',
      placementType: 'FULL_TIME',
      verified: true,
      testimonial: 'The SS DSA Bootcamp and mock interviews with seniors completely removed my fear of system design rounds. Forever grateful to the SS community!',
    },
    {
      studentName: 'Kartik Singhal',
      college: 'Netaji Subhas University of Technology (NSUT)',
      degree: 'B.Tech IT',
      batchYear: '2025',
      company: 'Microsoft',
      companyLogoUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg',
      role: 'Software Engineer',
      packageLpa: '₹51.02 LPA',
      placementType: 'FULL_TIME',
      verified: true,
      testimonial: 'Connecting with alumni mentors through SS gave me direct referral access that I couldn’t get from regular off-campus portals.',
    },
    {
      studentName: 'Amanpreet Singh',
      college: 'Delhi Technological University (DTU)',
      degree: 'B.Tech Software Engineering',
      batchYear: '2025',
      company: 'Amazon',
      companyLogoUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
      role: 'Software Development Engineer I',
      packageLpa: '₹34 LPA',
      placementType: 'FULL_TIME',
      verified: true,
      testimonial: 'From participating in SS HackNite to securing an SDE role at Amazon, SS gave me the confidence and portfolio to stand out.',
    },
    {
      studentName: 'Prachi Saxena',
      college: 'Vellore Institute of Technology (VIT)',
      degree: 'B.Tech CSE',
      batchYear: '2026',
      company: 'Atlassian',
      companyLogoUrl: 'https://cdn.iconscout.com/icon/free/png-256/free-atlassian-logo-icon-download-in-svg-png-gif-file-formats--technology-social-media-company-brand-vol-1-pack-logos-icons-2944747.png',
      role: 'Product Engineering Intern (PPO)',
      packageLpa: '₹1.5L / month + PPO (₹57 LPA)',
      placementType: 'INTERNSHIP_PPO',
      verified: true,
      testimonial: 'The resume review from SS mentors doubled my callback rate. Got the Atlassian intern offer within two weeks!',
    },
    {
      studentName: 'Raghav Aggarwal',
      college: 'Guru Gobind Singh Indraprastha University (GGSIPU)',
      degree: 'B.Tech CSE',
      batchYear: '2025',
      company: 'Morgan Stanley',
      companyLogoUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/34/Morgan_Stanley_Logo_1.svg',
      role: 'Technology Analyst',
      packageLpa: '₹26.5 LPA',
      placementType: 'FULL_TIME',
      verified: true,
      testimonial: 'As a tier-3 college student, people told me Morgan Stanley is out of reach off-campus. The SS community proved otherwise!',
    },
    {
      studentName: 'Shreya Kapoor',
      college: 'Chitkara University',
      degree: 'BCA + MCA',
      batchYear: '2025',
      company: 'Zomato',
      companyLogoUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/75/Zomato_logo.png',
      role: 'Frontend Engineer',
      packageLpa: '₹18 LPA',
      placementType: 'FULL_TIME',
      verified: true,
      testimonial: 'Building real projects under SS IT Solutions gave me production-grade code to talk about in frontend interviews.',
    },
  ];

  for (const pl of placements) {
    await prisma.placement.create({ data: pl });
  }
  console.log(`✅ Seeded ${placements.length} verified placement records.`);

  // 8. Services
  const services = [
    {
      name: 'SS Band',
      slug: 'ss-band',
      tagline: 'High-octane Live Performances & Campus Concerts',
      description: 'The official musical collective of Struggle of Students. A versatile 6-piece ensemble performing Hindi rock, Bollywood fusion, Indie pop, and unplugged acoustic sets. We bring raw youth energy and unforgettable vibes to college cultural fests, pro-nights, farewells, and open mics.',
      features: JSON.stringify([
        'Full 6-piece live band (Vocals, Electric Guitar, Bass, Drums, Keys, Flute)',
        'Versatile setlists: Indie rock, Retro-modern Bollywood, Sufi Rock, Acoustic',
        'Custom fest theme anthems & battle of bands guest headlining',
        'Professional sound coordination & rider management',
      ]),
      iconName: 'Music',
      bannerUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80',
      contactEmail: 'band@struggleofstudents.org',
      contactPhone: '+91 98111 22334',
      leadPerson: 'Kabir Verma (Band Lead)',
      isActive: true,
    },
    {
      name: 'SS Event Management',
      slug: 'ss-event-management',
      tagline: 'End-to-End Campus Fest & Tournament Production',
      description: 'Flawless execution of college fests, inter-university sports meets, youth conclaves, and e-sports tournaments. From artist bookings, stage acoustics, and lighting to digital ticketing and sponsor management, we handle everything seamlessly.',
      features: JSON.stringify([
        'Turnkey college fest & cultural night production',
        'Celebrity artist & DJ curation with transparent contracts',
        'Stage, line-array acoustics, trussing & dynamic light design',
        'On-ground volunteer coordination and crowd control systems',
      ]),
      iconName: 'Calendar',
      bannerUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80',
      contactEmail: 'events@struggleofstudents.org',
      contactPhone: '+91 98111 55667',
      leadPerson: 'Rohan Mehra (Event Director)',
      isActive: true,
    },
    {
      name: 'SS IT Solutions',
      slug: 'ss-it-solutions',
      tagline: 'Custom Web & Mobile Development for Colleges & Student Ventures',
      description: 'Student-led engineering agency building modern websites, college club registration portals, voting platforms, hackathon management systems, and SaaS MVPs. High quality, modern Next.js/React architecture, budget-friendly for student clubs and early startups.',
      features: JSON.stringify([
        'Modern Next.js & React responsive web applications',
        'Event ticketing, QR-code entry & registration dashboards',
        'College club & fest management portals',
        'Database design, secure authentication, and cloud deployment',
      ]),
      iconName: 'Code',
      bannerUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80',
      contactEmail: 'tech@struggleofstudents.org',
      contactPhone: '+91 98111 77889',
      leadPerson: 'Devansh Malhotra (Head of Tech)',
      isActive: true,
    },
    {
      name: 'Student Problems and Guidance',
      slug: 'student-problems-and-guidance',
      tagline: 'Confidential Peer Support, Anti-Ragging & Academic Navigation',
      description: 'No student should struggle in silence. Our dedicated peer guidance cell assists students with academic backlogs, exam anxiety, hostel accommodation challenges, unfair college disciplinary issues, and mental health resources.',
      features: JSON.stringify([
        '100% confidential 1-on-1 peer counseling chat',
        'Anti-ragging and campus grievance escalation assistance',
        'Academic guidance for backlogs, attendance shortage & credit recovery',
        'Hostel, PG & campus safety advisory directory',
      ]),
      iconName: 'HeartHandshake',
      bannerUrl: 'https://images.unsplash.com/photo-1573497620053-ea5300f94f21?auto=format&fit=crop&w=1200&q=80',
      contactEmail: 'guidance@struggleofstudents.org',
      contactPhone: '+91 98111 99001',
      leadPerson: 'Sneha Patel (Guidance Cell Lead)',
      isActive: true,
    },
    {
      name: 'Career and Internship Support',
      slug: 'career-and-internship-support',
      tagline: 'Direct Mentorship, Resume Clinics & Verified Referrals',
      description: 'Bridging the tier-2/3 college gap with top product firms. We offer ATS-friendly resume reviews, targeted referral connections to verified alumni, coding mock interviews, and cold-email outreach blueprints.',
      features: JSON.stringify([
        'ATS-optimized resume critique with 48h turnaround',
        'Alumni referral network across 80+ product companies',
        'Weekly live DSA problem solving & mock technical interviews',
        'Negotiation coaching & off-campus job hunt playbook',
      ]),
      iconName: 'Briefcase',
      bannerUrl: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=1200&q=80',
      contactEmail: 'careers@struggleofstudents.org',
      contactPhone: '+91 98111 33445',
      leadPerson: 'Ananya Mukherjee (Placement Director)',
      isActive: true,
    },
    {
      name: 'Talent & Creative Hub',
      slug: 'talent-and-creative-hub',
      tagline: 'Visual Branding, Videography & Student Creator Showcases',
      description: 'Showcasing student creators, videographers, graphic designers, photographers, and content writers. We help campus artists get paid client work and collaborate on viral college campaigns.',
      features: JSON.stringify([
        'College fest aftermovies, recap reels & live event photography',
        'Merchandise & poster design for campus clubs',
        'Social media growth strategy & student influencer campaigns',
        'Paid freelance gigs for verified student creators',
      ]),
      iconName: 'Sparkles',
      bannerUrl: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=1200&q=80',
      contactEmail: 'creative@struggleofstudents.org',
      contactPhone: '+91 98111 44556',
      leadPerson: 'Aditya Kashyap (PR & Creative Lead)',
      isActive: true,
    },
  ];

  for (const s of services) {
    await prisma.service.create({ data: s });
  }
  console.log(`✅ Seeded ${services.length} services.`);

  // 9. Online Meetings (With Zoom API readiness & manual fallback link)
  const meetings = [
    {
      title: 'Cracking SDE-1 Off-Campus: Roadmap for 2026 Batch',
      topic: 'How to bypass resume filters, solve high-impact LeetCode questions, and secure referrals without on-campus tier-1 tags.',
      speakerName: 'Ananya Mukherjee',
      speakerBio: 'Software Engineer @ Microsoft | SS Placement Director',
      speakerPhotoUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80',
      scheduledAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // in 3 days
      durationMinutes: 75,
      maxParticipants: 100,
      registeredCount: 42,
      meetingUrl: 'https://zoom.us/j/98765432101?pwd=StruggleOfStudentsSDE2026',
      platform: 'ZOOM',
      zoomMeetingId: '987 6543 2101',
      zoomPassword: 'SSDE2026',
      isPublished: true,
      status: 'UPCOMING',
    },
    {
      title: 'Building Real SaaS Products as a Student Developer',
      topic: 'From idea validation on campus to full-stack Next.js deployment, stripe payments, and landing early users.',
      speakerName: 'Devansh Malhotra',
      speakerBio: 'Tech Lead @ SS IT Solutions | IIT Delhi Builder',
      speakerPhotoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
      scheduledAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // in 7 days
      durationMinutes: 60,
      maxParticipants: 75,
      registeredCount: 18,
      meetingUrl: 'https://meet.google.com/ss-tech-live-session',
      platform: 'GOOGLE_MEET',
      isPublished: true,
      status: 'UPCOMING',
    },
  ];

  for (const m of meetings) {
    await prisma.onlineMeeting.create({ data: m });
  }
  console.log(`✅ Seeded ${meetings.length} online meetings.`);

  // 10. Sample Community Members
  const sampleMembers = [
    {
      fullName: 'Vikramaditya Roy',
      email: 'vikram.roy@dtu.ac.in',
      phone: '+91 99887 76655',
      college: 'Delhi Technological University',
      degree: 'B.Tech Mechanical',
      graduationYear: '2026',
      interests: JSON.stringify(['Tech & Dev', 'Event Management', 'Music & Band']),
      membershipNumber: 'SS-2026-0001',
      status: 'ACTIVE',
      reason: 'Want to switch from core mechanical into tech and join the SS college fest organizing committee.',
    },
    {
      fullName: 'Meera Nambiar',
      email: 'meera.nambiar@vit.ac.in',
      phone: '+91 91234 56780',
      college: 'VIT Vellore',
      degree: 'B.Tech CSE',
      graduationYear: '2027',
      interests: JSON.stringify(['Career & Placement', 'Creative & Design']),
      membershipNumber: 'SS-2026-0002',
      status: 'ACTIVE',
      reason: 'Looking for peer mentorship and creative design collaborations.',
    },
  ];

  for (const member of sampleMembers) {
    await prisma.communityMember.create({ data: member });
  }
  console.log(`✅ Seeded sample community members.`);

  console.log('🎉 Struggle of Students database successfully initialized and seeded!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
