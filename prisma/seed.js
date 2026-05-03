import "dotenv/config";
import { PrismaClient } from "./client/index.js";
import { PrismaLibSql } from "@prisma/adapter-libsql";

const adapter = new PrismaLibSql({
  url: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.like.deleteMany();
  await prisma.comment.deleteMany();
  await prisma.follow.deleteMany();
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();

  const users = {};

  users.omar = await prisma.user.create({
    data: {
      username: "Dr. Omar Al-Fahad",
      email: "omar@qu.edu.qa",
      password: "pass123",
      bio: "Computer Science Professor specializing in Cryptography and Distributed Systems.",
    },
  });

  users.fatima = await prisma.user.create({
    data: {
      username: "Fatima Mahmoud",
      email: "fatima@qu.edu.qa",
      password: "pass123",
      bio: "Mechanical Engineering Senior. Passionate about sustainable energy solutions.",
    },
  });

  users.khalid = await prisma.user.create({
    data: {
      username: "Engr. Khalid Jassim",
      email: "khalid@qu.edu.qa",
      password: "pass123",
      bio: "Data Systems Architect focusing on scalable cloud infrastructure for research.",
    },
  });

  users.sara = await prisma.user.create({
    data: {
      username: "Sara Al-Kuwari",
      email: "sara@qu.edu.qa",
      password: "pass123",
      bio: "PhD Researcher in AI Ethics and Policy. Examining the cultural impact of LLMs.",
    },
  });

  users.hamad = await prisma.user.create({
    data: {
      username: "Hamad Bin Ali",
      email: "hamad@qu.edu.qa",
      password: "pass123",
      bio: "Full-stack developer at QU IT. Expert in Laravel and Python systems.",
    },
  });

  users.noora = await prisma.user.create({
    data: {
      username: "Noora Al-Sulaiti",
      email: "noora@qu.edu.qa",
      password: "pass123",
      bio: "Cybersecurity Analyst interested in zero-trust architectures and penetration testing.",
    },
  });

  users.ahmed = await prisma.user.create({
    data: {
      username: "Ahmed Al-Misned",
      email: "ahmed@qu.edu.qa",
      password: "pass123",
      bio: "Embedded Systems specialist building low-power IoT devices for smart campuses.",
    },
  });

  users.dana = await prisma.user.create({
    data: {
      username: "Dr. Dana Haroon",
      email: "dana@qu.edu.qa",
      password: "pass123",
      bio: "Assistant Professor of Mathematics researching optimization algorithms.",
    },
  });

  users.hussain = await prisma.user.create({
    data: {
      username: "Hussain",
      email: "hussain@qu.edu.qa",
      password: "pass123",
      bio: "Computer Engineering student at Qatar University.",
    },
  });

  users.labib = await prisma.user.create({
    data: {
      username: "Labib",
      email: "labib@qu.edu.qa",
      password: "pass123",
      bio: "Computer Engineering student passionate about web development.",
    },
  });

  users.maha = await prisma.user.create({
    data: {
      username: "Maha Al-Thani",
      email: "maha@qu.edu.qa",
      password: "pass123",
      bio: "Information Systems student exploring product design and data visualization.",
    },
  });

  users.yousef = await prisma.user.create({
    data: {
      username: "Yousef Karim",
      email: "yousef@qu.edu.qa",
      password: "pass123",
      bio: "Software engineering student interested in backend APIs and testing.",
    },
  });

  users.reem = await prisma.user.create({
    data: {
      username: "Reem Hassan",
      email: "reem@qu.edu.qa",
      password: "pass123",
      bio: "AI club member working on natural language processing projects.",
    },
  });

  users.layla = await prisma.user.create({
    data: {
      username: "Dr. Layla Mansour",
      email: "layla@qu.edu.qa",
      password: "pass123",
      bio: "Researcher in human-computer interaction and learning technologies.",
    },
  });

  users.nasser = await prisma.user.create({
    data: {
      username: "Nasser Al-Hajri",
      email: "nasser@qu.edu.qa",
      password: "pass123",
      bio: "Cloud computing enthusiast building small distributed systems.",
    },
  });

  users.amna = await prisma.user.create({
    data: {
      username: "Amna Saleh",
      email: "amna@qu.edu.qa",
      password: "pass123",
      bio: "Computer Science student interested in UI engineering and accessibility.",
    },
  });

  users.tariq = await prisma.user.create({
    data: {
      username: "Tariq Al-Mohannadi",
      email: "tariq@qu.edu.qa",
      password: "pass123",
      bio: "Data science student exploring recommendation systems and analytics.",
    },
  });

  users.mariam = await prisma.user.create({
    data: {
      username: "Mariam Khalifa",
      email: "mariam@qu.edu.qa",
      password: "pass123",
      bio: "Cybersecurity club organizer focused on privacy and secure coding.",
    },
  });

  users.ali = await prisma.user.create({
    data: {
      username: "Ali Darwish",
      email: "ali@qu.edu.qa",
      password: "pass123",
      bio: "Mobile developer building campus tools with Flutter and web APIs.",
    },
  });

  users.joud = await prisma.user.create({
    data: {
      username: "Joud Al-Naimi",
      email: "joud@qu.edu.qa",
      password: "pass123",
      bio: "Digital media student studying online communities and content strategy.",
    },
  });

  users.rashid = await prisma.user.create({
    data: {
      username: "Rashid Younes",
      email: "rashid@qu.edu.qa",
      password: "pass123",
      bio: "Backend developer interested in databases, caching, and API design.",
    },
  });

  users.lina = await prisma.user.create({
    data: {
      username: "Lina Faris",
      email: "lina@qu.edu.qa",
      password: "pass123",
      bio: "Machine learning student researching responsible model evaluation.",
    },
  });

  users.salem = await prisma.user.create({
    data: {
      username: "Salem Al-Marri",
      email: "salem@qu.edu.qa",
      password: "pass123",
      bio: "Networks student working on routing, monitoring, and campus Wi-Fi reliability.",
    },
  });

  users.hessa = await prisma.user.create({
    data: {
      username: "Hessa Al-Ansari",
      email: "hessa@qu.edu.qa",
      password: "pass123",
      bio: "Software testing enthusiast who likes clean test cases and readable bug reports.",
    },
  });

  users.faisal = await prisma.user.create({
    data: {
      username: "Faisal Noor",
      email: "faisal@qu.edu.qa",
      password: "pass123",
      bio: "Student researcher interested in databases, statistics, and academic social platforms.",
    },
  });

  await prisma.follow.createMany({
    data: [
      { followerId: users.hussain.id, followingId: users.omar.id },
      { followerId: users.hussain.id, followingId: users.hamad.id },
      { followerId: users.hussain.id, followingId: users.noora.id },
      { followerId: users.labib.id, followingId: users.omar.id },
      { followerId: users.labib.id, followingId: users.sara.id },
      { followerId: users.labib.id, followingId: users.yousef.id },
      { followerId: users.fatima.id, followingId: users.sara.id },
      { followerId: users.fatima.id, followingId: users.dana.id },
      { followerId: users.khalid.id, followingId: users.omar.id },
      { followerId: users.khalid.id, followingId: users.nasser.id },
      { followerId: users.sara.id, followingId: users.reem.id },
      { followerId: users.hamad.id, followingId: users.noora.id },
      { followerId: users.noora.id, followingId: users.omar.id },
      { followerId: users.ahmed.id, followingId: users.dana.id },
      { followerId: users.maha.id, followingId: users.layla.id },
      { followerId: users.yousef.id, followingId: users.hamad.id },
      { followerId: users.reem.id, followingId: users.sara.id },
      { followerId: users.layla.id, followingId: users.dana.id },
      { followerId: users.nasser.id, followingId: users.khalid.id },
      { followerId: users.amna.id, followingId: users.maha.id },
      { followerId: users.amna.id, followingId: users.layla.id },
      { followerId: users.amna.id, followingId: users.yousef.id },
      { followerId: users.tariq.id, followingId: users.khalid.id },
      { followerId: users.tariq.id, followingId: users.nasser.id },
      { followerId: users.tariq.id, followingId: users.faisal.id },
      { followerId: users.mariam.id, followingId: users.noora.id },
      { followerId: users.mariam.id, followingId: users.omar.id },
      { followerId: users.ali.id, followingId: users.hamad.id },
      { followerId: users.ali.id, followingId: users.amna.id },
      { followerId: users.joud.id, followingId: users.maha.id },
      { followerId: users.joud.id, followingId: users.reem.id },
      { followerId: users.rashid.id, followingId: users.yousef.id },
      { followerId: users.rashid.id, followingId: users.nasser.id },
      { followerId: users.lina.id, followingId: users.reem.id },
      { followerId: users.lina.id, followingId: users.sara.id },
      { followerId: users.salem.id, followingId: users.ahmed.id },
      { followerId: users.salem.id, followingId: users.noora.id },
      { followerId: users.hessa.id, followingId: users.yousef.id },
      { followerId: users.hessa.id, followingId: users.rashid.id },
      { followerId: users.faisal.id, followingId: users.tariq.id },
      { followerId: users.faisal.id, followingId: users.dana.id },
      { followerId: users.omar.id, followingId: users.sara.id },
      { followerId: users.omar.id, followingId: users.dana.id },
      { followerId: users.hamad.id, followingId: users.rashid.id },
      { followerId: users.noora.id, followingId: users.mariam.id },
      { followerId: users.reem.id, followingId: users.lina.id },
      { followerId: users.maha.id, followingId: users.joud.id },
      { followerId: users.yousef.id, followingId: users.hessa.id },
      { followerId: users.nasser.id, followingId: users.salem.id },
    ],
  });

  const posts = {};

  posts.designSystems = await prisma.post.create({
    data: {
      authorId: users.omar.id,
      content: "Design systems and how to integrate with MCP servers.",
    },
  });

  posts.hardware = await prisma.post.create({
    data: {
      authorId: users.hamad.id,
      content:
        "Hardware system design and its effects on the new release of AirPods Max 2.",
    },
  });

  posts.techIndustry = await prisma.post.create({
    data: {
      authorId: users.labib.id,
      content:
        "This is a technical post discussing real problems in the tech industry.",
    },
  });

  posts.aiEthics = await prisma.post.create({
    data: {
      authorId: users.sara.id,
      content:
        "AI ethics research needs better community discussion and transparent datasets.",
    },
  });

  posts.security = await prisma.post.create({
    data: {
      authorId: users.noora.id,
      content:
        "Zero-trust security is becoming essential for university research platforms.",
    },
  });

  posts.prismaMigration = await prisma.post.create({
    data: {
      authorId: users.hussain.id,
      content:
        "Working on a database migration from localStorage to Prisma this week.",
    },
  });

  posts.nlp = await prisma.post.create({
    data: {
      authorId: users.reem.id,
      content:
        "Natural language processing models improve when datasets are carefully documented.",
    },
  });

  posts.dashboard = await prisma.post.create({
    data: {
      authorId: users.maha.id,
      content:
        "Good dashboards need clear hierarchy, not just colorful charts.",
    },
  });

  posts.repositories = await prisma.post.create({
    data: {
      authorId: users.yousef.id,
      content:
        "Repository functions make backend code much easier to test and maintain.",
    },
  });

  posts.cloud = await prisma.post.create({
    data: {
      authorId: users.nasser.id,
      content:
        "Cloud deployment is easier when environment variables are documented early.",
    },
  });

  posts.accessibility = await prisma.post.create({
    data: {
      authorId: users.amna.id,
      content:
        "Accessible UI is not optional; keyboard navigation and readable contrast matter.",
    },
  });

  posts.analytics = await prisma.post.create({
    data: {
      authorId: users.tariq.id,
      content:
        "Social platform analytics should explain behavior without exposing private data.",
    },
  });

  posts.secureCoding = await prisma.post.create({
    data: {
      authorId: users.mariam.id,
      content:
        "Secure coding starts with validation, least privilege, and careful error messages.",
    },
  });

  posts.mobileApi = await prisma.post.create({
    data: {
      authorId: users.ali.id,
      content:
        "Mobile apps feel faster when API responses are small and predictable.",
    },
  });

  posts.community = await prisma.post.create({
    data: {
      authorId: users.joud.id,
      content:
        "Healthy online communities need moderation tools and clear participation norms.",
    },
  });

  posts.caching = await prisma.post.create({
    data: {
      authorId: users.rashid.id,
      content:
        "Caching helps performance, but stale data can quietly create confusing bugs.",
    },
  });

  posts.modelEvaluation = await prisma.post.create({
    data: {
      authorId: users.lina.id,
      content:
        "Responsible model evaluation should include failure cases, not only accuracy scores.",
    },
  });

  posts.networkMonitoring = await prisma.post.create({
    data: {
      authorId: users.salem.id,
      content:
        "Network monitoring dashboards should highlight outages before users report them.",
    },
  });

  posts.testing = await prisma.post.create({
    data: {
      authorId: users.hessa.id,
      content:
        "Good tests describe behavior clearly and make future refactoring less scary.",
    },
  });

  posts.statistics = await prisma.post.create({
    data: {
      authorId: users.faisal.id,
      content:
        "Statistics pages are more useful when each metric has a clear question behind it.",
    },
  });

  posts.indexing = await prisma.post.create({
    data: {
      authorId: users.khalid.id,
      content:
        "Database indexes should match the filters and sorting used by real queries.",
    },
  });

  posts.classDemo = await prisma.post.create({
    data: {
      authorId: users.omar.id,
      content:
        "For demos, stable seed data helps every team member explain the system confidently.",
    },
  });

  posts.authSecurity = await prisma.post.create({
    data: {
      authorId: users.noora.id,
      content:
        "Authentication should protect sessions, passwords, and account recovery flows.",
    },
  });

  posts.visualDesign = await prisma.post.create({
    data: {
      authorId: users.maha.id,
      content:
        "Visual design is strongest when spacing, hierarchy, and copy all support the task.",
    },
  });

  posts.optimization = await prisma.post.create({
    data: {
      authorId: users.dana.id,
      content:
        "Optimization is not just speed; sometimes it means using fewer resources wisely.",
    },
  });

  posts.iotSecurity = await prisma.post.create({
    data: {
      authorId: users.ahmed.id,
      content:
        "IoT devices on campus need firmware updates and network segmentation.",
    },
  });

  posts.hciResearch = await prisma.post.create({
    data: {
      authorId: users.layla.id,
      content:
        "Research prototypes should still respect basic usability and accessibility.",
    },
  });

  posts.backendContracts = await prisma.post.create({
    data: {
      authorId: users.rashid.id,
      content:
        "Backend contracts are easier to maintain when repositories return consistent shapes.",
    },
  });

  posts.dataPrivacy = await prisma.post.create({
    data: {
      authorId: users.mariam.id,
      content:
        "Privacy is easier to protect when data minimization is part of the schema design.",
    },
  });

  posts.wordStats = await prisma.post.create({
    data: {
      authorId: users.faisal.id,
      content:
        "Frequent word statistics can reveal whether a community talks more about design, data, or security.",
    },
  });

  await prisma.like.createMany({
    data: [
      { postId: posts.designSystems.id, userId: users.hussain.id },
      { postId: posts.designSystems.id, userId: users.labib.id },
      { postId: posts.designSystems.id, userId: users.reem.id },
      { postId: posts.hardware.id, userId: users.omar.id },
      { postId: posts.hardware.id, userId: users.noora.id },
      { postId: posts.techIndustry.id, userId: users.hamad.id },
      { postId: posts.aiEthics.id, userId: users.fatima.id },
      { postId: posts.aiEthics.id, userId: users.maha.id },
      { postId: posts.security.id, userId: users.khalid.id },
      { postId: posts.security.id, userId: users.yousef.id },
      { postId: posts.prismaMigration.id, userId: users.omar.id },
      { postId: posts.prismaMigration.id, userId: users.hamad.id },
      { postId: posts.nlp.id, userId: users.sara.id },
      { postId: posts.dashboard.id, userId: users.reem.id },
      { postId: posts.repositories.id, userId: users.nasser.id },
      { postId: posts.cloud.id, userId: users.khalid.id },
      { postId: posts.accessibility.id, userId: users.maha.id },
      { postId: posts.accessibility.id, userId: users.layla.id },
      { postId: posts.accessibility.id, userId: users.hessa.id },
      { postId: posts.analytics.id, userId: users.faisal.id },
      { postId: posts.analytics.id, userId: users.khalid.id },
      { postId: posts.analytics.id, userId: users.dana.id },
      { postId: posts.secureCoding.id, userId: users.noora.id },
      { postId: posts.secureCoding.id, userId: users.rashid.id },
      { postId: posts.secureCoding.id, userId: users.yousef.id },
      { postId: posts.mobileApi.id, userId: users.hamad.id },
      { postId: posts.mobileApi.id, userId: users.amna.id },
      { postId: posts.mobileApi.id, userId: users.labib.id },
      { postId: posts.community.id, userId: users.sara.id },
      { postId: posts.community.id, userId: users.maha.id },
      { postId: posts.community.id, userId: users.reem.id },
      { postId: posts.caching.id, userId: users.nasser.id },
      { postId: posts.caching.id, userId: users.khalid.id },
      { postId: posts.caching.id, userId: users.hamad.id },
      { postId: posts.modelEvaluation.id, userId: users.sara.id },
      { postId: posts.modelEvaluation.id, userId: users.omar.id },
      { postId: posts.modelEvaluation.id, userId: users.reem.id },
      { postId: posts.networkMonitoring.id, userId: users.ahmed.id },
      { postId: posts.networkMonitoring.id, userId: users.noora.id },
      { postId: posts.networkMonitoring.id, userId: users.nasser.id },
      { postId: posts.testing.id, userId: users.yousef.id },
      { postId: posts.testing.id, userId: users.rashid.id },
      { postId: posts.testing.id, userId: users.labib.id },
      { postId: posts.statistics.id, userId: users.tariq.id },
      { postId: posts.statistics.id, userId: users.dana.id },
      { postId: posts.statistics.id, userId: users.maha.id },
      { postId: posts.indexing.id, userId: users.faisal.id },
      { postId: posts.indexing.id, userId: users.rashid.id },
      { postId: posts.indexing.id, userId: users.omar.id },
      { postId: posts.classDemo.id, userId: users.hessa.id },
      { postId: posts.classDemo.id, userId: users.labib.id },
      { postId: posts.classDemo.id, userId: users.hussain.id },
      { postId: posts.authSecurity.id, userId: users.mariam.id },
      { postId: posts.authSecurity.id, userId: users.ali.id },
      { postId: posts.authSecurity.id, userId: users.salem.id },
      { postId: posts.visualDesign.id, userId: users.joud.id },
      { postId: posts.visualDesign.id, userId: users.amna.id },
      { postId: posts.visualDesign.id, userId: users.layla.id },
      { postId: posts.optimization.id, userId: users.tariq.id },
      { postId: posts.optimization.id, userId: users.fatima.id },
      { postId: posts.optimization.id, userId: users.faisal.id },
      { postId: posts.iotSecurity.id, userId: users.salem.id },
      { postId: posts.iotSecurity.id, userId: users.mariam.id },
      { postId: posts.iotSecurity.id, userId: users.noora.id },
      { postId: posts.hciResearch.id, userId: users.amna.id },
      { postId: posts.hciResearch.id, userId: users.joud.id },
      { postId: posts.hciResearch.id, userId: users.layla.id },
      { postId: posts.backendContracts.id, userId: users.yousef.id },
      { postId: posts.backendContracts.id, userId: users.hessa.id },
      { postId: posts.backendContracts.id, userId: users.khalid.id },
      { postId: posts.dataPrivacy.id, userId: users.sara.id },
      { postId: posts.dataPrivacy.id, userId: users.noora.id },
      { postId: posts.dataPrivacy.id, userId: users.fatima.id },
      { postId: posts.wordStats.id, userId: users.tariq.id },
      { postId: posts.wordStats.id, userId: users.reem.id },
      { postId: posts.wordStats.id, userId: users.faisal.id },
    ],
  });

  await prisma.comment.createMany({
    data: [
      {
        postId: posts.designSystems.id,
        authorId: users.labib.id,
        content: "This would be useful for our course project.",
      },
      {
        postId: posts.designSystems.id,
        authorId: users.reem.id,
        content: "I want to see an example with a real API route.",
      },
      {
        postId: posts.hardware.id,
        authorId: users.noora.id,
        content: "Interesting hardware angle.",
      },
      {
        postId: posts.prismaMigration.id,
        authorId: users.omar.id,
        content: "Good direction. Keep the database queries efficient.",
      },
      {
        postId: posts.repositories.id,
        authorId: users.khalid.id,
        content: "This is why data repositories are useful.",
      },
      {
        postId: posts.cloud.id,
        authorId: users.hamad.id,
        content: "Environment setup should go into the README too.",
      },
      {
        postId: posts.accessibility.id,
        authorId: users.layla.id,
        content: "Accessibility also improves the experience for everyone else.",
      },
      {
        postId: posts.analytics.id,
        authorId: users.dana.id,
        content: "Aggregated statistics are safer than exposing raw user behavior.",
      },
      {
        postId: posts.secureCoding.id,
        authorId: users.noora.id,
        content: "Clear error messages should not reveal private system details.",
      },
      {
        postId: posts.mobileApi.id,
        authorId: users.yousef.id,
        content: "Small responses also make mobile debugging much easier.",
      },
      {
        postId: posts.community.id,
        authorId: users.sara.id,
        content: "Community rules should be visible before people post.",
      },
      {
        postId: posts.caching.id,
        authorId: users.khalid.id,
        content: "Invalidation is usually the hardest part of caching.",
      },
      {
        postId: posts.modelEvaluation.id,
        authorId: users.omar.id,
        content: "Failure cases make the research claims much stronger.",
      },
      {
        postId: posts.networkMonitoring.id,
        authorId: users.ahmed.id,
        content: "A good alert should point to the likely source of the outage.",
      },
      {
        postId: posts.testing.id,
        authorId: users.rashid.id,
        content: "Readable tests become documentation for future teammates.",
      },
      {
        postId: posts.statistics.id,
        authorId: users.tariq.id,
        content: "Each stat should map to a query we can explain in the report.",
      },
      {
        postId: posts.indexing.id,
        authorId: users.faisal.id,
        content: "This will be useful when explaining why we added @@index.",
      },
      {
        postId: posts.classDemo.id,
        authorId: users.hessa.id,
        content: "Seed data makes demos less stressful.",
      },
      {
        postId: posts.authSecurity.id,
        authorId: users.mariam.id,
        content: "Plain-text passwords should be listed as a course-project limitation.",
      },
      {
        postId: posts.visualDesign.id,
        authorId: users.amna.id,
        content: "Spacing is doing a lot of invisible work in UI quality.",
      },
      {
        postId: posts.optimization.id,
        authorId: users.fatima.id,
        content: "Resource efficiency matters in engineering design too.",
      },
      {
        postId: posts.iotSecurity.id,
        authorId: users.salem.id,
        content: "Segmentation makes one compromised device less dangerous.",
      },
      {
        postId: posts.hciResearch.id,
        authorId: users.joud.id,
        content: "Research tools still need thoughtful onboarding.",
      },
      {
        postId: posts.backendContracts.id,
        authorId: users.hamad.id,
        content: "Consistent repository outputs will help the API layer.",
      },
      {
        postId: posts.dataPrivacy.id,
        authorId: users.lina.id,
        content: "Schema design can prevent unnecessary data collection.",
      },
      {
        postId: posts.wordStats.id,
        authorId: users.reem.id,
        content: "This is perfect for a statistics feature.",
      },
    ],
  });

}

main()
  .then(async () => {
    console.log("Database seeded successfully.");
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
