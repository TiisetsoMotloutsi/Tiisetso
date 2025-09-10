"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, Send, CheckCircle, XCircle } from "lucide-react"

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null
    message: string
  }>({ type: null, message: "" })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus({ type: null, message: "" })

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setSubmitStatus({
          type: "success",
          message: data.message,
        })
        setFormData({ name: "", email: "", message: "" })

        setTimeout(() => {
          setSubmitStatus({ type: null, message: "" })
        }, 5000)
      } else {
        setSubmitStatus({
          type: "error",
          message: data.error || "Failed to send message",
        })
      }
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "Network error. Please check your connection and try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12 text-white bg-gradient-to-r from-primary to-blue-400 bg-clip-text">
          Get In Touch
        </h2>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-6">Let's Connect</h3>
              <p className="text-muted-foreground leading-relaxed mb-8">
                I'm always interested in new opportunities and exciting projects. Whether you have a question, want to
                collaborate, or just want to say hello, I'd love to hear from you!
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center space-x-4 bg-gray-800/40 backdrop-blur-sm border border-primary/20 rounded-xl p-4 hover:bg-gray-800/60 transition-all duration-300">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="font-medium text-white">Email</div>
                  <div className="text-muted-foreground">
                    <a
                      href="mailto:setswo173@gmail.com"
                      className="hover:text-primary transition-colors duration-200 hover:underline"
                    >
                      setswo173@gmail.com
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-4 bg-gray-800/40 backdrop-blur-sm border border-primary/20 rounded-xl p-4 hover:bg-gray-800/60 transition-all duration-300">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="font-medium text-white">Phone</div>
                  <div className="text-muted-foreground">
                    <a
                      href="tel:+27820439431"
                      className="hover:text-primary transition-colors duration-200 hover:underline"
                    >
                      0820439431
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-4 bg-gray-800/40 backdrop-blur-sm border border-primary/20 rounded-xl p-4 hover:bg-gray-800/60 transition-all duration-300">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="font-medium text-white">Location</div>
                  <div className="text-muted-foreground">Johannesburg, South Africa</div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gray-800/30 backdrop-blur-sm border border-primary/20 rounded-2xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2 text-gray-200">
                  Name
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="glass border-primary/30 focus:border-primary"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-200">
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="glass border-primary/30 focus:border-primary"
                  placeholder="setswo173@gmail.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2 text-gray-200">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="glass border-primary/30 focus:border-primary resize-none"
                  placeholder="Tell me about your project or just say hello..."
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary hover:bg-primary/80 transition-all duration-300 group"
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Sending...
                  </div>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    Send Message
                  </>
                )}
              </Button>

              {submitStatus.type && (
                <div
                  className={`flex items-center space-x-2 text-sm rounded-lg p-3 animate-fade-in ${
                    submitStatus.type === "success"
                      ? "text-green-400 bg-green-400/10 border border-green-400/20"
                      : "text-red-400 bg-red-400/10 border border-red-400/20"
                  }`}
                >
                  {submitStatus.type === "success" ? (
                    <CheckCircle className="h-4 w-4 flex-shrink-0" />
                  ) : (
                    <XCircle className="h-4 w-4 flex-shrink-0" />
                  )}
                  <span>{submitStatus.message}</span>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-20 pt-8 border-t border-primary/20 text-center">
          <p className="text-muted-foreground">
            &copy; 2025 Tiisetso Motloutsi. Built with passion and cutting-edge technology.
          </p>
        </footer>
      </div>
    </section>
  )
}
