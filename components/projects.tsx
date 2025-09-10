"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from "lucide-react"

const getProjects = (currentOrigin?: string) => [
  {
    title: "Personal Portfolio",
    description:
      "A futuristic glassmorphism portfolio website built with Next.js, featuring smooth animations and modern design patterns.",
    image: "/placeholder-lshsw.png",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    github: "https://github.com/TiisetsoMotloutsi/portfolio",
    demo: currentOrigin || "#", // Use current origin or fallback
  },
  {
    title: "EasyCover",
    description: "An intelligent application for funeral cover.",
    image: "/cv-generator-application-interface.jpg",
    technologies: ["Java", "Spring Boot", "React", "PostgreSQL"],
    github: "https://github.com/TiisetsoMotloutsi/easycover",
    demo: "https://github.com/TiisetsoMotloutsi/easycover",
  },
  {
    title: "Snake Game Enhanced",
    description:
      "A modern take on the classic Snake game with smooth animations, particle effects, and progressive difficulty levels.",
    image: "/modern-snake-game-interface.jpg",
    technologies: ["JavaScript", "Canvas API", "CSS3", "HTML5"],
    github: "https://github.com/TiisetsoMotloutsi/snake-game",
    demo: "#snake-game",
  },
  {
    title: "Task Management System",
    description:
      "A comprehensive project management tool with real-time collaboration, task tracking, and team analytics.",
    image: "/task-management-dashboard.png",
    technologies: ["C#", ".NET Core", "Angular", "SQL Server"],
    github: "https://github.com/TiisetsoMotloutsi/task-management",
    demo: "https://github.com/TiisetsoMotloutsi/task-management",
  },
]

export function Projects() {
  const [isVisible, setIsVisible] = useState(false)
  const [projects, setProjects] = useState(() => getProjects())
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      setProjects(getProjects(window.location.origin))
    }
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="projects" ref={sectionRef} className="py-20">
      <div className="container mx-auto px-6">
        <div className={`transition-all duration-1000 ${isVisible ? "animate-slide-up" : "opacity-0"}`}>
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
            Featured Projects
          </h2>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {projects.map((project, index) => (
              <div
                key={project.title}
                className="glass-strong rounded-2xl overflow-hidden hover:scale-105 transition-all duration-300 group"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{project.title}</h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="px-3 py-1 text-xs bg-primary/20 text-primary rounded-full">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <Button
                      size="sm"
                      variant="outline"
                      className="glass border-primary/30 hover:bg-primary/10 bg-transparent"
                      onClick={() => {
                        if (typeof window !== "undefined") {
                          window.open(project.github, "_blank")
                        }
                      }}
                    >
                      <Github className="mr-2 h-4 w-4" />
                      Code
                    </Button>
                    <Button
                      size="sm"
                      className="bg-primary hover:bg-primary/80"
                      onClick={() => {
                        if (project.demo.startsWith("#")) {
                          const element = document.querySelector(project.demo)
                          element?.scrollIntoView({ behavior: "smooth" })
                        } else if (typeof window !== "undefined") {
                          window.open(project.demo, "_blank")
                        }
                      }}
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Demo
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
