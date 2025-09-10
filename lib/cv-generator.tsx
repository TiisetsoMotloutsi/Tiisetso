import { cvData } from "./cv-data"

export const downloadCV = async () => {
  try {
    const { jsPDF } = await import("jspdf")

    const doc = new jsPDF()

    const pageWidth = doc.internal.pageSize.width
    const margin = 20
    let yPosition = 30

    // Helper function to add text with word wrapping
    const addText = (text: string, fontSize = 10, isBold = false) => {
      doc.setFontSize(fontSize)
      if (isBold) {
        doc.setFont("helvetica", "bold")
      } else {
        doc.setFont("helvetica", "normal")
      }

      const lines = doc.splitTextToSize(text, pageWidth - 2 * margin)
      doc.text(lines, margin, yPosition)
      yPosition += lines.length * (fontSize * 0.4) + 5
    }

    // Add header
    addText(cvData.personalInfo.name, 18, true)
    addText(cvData.personalInfo.title, 14, true)
    addText(`Email: ${cvData.personalInfo.email}`, 10)
    addText(`Phone: ${cvData.personalInfo.phone}`, 10)
    addText(`Address: ${cvData.personalInfo.address}`, 10)

    yPosition += 10

    // Add Profile section
    addText("PROFILE", 14, true)
    addText(cvData.profile, 10)

    yPosition += 10

    // Add Education section
    addText("EDUCATION", 14, true)
    cvData.education.forEach((edu) => {
      addText(`${edu.institution}, ${edu.degree}`, 12, true)
      addText(`${edu.period} | ${edu.location}`, 10)
      edu.details.forEach((detail) => {
        addText(`• ${detail}`, 10)
      })
      yPosition += 5
    })

    // Add Professional Experience section
    addText("PROFESSIONAL EXPERIENCE", 14, true)
    cvData.experience.forEach((exp) => {
      addText(`${exp.title}, ${exp.company}`, 12, true)
      addText(`${exp.period} | ${exp.location}`, 10)
      exp.responsibilities.forEach((resp) => {
        addText(`• ${resp}`, 10)
      })
      yPosition += 5
    })

    // Add Certificates section
    addText("CERTIFICATES", 14, true)
    cvData.certificates.forEach((cert) => {
      addText(`• ${cert}`, 10)
    })

    yPosition += 10

    // Add Skills section
    addText("SKILLS", 14, true)
    const skillsText = cvData.skills.join(" • ")
    addText(skillsText, 10)

    doc.save("Tiisetso_Motloutsi_CV.pdf")
  } catch (error) {
    console.error("Error generating PDF:", error)
    downloadHTMLCV()
  }
}

const downloadHTMLCV = () => {
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>${cvData.personalInfo.name} - CV</title>
      <style>
        body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; line-height: 1.6; }
        .header { text-align: center; margin-bottom: 30px; }
        .name { font-size: 24px; font-weight: bold; margin-bottom: 5px; }
        .title { font-size: 18px; color: #666; margin-bottom: 15px; }
        .contact { font-size: 14px; }
        .section { margin-bottom: 25px; }
        .section-title { font-size: 16px; font-weight: bold; border-bottom: 2px solid #333; margin-bottom: 10px; }
        .item { margin-bottom: 15px; }
        .item-title { font-weight: bold; }
        .item-subtitle { color: #666; font-style: italic; }
        ul { margin: 5px 0; padding-left: 20px; }
        .skills { display: flex; flex-wrap: wrap; gap: 10px; }
        .skill { background: #f0f0f0; padding: 5px 10px; border-radius: 5px; }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="name">${cvData.personalInfo.name}</div>
        <div class="title">${cvData.personalInfo.title}</div>
        <div class="contact">
          ${cvData.personalInfo.email} | ${cvData.personalInfo.phone}<br>
          ${cvData.personalInfo.address}
        </div>
      </div>
      
      <div class="section">
        <div class="section-title">PROFILE</div>
        <p>${cvData.profile}</p>
      </div>
      
      <div class="section">
        <div class="section-title">EDUCATION</div>
        ${cvData.education
          .map(
            (edu) => `
          <div class="item">
            <div class="item-title">${edu.institution}</div>
            <div class="item-subtitle">${edu.degree} | ${edu.period} | ${edu.location}</div>
            <ul>
              ${edu.details.map((detail) => `<li>${detail}</li>`).join("")}
            </ul>
          </div>
        `,
          )
          .join("")}
      </div>
      
      <div class="section">
        <div class="section-title">PROFESSIONAL EXPERIENCE</div>
        ${cvData.experience
          .map(
            (exp) => `
          <div class="item">
            <div class="item-title">${exp.title}</div>
            <div class="item-subtitle">${exp.company} | ${exp.period} | ${exp.location}</div>
            <ul>
              ${exp.responsibilities.map((resp) => `<li>${resp}</li>`).join("")}
            </ul>
          </div>
        `,
          )
          .join("")}
      </div>
      
      <div class="section">
        <div class="section-title">CERTIFICATES</div>
        <ul>
          ${cvData.certificates.map((cert) => `<li>${cert}</li>`).join("")}
        </ul>
      </div>
      
      <div class="section">
        <div class="section-title">SKILLS</div>
        <div class="skills">
          ${cvData.skills.map((skill) => `<span class="skill">${skill}</span>`).join("")}
        </div>
      </div>
    </body>
    </html>
  `

  const blob = new Blob([htmlContent], { type: "text/html" })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = "Tiisetso_Motloutsi_CV.html"
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
