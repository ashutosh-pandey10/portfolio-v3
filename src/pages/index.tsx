import Container from "@/components/Container";
import { useEffect, useRef, Suspense, useState } from "react";
import styles from "@/styles/Home.module.css";
import { Button } from "@/components/ui/button";
import {
  ChevronRight,
  Code2,
  Frame,
  SearchCheck,
  Eye,
  MonitorSmartphone,
} from "lucide-react";
import { TriangleDownIcon } from "@radix-ui/react-icons";
import Spline from "@splinetool/react-spline";
import Link from "next/link";
import { cn, scrollTo } from "@/lib/utils";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import VanillaTilt from "vanilla-tilt";
import { motion } from "framer-motion";

const aboutStats = [
  { label: "Years of experience", value: "4+" },
  { label: "Technologies worked with", value: "10+" },
  // { label: "Companies worked with", value: "15+" },
];

const projects = [
  {
    title: "Djackets",
    description: "E-commerce platform curated in Django for selling Jackets",
    image: "/assets/unqueue.webm",
    href: "https://github.com/ashutosh-pandey10/djackets-backend",
  },
  // {
  //   title: "InfiniteVPS",
  //   description: "High performance VPS hosting solution",
  //   image: "/assets/infinitevps.webm",
  //   href: "#",
  // },
  // {
  //   title: "TranslateBot",
  //   description: "Powerful Multilingual Translation Bot for Discord",
  //   image: "/assets/translate_bot.webm",
  //   href: "https://github.com/ashutosh-pandey10/djackets-backend",
  // },
  // {
  //   title: "Wrona",
  //   description: "Robotics-focused technology company",
  //   image: "/assets/wrona.jpeg",
  //   href: "https://www.wrona.com/",
  // },
  {
    title: "This website",
    description: "My personal website",
    image: "/assets/portfolio.webm",
    href: "https://github.com/ashutosh-pandey10/portfolio-v3",
  },
];

const experiences = [
  {
    role: "Software Engineer",
    company: "Morningstar Inc.",
    duration: "Dec 2023 - Present",
    image: "/assets/morningstar.png",
    description:`
      | Architecting and optimizing enterprise applications for Morningstar. Building scalable Python backends, with a knack for attention to detail. Working with Python, SQL and AWS extensively
      | A strong track record of delivering high-impact performance gains, such as cutting data processing times by 40% through architectural redesigns and optimizing APIs to be 4x faster
    `,
  },
  {
    role: "Backend Developer",
    company: "LTIMindtree",
    duration: "Jun 2021 - Dec 2023",
    image: "/assets/ltim.png",
    description:
      `| Enabled 5+ ETL use-cases by developing web application based on Django, resulting in outstanding improvement with a turnaround time reduction of over 95% compared to the previous manual processes.
       | Optimized the performance of Python applications deployed on the cloud by leveraging the Cython library, leading to a remarkable 75% reduction in memory consumption.`,
  },
]

const techGroups = [
  {
    group: "Languages",
    items: [
      { label: "Python", icon: "/icons/python.png" },
      { label: "Golang", icon: "/icons/go.png" },
      { label: "SQL", icon: "/icons/sql.png" },
      { label: "JavaScript", icon: "/icons/js.png" },
    ],
  },
  {
    group: "Frameworks",
    items: [
      { label: "Flask", icon: "/icons/flask.png" },
      { label: "Django", icon: "/icons/django.png" },
      { label: "FastAPI", icon: "/icons/fastapi.png" },
      { label: "React Js", icon: "/icons/react.png" },
    ],
  },
  {
    group: "Databases",
    items: [
      { label: "PostgreSQL", icon: "/icons/postgres.png" },
      { label: "SQLServer", icon: "/icons/sqlserver.png" },
    ],
  },
  {
    group: "Tools & Platforms",
    items: [
      { label: "Git", icon: "/icons/git.png" },
      { label: "AWS", icon: "/icons/aws.png" },
      { label: "Docker", icon: "/icons/docker.png" },
    ],
  },
];

