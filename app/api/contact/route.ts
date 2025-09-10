import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json()

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    // Simulate processing time for real-time effect
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Here you would typically:
    // 1. Save to database
    // 2. Send email notification
    // 3. Integrate with email service (Resend, SendGrid, etc.)

    console.log("New contact form submission:", { name, email, message, timestamp: new Date().toISOString() })

    return NextResponse.json({
      success: true,
      message: "Message sent successfully! I'll get back to you soon.",
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json({ error: "Failed to send message. Please try again." }, { status: 500 })
  }
}
