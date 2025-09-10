import { cvData } from "./cv-data"

export function generateCVHTML(): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${cvData.personalInfo.name} - CV</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 40px 20px;
            background: #fff;
        }
        
        .header {
            text-align: center;
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 2px solid #8b5cf6;
        }
        
        .name {
            font-size: 2.5em;
            font-weight: bold;
            color: #1f2937;
            margin-bottom: 5px;
        }
        
        .title {
            font-size: 1.2em;
            color: #8b5cf6;
            margin-bottom: 15px;
        }
        
        .contact-info {
            display: flex;
            justify-content: center;
            gap: 20px;
            flex-wrap: wrap;
            font-size: 0.9em;
            color: #6b7280;
        }
        
        .section {
            margin-bottom: 25px;
        }
        
        .section-title {
            font-size: 1.3em;
            font-weight: bold;
            color: #1f2937;
            margin-bottom: 10px;
            padding-bottom: 5px;
            border-bottom: 1px solid #e5e7eb;
        }
        
        .profile-text {
            text-align: justify;
            color: #4b5563;
            line-height: 1.7;
        }
        
        .education-item, .experience-item {
            margin-bottom: 20px;
            padding: 15px;
            background: #f9fafb;
            border-left: 4px solid #8b5cf6;
        }
        
        .item-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 8px;
            flex-wrap: wrap;
        }
        
        .item-title {
            font-weight: bold;
            color: #1f2937;
        }
        
        .item-period {
            color: #6b7280;
            font-size: 0.9em;
        }
        
        .item-subtitle {
            color: #8b5cf6;
            margin-bottom: 5px;
        }
        
        .item-location {
            color: #6b7280;
            font-size: 0.9em;
            margin-bottom: 8px;
        }
        
        .item-details {
            list-style: none;
            padding-left: 0;
        }
        
        .item-details li {
            margin-bottom: 3px;
            padding-left: 15px;
            position: relative;
        }
        
        .item-details li:before {
            content: "•";
            color: #8b5cf6;
            position: absolute;
            left: 0;
        }
        
        .certificates-list, .skills-list {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
        }
        
        .certificate-item, .skill-item {
            background: #8b5cf6;
            color: white;
            padding: 5px 12px;
            border-radius: 15px;
            font-size: 0.9em;
        }
        
        @media print {
            body {
                padding: 20px;
            }
            
            .header {
                margin-bottom: 20px;
            }
            
            .section {
                margin-bottom: 15px;
            }
        }
        
        @media (max-width: 600px) {
            .contact-info {
                flex-direction: column;
                gap: 5px;
            }
            
            .item-header {
                flex-direction: column;
            }
            
            .certificates-list, .skills-list {
                justify-content: center;
            }
        }
    </style>
</head>
<body>
    <div class="header">
        <h1 class="name">${cvData.personalInfo.name}</h1>
        <p class="title">${cvData.personalInfo.title}</p>
        <div class="contact-info">
            <span>${cvData.personalInfo.email}</span>
            <span>${cvData.personalInfo.phone}</span>
            <span>${cvData.personalInfo.address}</span>
        </div>
    </div>

    <div class="section">
        <h2 class="section-title">Profile</h2>
        <p class="profile-text">${cvData.profile}</p>
    </div>

    <div class="section">
        <h2 class="section-title">Education</h2>
        ${cvData.education
          .map(
            (edu) => `
            <div class="education-item">
                <div class="item-header">
                    <div>
                        <div class="item-title">${edu.institution}</div>
                        <div class="item-subtitle">${edu.degree}</div>
                    </div>
                    <div class="item-period">${edu.period}</div>
                </div>
                <div class="item-location">${edu.location}</div>
                <ul class="item-details">
                    ${edu.details.map((detail) => `<li>${detail}</li>`).join("")}
                </ul>
            </div>
        `,
          )
          .join("")}
    </div>

    <div class="section">
        <h2 class="section-title">Professional Experience</h2>
        ${cvData.experience
          .map(
            (exp) => `
            <div class="experience-item">
                <div class="item-header">
                    <div>
                        <div class="item-title">${exp.title}</div>
                        <div class="item-subtitle">${exp.company}</div>
                    </div>
                    <div class="item-period">${exp.period}</div>
                </div>
                <div class="item-location">${exp.location}</div>
                <ul class="item-details">
                    ${exp.responsibilities.map((resp) => `<li>${resp}</li>`).join("")}
                </ul>
            </div>
        `,
          )
          .join("")}
    </div>

    <div class="section">
        <h2 class="section-title">Certificates</h2>
        <div class="certificates-list">
            ${cvData.certificates.map((cert) => `<span class="certificate-item">${cert}</span>`).join("")}
        </div>
    </div>

    <div class="section">
        <h2 class="section-title">Skills</h2>
        <div class="skills-list">
            ${cvData.skills.map((skill) => `<span class="skill-item">${skill}</span>`).join("")}
        </div>
    </div>
</body>
</html>
  `
}

export function downloadCV() {
  const cvHTML = generateCVHTML()
  const blob = new Blob([cvHTML], { type: "text/html" })
  const url = URL.createObjectURL(blob)

  const link = document.createElement("a")
  link.href = url
  link.download = "Tiisetso_Motloutsi_CV.html"
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)

  URL.revokeObjectURL(url)
}