export default function Home() {
  const refScrollContainer = useRef(null);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);
  const [current, setCurrent] = useState<number>(0);
  const [count, setCount] = useState<number>(0);

  // handle scroll
  useEffect(() => {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");

    async function getLocomotive() {
      const Locomotive = (await import("locomotive-scroll")).default;
      new Locomotive({
        el: refScrollContainer.current ?? new HTMLElement(),
        smooth: true,
      });
    }

    function handleScroll() {
      let current = "";
      setIsScrolled(window.scrollY > 0);

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 250) {
          current = section.getAttribute("id") ?? "";
        }
      });

      navLinks.forEach((li) => {
        li.classList.remove("nav-active");

        if (li.getAttribute("href") === `#${current}`) {
          li.classList.add("nav-active");
          console.log(li.getAttribute("href"));
        }
      });
    }

    void getLocomotive();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!carouselApi) return;

    setCount(carouselApi.scrollSnapList().length);
    setCurrent(carouselApi.selectedScrollSnap() + 1);

    carouselApi.on("select", () => {
      setCurrent(carouselApi.selectedScrollSnap() + 1);
    });
  }, [carouselApi]);

  // card hover effect
  useEffect(() => {
    const tilt: HTMLElement[] = Array.from(document.querySelectorAll("#tilt"));
    VanillaTilt.init(tilt, {
      speed: 300,
      glare: true,
      "max-glare": 0.1,
      gyroscope: true,
      perspective: 900,
      scale: 0.9,
    });
  }, []);

  return (
    <Container>
      <div ref={refScrollContainer}>
        <Gradient />

        {/* Intro */}
        <section
          id="home"
          data-scroll-section
          className="mt-40 flex w-full flex-col items-center xl:mt-0 xl:min-h-screen xl:flex-row xl:justify-between"
        >
          <div className={styles.intro}>
            {/* <div
              data-scroll
              data-scroll-direction="horizontal"
              data-scroll-speed=".09"
              className="flex flex-row items-center space-x-1.5"
            >
              <span className={styles.pill}>next.js</span>
              <span className={styles.pill}>tailwindcss</span>
              <span className={styles.pill}>typescript</span>
            </div> */}
            <div>
              <h1
                data-scroll
                data-scroll-enable-touch-speed
                data-scroll-speed=".06"
                data-scroll-direction="horizontal"
              >
                <span className="text-6xl tracking-tighter text-foreground 2xl:text-8xl">
                  Hello, I&apos;m
                  <br />
                </span>
                <span className="clash-grotesk text-gradient text-6xl 2xl:text-8xl">
                  Ashutosh
                </span>
              </h1>
              <p
                data-scroll
                data-scroll-enable-touch-speed
                data-scroll-speed=".06"
                className="mt-1 max-w-lg tracking-tight text-muted-foreground 2xl:text-xl"
              >
                {/* An experienced full-stack website developer with a passion for
                crafting unique digital experiences. */}
                A seasoned software engineer with a passion for solving complex 
                backend challenges and a knack for attention to detail.
              </p>
            </div>
            <span
              data-scroll
              data-scroll-enable-touch-speed
              data-scroll-speed=".06"
              className="flex flex-row items-center space-x-3 pt-6"
            >
              <Button
                // variant="outline"
                onClick={() => scrollTo(document.querySelector("#about"))}
              >
                <Link 
                  href="https://drive.google.com/file/d/1jSEXTutMPFk-vI6KThwNJUsbEBaUciYj/view?usp=sharing"
                  target="_blank"
                  >
                  Download résumé
                </Link> 
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
              {/* Social Icons */}
              <a href="mailto:ashupandey516@gmail.com" className="inline-block">
                <span className="w-8 h-8 flex items-center justify-center">
                  <img alt="Gmail" src="icons/gmail.png" width={32} height={32} style={{background: 'none', border: 'none'}} />
                </span>
              </a>
              <a href="https://www.linkedin.com/in/ashutosh-pandey10" target="_blank" rel="noopener noreferrer" className="inline-block">
                <span className="w-8 h-8 flex items-center justify-center">
                  <img alt="LinkedIn" src="icons/linkedin.png" width={50} height={50} style={{background: 'none', border: 'none'}} />
                {/* <a href="https://www.flaticon.com/free-icons/linkedin" title="linkedin icons">Linkedin icons created by Freepik - Flaticon</a> */}
                </span>
              </a>
              <a href="https://leetcode.com/u/pandeyAshutosh" target="_blank" rel="noopener noreferrer" className="inline-block">
                <span className="w-8 h-8 flex items-center justify-center">
                  <img alt="Leetcode" src="icons/leetcode.png" width={32} height={32} style={{background: 'none', border: 'none'}} />
                </span>
              </a>
              <a href="https://github.com/ashutosh-pandey10" target="_blank" rel="noopener noreferrer" className="inline-block">
                <span className="w-8 h-8 flex items-center justify-center">
                  <img alt="Github" src="icons/github.png" width={50} height={50} style={{background: 'none', border: 'none'}} />
                </span>
              </a>
              
            </span>

            <div
              className={cn(
                styles.scroll,
                isScrolled && styles["scroll--hidden"],
              )}
            >
              Scroll to discover{" "}
              <TriangleDownIcon className="mt-1 animate-bounce" />
            </div>
          </div>
          <div
            data-scroll
            data-scroll-speed="-.01"
            id={styles["canvas-container"]}
            className="mt-14 h-full w-full xl:mt-0"
          >
            <Suspense fallback={<span>Loading...</span>}>
              <Spline scene="/assets/scene.splinecode" />
            </Suspense>
          </div>
        </section>

        {/* About */}
        <section id="about" data-scroll-section>
          <div
            data-scroll
            data-scroll-speed=".4"
            data-scroll-position="top"
            className="my-14 flex max-w-6xl flex-col justify-start space-y-10"
          >
            <h2 className="py-16  pb-2 text-3xl font-light leading-normal tracking-tighter text-foreground xl:text-[40px]">
              {/* I&apos;m an experienced full-stack developer proficient in{" "}
              <Link
                href="https://create.t3.gg/"
                target="_blank"
                className="underline"
              >
                TypeScript, Tailwind, and Next.js
              </Link>{" "}
              since 2021. My experience spans from startups to mid-sized
              companies, where I&apos;ve been instrumental in the entire product
              design process; from ideation and wireframing, through
              prototyping, to the delivery of the final product, all while
              efficiently collaborating with cross-functional teams. */}
              Ashutosh Pandey is a backend engineer with 4+ years of experience, holding a 
              strong foundation in python backends and Golang. He is proficient in building 
              REST APIs, working with RDBMS and cloud technologies such as AWS. Passionate 
              about writing clean, modular and maintainable code, he also likes solving complex 
              backend challenges and enjoys architecting and optimizing enterprise applications.
            </h2>
            <div className="grid grid-cols-2 gap-8 xl:grid-cols-3">
              {aboutStats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex flex-col items-center text-center xl:items-start xl:text-start"
                >
                  <span className="clash-grotesk text-gradient text-4xl font-semibold tracking-tight xl:text-6xl">
                    {stat.value}
                  </span>
                  <span className="tracking-tight text-muted-foreground xl:text-lg">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Skills */}
        <section id="skills" data-scroll-section>
          <div
            data-scroll
            data-scroll-speed=".4"
            data-scroll-position="top"
            className="my-24 flex flex-col justify-start space-y-10"
          >
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{
                duration: 1,
                staggerChildren: 0.5,
              }}
              viewport={{ once: true }}
              className="grid items-center gap-1.5 md:grid-cols-2 xl:grid-cols-3"
            >
              <div className="flex flex-col py-6 xl:p-6">
                <h2 className="text-4xl font-medium tracking-tight">
                  Skills
                  <br />
                  <span className="text-gradient clash-grotesk tracking-normal">
                    & Technologies
                  </span>
                </h2>
                <p className="mt-2 tracking-tighter text-secondary-foreground">
                  Here are some of the languages, technologies and platforms, I am proficient in working with.
                </p>
              </div>
              {techGroups.map((group) => (
                <div
                  key={group.group}
                  className="flex flex-col items-center justify-between rounded-md bg-white/5 p-6 shadow-md backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:bg-white/10 hover:shadow-md"
                >
                  <span className="text-2xl font-semibold mb-6 text-center">{group.group}</span>
                  <div className="flex flex-wrap justify-center gap-4 w-full">
                    {group.items.map((item) => (
                      <div key={item.label} className="flex flex-col items-center bg-black/30 rounded-md px-2 py-1 mx-1 my-1">
                        <img src={item.icon} alt={item.label} width={32} height={32} />
                        <span className="mt-1 text-center text-sm">{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" data-scroll-section>
          <div className="relative isolate -z-10">
            <div
              className="absolute inset-x-0 -top-40 transform-gpu overflow-hidden blur-[100px] sm:-top-80 lg:-top-60"
              aria-hidden="true"
            >
              <div
                className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary via-primary to-secondary opacity-10 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                style={{
                  clipPath:
                    "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                }}
              />
            </div>
          </div>
          <div data-scroll data-scroll-speed=".4" className="my-64">
            <h2 className="mt-3 text-2xl font-semibold tracking-tight tracking-tighter xl:text-5xl">
              Experience
            </h2>

            {/* Carousel */}
            <div className="mt-14">
              <Carousel setApi={setCarouselApi} className="w-full">
                <CarouselContent>
                  {experiences.map((experience) => (
                    <CarouselItem key={experience.company} className="md:basis-1/2">
                      <Card id="tilt" className="p-6">
                        {/* Company Logo and Name */}
                        <div className="flex items-center space-x-4">
                          <Image
                            src={experience.image}
                            alt={experience.company}
                            width={150}
                            height={150}
                            className="rounded-full"
                          />
                          <h2 className="text-lg font-semibold">{experience.company}</h2>
                        </div>

                        {/* Role and Duration */}
                        <div className="mt-4">
                          <span className="text-md font-bold">{experience.role}</span>
                          <span className="text-sm text-muted-foreground">
                            , {experience.duration}
                          </span>
                        </div>

                        {/* Description */}
                        <div className="mt-4 text-sm text-muted-foreground">
                          {experience.description
                            .split("|")
                            .filter((line) => line.trim() !== "")
                            .map((line, index) => (
                              <p key={index} className="mb-2">
                                - {line.trim()}
                              </p>
                          ))}
                        </div>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
              {/* <div className="py-2 text-center text-sm text-muted-foreground">
                <span className="font-semibold">
                  {current} / {count}
                </span>{" "}
                experiences
              </div> */}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" data-scroll-section className="my-64">
          <div
            data-scroll
            data-scroll-speed=".4"
            data-scroll-position="top"
            className="flex flex-col items-center justify-center rounded-lg bg-gradient-to-br from-primary/[6.5%] to-white/5 px-8 py-16 text-center xl:py-24"
          >
            <h2 className="text-4xl font-medium tracking-tighter xl:text-6xl">
              Let&apos;s {" "}
              <span className="text-gradient clash-grotesk">CONNECT !</span>
            </h2>
            <p className="mt-1.5 text-base tracking-tight text-muted-foreground xl:text-lg">
              I&apos;m currently open for any exciting software engineering opportunity.
            </p>
            <Link href="mailto:wendoj@proton.me" passHref>
              <Button className="mt-6">Get in touch</Button>
            </Link>
          </div>
        </section>
      </div>
    </Container>
  );
}

function Gradient() {
  return (
    <>
      {/* Upper gradient */}
      <div className="absolute -top-40 right-0 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
        <svg
          className="relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:h-[42.375rem]"
          viewBox="0 0 1155 678"
        >
          <path
            fill="url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)"
            fillOpacity=".1"
            d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
          />
          <defs>
            <linearGradient
              id="45de2b6b-92d5-4d68-a6a0-9b9b2abad533"
              x1="1155.49"
              x2="-78.208"
              y1=".177"
              y2="474.645"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#7980fe" />
              <stop offset={1} stopColor="#f0fff7" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Lower gradient */}
      <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
        <svg
          className="relative left-[calc(50%+3rem)] h-[21.1875rem] max-w-none -translate-x-1/2 sm:left-[calc(50%+36rem)] sm:h-[42.375rem]"
          viewBox="0 0 1155 678"
        >
          <path
            fill="url(#ecb5b0c9-546c-4772-8c71-4d3f06d544bc)"
            fillOpacity=".1"
            d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
          />
          <defs>
            <linearGradient
              id="ecb5b0c9-546c-4772-8c71-4d3f06d544bc"
              x1="1155.49"
              x2="-78.208"
              y1=".177"
              y2="474.645"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#9A70FF" />
              <stop offset={1} stopColor="#838aff" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </>
  );
}
