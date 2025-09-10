"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail, Download } from "lucide-react"
import { downloadCV } from "@/lib/cv-generator"

export function Hero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const scrollToContact = () => {
    const element = document.getElementById("contact")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleDownloadCV = () => {
    downloadCV()
  }

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="container mx-auto px-6 text-center">
        <div className={`transition-all duration-1000 ${isVisible ? "animate-slide-up" : "opacity-0"}`}>
          {/* Profile Picture */}
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="w-32 h-32 rounded-full glass-strong p-1 animate-glow">
                <img
                  src="/software-developer-portrait.png"
                  alt="Tiisetso Motloutsi"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full animate-pulse" />
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-4 text-white bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent [&]:text-white">
            Tiisetso Motloutsi
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-2">Software Developer</p>

          <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
            Passionate about creating innovative solutions with cutting-edge technology. Specializing in web
            development, software engineering, and digital experiences.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button
              size="lg"
              onClick={scrollToContact}
              className="bg-primary hover:bg-primary/80 text-white border-0 transition-all duration-300 group"
            >
              <Mail className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
              Get In Touch
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={handleDownloadCV}
              className="bg-gray-800/80 border-gray-600/60 text-white hover:bg-gray-700/80 hover:border-gray-500/60 backdrop-blur-sm transition-all duration-300"
            >
              <Download className="mr-2 h-4 w-4" />
              Download CV
            </Button>
          </div>

          <div className="flex justify-center space-x-6">
            <a
              href="https://github.com/TiisetsoMotloutsi"
              className="text-gray-400 hover:text-primary transition-colors duration-200 hover:scale-110 transform"
            >
              <Github className="h-6 w-6" />
            </a>
            <a
              href="https://www.linkedin.com/in/tiisetso-motloutsi-84ab49296/"
              className="text-gray-400 hover:text-primary transition-colors duration-200 hover:scale-110 transform"
            >
              <Linkedin className="h-6 w-6" />
            </a>
            <a
              href="mailto:setswo173@gmail.com"
              className="text-gray-400 hover:text-primary transition-colors duration-200 hover:scale-110 transform"
            >
              <Mail className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
