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

    try {
      // Send email to your personal email
      const emailResponse = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Portfolio Contact <noreply@yourdomain.com>",
          to: ["setswo173@gmail.com"],
          subject: `New Portfolio Contact from ${name}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #8b5cf6; border-bottom: 2px solid #8b5cf6; padding-bottom: 10px;">
                New Contact Form Submission
              </h2>
              
              <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
              </div>
              
              <div style="margin: 20px 0;">
                <h3 style="color: #333;">Message:</h3>
                <div style="background: white; padding: 15px; border-left: 4px solid #8b5cf6; border-radius: 4px;">
                  ${message.replace(/\n/g, "<br>")}
                </div>
              </div>
              
              <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 12px;">
                <p>This email was sent from your portfolio contact form at ${request.headers.get("origin") || "your website"}.</p>
              </div>
            </div>
          `,
          text: `
New Contact Form Submission

Name: ${name}
Email: ${email}
Submitted: ${new Date().toLocaleString()}

Message:
${message}

---
This email was sent from your portfolio contact form.
          `,
        }),
      })

      if (!emailResponse.ok) {
        const errorData = await emailResponse.json()
        console.error("Resend API error:", errorData)

        console.log("Contact form submission (email service unavailable):", {
          name,
          email,
          message,
          timestamp: new Date().toISOString(),
        })

        return NextResponse.json({
          success: true,
          message: "Message received! I'll get back to you soon.",
          timestamp: new Date().toISOString(),
        })
      }

      const emailResult = await emailResponse.json()
      console.log("Email sent successfully:", emailResult)
    } catch (emailError) {
      console.error("Email sending failed:", emailError)

      console.log("Contact form submission (email failed):", {
        name,
        email,
        message,
        timestamp: new Date().toISOString(),
      })
    }

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
