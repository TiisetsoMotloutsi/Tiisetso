"use client"

import { useEffect, useRef, useState } from "react"
import { Calendar, MapPin, Award } from "lucide-react"

const experiences = [
  {
    title: "Java Skills Program",
    company: "Afrika Tikkun",
    location: "Johannesburg",
    period: "2025 - 10/2025",
    description:
      "Completed comprehensive modules on Java fundamentals, exception handling, collections framework, and database connectivity (JDBC). Gained hands-on experience with teamwork and agile methodologies in a professional learning environment.",
    achievements: [
      "Mastered Java SE 8 programming concepts",
      "Implemented database connectivity solutions",
      "Collaborated in agile development teams",
    ],
  },
  {
    title: "IT Graduate",
    company: "Rosebank College",
    location: "Pretoria",
    period: "01/2021 – 12/2023",
    description:
      "Completed Diploma in Information Technology with distinction, majoring in Software Development. Achieved 80% cumulative average and recognized as Class of 2023 Top Achiever.",
    achievements: [
      "Graduated with 80% distinction",
      "Top achiever in graduating class",
      "Specialized in software development",
    ],
  },
]

const certifications = [
  "Oracle Certified Associate, Java SE 8 Programmer",
  "IBM Artificial Intelligence",
  "IBM Professional Skills Information Technology Specialist",
]

export function Experience() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

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
    <section id="experience" ref={sectionRef} className="py-20">
      <div className="container mx-auto px-6">
        <div className={`transition-all duration-1000 ${isVisible ? "animate-slide-up" : "opacity-0"}`}>
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
            Experience & Education
          </h2>

          <div className="max-w-4xl mx-auto">
            {/* Timeline */}
            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-primary/30"></div>

              {experiences.map((exp, index) => (
                <div key={index} className="relative mb-12 ml-16">
                  <div className="absolute -left-10 top-6 w-4 h-4 bg-primary rounded-full border-4 border-background"></div>

                  <div className="glass-strong rounded-xl p-6 hover:glass transition-all duration-300">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-primary mb-1">{exp.title}</h3>
                        <p className="text-lg font-medium">{exp.company}</p>
                      </div>
                      <div className="flex flex-col md:items-end text-sm text-muted-foreground mt-2 md:mt-0">
                        <div className="flex items-center mb-1">
                          <Calendar className="mr-2 h-4 w-4" />
                          {exp.period}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="mr-2 h-4 w-4" />
                          {exp.location}
                        </div>
                      </div>
                    </div>

                    <p className="text-muted-foreground mb-4 leading-relaxed">{exp.description}</p>

                    <div className="space-y-2">
                      {exp.achievements.map((achievement, i) => (
                        <div key={i} className="flex items-center text-sm">
                          <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                          {achievement}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Certifications */}
            <div className="mt-16">
              <h3 className="text-2xl font-bold mb-8 flex items-center">
                <Award className="mr-3 h-6 w-6 text-primary" />
                Certifications
              </h3>

              <div className="grid md:grid-cols-2 gap-4">
                {certifications.map((cert, index) => (
                  <div key={index} className="glass rounded-xl p-4 hover:glass-strong transition-all duration-300">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-primary rounded-full mr-3"></div>
                      <span className="font-medium">{cert}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
