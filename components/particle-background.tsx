"use client"

import { useEffect } from "react"

export function ParticleBackground() {
  useEffect(() => {
    const createParticle = () => {
      const particle = document.createElement("div")
      particle.className = "particle"
      particle.style.left = Math.random() * 100 + "%"
      particle.style.animationDelay = Math.random() * 20 + "s"
      particle.style.animationDuration = Math.random() * 10 + 15 + "s"

      const particles = document.querySelector(".particles")
      if (particles) {
        particles.appendChild(particle)

        setTimeout(() => {
          particle.remove()
        }, 25000)
      }
    }

    const interval = setInterval(createParticle, 300)

    // Create initial particles
    for (let i = 0; i < 50; i++) {
      setTimeout(createParticle, i * 100)
    }

    return () => clearInterval(interval)
  }, [])

  return <div className="particles" />
}
