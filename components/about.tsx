"use client"

import { useEffect, useRef, useState } from "react"

export function About() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" ref={sectionRef} className="py-20">
      <div className="container mx-auto px-6">
        <div className={`transition-all duration-1000 ${isVisible ? "animate-slide-up" : "opacity-0"}`}>
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
            About Me
          </h2>

          <div className="max-w-4xl mx-auto">
            <div className="glass-strong rounded-2xl p-8 mb-8">
              <p className="text-lg leading-relaxed mb-6">
                Hello! I'm Tiisetso Motloutsi, a passionate{" "}
                <span className="text-primary font-semibold">Information Technology graduate</span> with a strong
                foundation in software development and web technologies. I thrive on creating innovative solutions that
                bridge the gap between complex technical challenges and user-friendly experiences.
              </p>

              <p className="text-lg leading-relaxed mb-6">
                With expertise in{" "}
                <span className="text-primary font-semibold">Java, C#, HTML, CSS, and JavaScript</span>, I'm constantly
                exploring new technologies and methodologies to stay at the forefront of the ever-evolving tech
                landscape.
              </p>

              <p className="text-lg leading-relaxed">
                My approach combines <span className="text-primary font-semibold">analytical thinking</span> with
                <span className="text-primary font-semibold"> creative problem-solving</span>, ensuring that every
                project I work on is not only technically sound but also delivers exceptional value to users and
                stakeholders.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="glass rounded-xl p-6 text-center hover:glass-strong transition-all duration-300 group">
                <div className="text-3xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform">
                  80%
                </div>
                <div className="text-sm text-muted-foreground">Cumulative Average</div>
                <div className="text-xs text-secondary mt-1">Distinction Graduate</div>
              </div>

             

              <div className="glass rounded-xl p-6 text-center hover:glass-strong transition-all duration-300 group">
                <div className="text-3xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform">
                  5+
                </div>
                <div className="text-sm text-muted-foreground">Technologies</div>
                <div className="text-xs text-secondary mt-1">Proficient In</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
