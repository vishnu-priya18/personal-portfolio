import os
import subprocess

# Define the HTML content for the resume
html_content = """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Vishnu Priya - Resume</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        body {
            font-family: 'Inter', sans-serif;
            color: #1e293b;
            background: #ffffff;
            line-height: 1.4;
            font-size: 10.5pt;
            -webkit-print-color-adjust: exact;
        }

        @page {
            size: A4;
            margin: 12mm 15mm;
        }

        .container {
            width: 100%;
            max-width: 800px;
            margin: 0 auto;
        }

        /* Header Styles */
        header {
            border-bottom: 2px solid #0f172a;
            padding-bottom: 12px;
            margin-bottom: 16px;
        }

        .header-title {
            font-size: 24pt;
            font-weight: 800;
            color: #0f172a;
            letter-spacing: -0.5px;
            line-height: 1.1;
        }

        .header-subtitle {
            font-size: 11pt;
            font-weight: 500;
            color: #0d9488;
            margin-top: 4px;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        /* Two Column Layout */
        .main-grid {
            display: grid;
            grid-template-columns: 240px 1fr;
            gap: 24px;
        }

        /* Sidebar (Left Column) */
        .sidebar {
            border-right: 1px solid #e2e8f0;
            padding-right: 16px;
        }

        /* Main Content (Right Column) */
        .content {
            padding-left: 4px;
        }

        /* Section Typography */
        section {
            margin-bottom: 16px;
        }

        .section-title {
            font-size: 10.5pt;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 1.5px;
            color: #0f172a;
            border-bottom: 1.5px solid #0f172a;
            padding-bottom: 3px;
            margin-bottom: 8px;
        }

        /* Contact Details */
        .contact-item {
            margin-bottom: 5px;
            font-size: 9pt;
            color: #475569;
        }
        
        .contact-item strong {
            color: #0f172a;
        }

        .contact-item a {
            color: #0d9488;
            text-decoration: none;
        }

        /* Skills Lists */
        .skill-group {
            margin-bottom: 8px;
        }

        .skill-group-title {
            font-size: 8.5pt;
            font-weight: 700;
            color: #475569;
            text-transform: uppercase;
            margin-bottom: 3px;
        }

        .skill-list {
            font-size: 9pt;
            color: #334155;
            list-style: none;
            padding-left: 0;
        }

        .skill-list li {
            margin-bottom: 2px;
            display: inline-block;
            background: #f1f5f9;
            padding: 2px 6px;
            border-radius: 4px;
            font-size: 8pt;
            margin-right: 4px;
            margin-top: 4px;
        }

        /* Items (Education, Experience, Projects) */
        .item {
            margin-bottom: 10px;
        }

        .item-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            font-size: 9.5pt;
            font-weight: 700;
            color: #0f172a;
        }

        .item-sub {
            display: flex;
            justify-content: space-between;
            font-size: 8.5pt;
            color: #0d9488;
            font-weight: 500;
            margin-top: 1px;
            margin-bottom: 4px;
        }

        .item-desc {
            font-size: 9pt;
            color: #475569;
            line-height: 1.35;
        }
        
        .bullet-list {
            margin-top: 3px;
            padding-left: 14px;
            font-size: 8.5pt;
            color: #475569;
        }
        
        .bullet-list li {
            margin-bottom: 2px;
        }

        /* Summary */
        .summary-text {
            font-size: 9.5pt;
            color: #334155;
            line-height: 1.4;
            margin-bottom: 12px;
        }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1 class="header-title">VISHNU PRIYA S</h1>
            <div class="header-subtitle">Biomedical Engineering Student & AI Healthcare Innovator</div>
        </header>

        <div class="main-grid">
            <!-- Left Side Column -->
            <div class="sidebar">
                <section>
                    <h2 class="section-title">Contact</h2>
                    <div class="contact-item"><strong>Email:</strong><br><a href="mailto:vishnupriya.24bme@sonatech.ac.in">vishnupriya.24bme@sonatech.ac.in</a></div>
                    <div class="contact-item"><strong>GitHub:</strong><br><a href="https://github.com/vishnu-priya18" target="_blank">github.com/vishnu-priya18</a></div>
                    <div class="contact-item"><strong>LinkedIn:</strong><br><a href="https://www.linkedin.com/in/vishnu-priya-01372931a" target="_blank">linkedin.com/in/vishnu-priya-01372931a</a></div>
                    <div class="contact-item"><strong>Location:</strong><br>Salem, Tamil Nadu, India</div>
                </section>

                <section>
                    <h2 class="section-title">Education</h2>
                    <div class="item">
                        <div class="item-header" style="font-size: 9pt;">B.E. Biomedical Engineering</div>
                        <div class="item-sub" style="font-size: 8pt;">Sona College of Technology</div>
                        <div style="font-size: 8pt; color: #64748b; margin-top: -3px;">2024 – 2028 | Salem, TN</div>
                    </div>
                    <div class="item">
                        <div class="item-header" style="font-size: 9pt;">12th Grade (HSC)</div>
                        <div class="item-sub" style="font-size: 8pt;">Saraswati Matric School</div>
                        <div style="font-size: 8pt; color: #64748b; margin-top: -3px;">Year: 2022 | Score: 74.6%</div>
                    </div>
                    <div class="item">
                        <div class="item-header" style="font-size: 9pt;">10th Grade (SSLC)</div>
                        <div class="item-sub" style="font-size: 8pt;">Govt Girls School, Belur</div>
                        <div style="font-size: 8pt; color: #64748b; margin-top: -3px;">Year: 2021</div>
                    </div>
                </section>

                <section>
                    <h2 class="section-title">Skills</h2>
                    <div class="skill-group">
                        <div class="skill-group-title">Programming</div>
                        <ul class="skill-list">
                            <li>Python</li>
                            <li>C Programming</li>
                            <li>C++</li>
                            <li>HTML</li>
                        </ul>
                    </div>
                    <div class="skill-group" style="margin-top: 10px;">
                        <div class="skill-group-title">IoT & Hardware</div>
                        <ul class="skill-list">
                            <li>Arduino</li>
                            <li>ESP32</li>
                            <li>Raspberry Pi</li>
                            <li>Sensors Interfacing</li>
                        </ul>
                    </div>
                    <div class="skill-group" style="margin-top: 10px;">
                        <div class="skill-group-title">Biomedical Domain</div>
                        <ul class="skill-list">
                            <li>AI in Healthcare</li>
                            <li>Signal Processing</li>
                            <li>ECG Analysis</li>
                            <li>Medical Devices</li>
                            <li>TensorFlow</li>
                            <li>OpenCV</li>
                            <li>MATLAB</li>
                        </ul>
                    </div>
                </section>
            </div>

            <!-- Right Side Column -->
            <div class="content">
                <section>
                    <h2 class="section-title">Professional Summary</h2>
                    <p class="summary-text">
                        Dedicated and analytical Biomedical Engineering undergraduate student (2024–2028) at Sona College of Technology. Focused on integrating advanced technology, specifically Artificial Intelligence (AI) and the Internet of Things (IoT), with clinical medicine. Experienced in smart healthcare systems design, ECG data analysis, and microcontrollers. Committed to building innovative healthcare technology that improves medical diagnostics and enhances patient care systems.
                    </p>
                </section>

                <section>
                    <h2 class="section-title">Internship</h2>
                    <div class="item">
                        <div class="item-header">Healthcare Technology Intern</div>
                        <div class="item-sub">Medsby | Completed</div>
                        <p class="item-desc">
                            Acquired practical exposure to biomedical engineering systems and clinical protocols:
                        </p>
                        <ul class="bullet-list">
                            <li>Gained hands-on experience with hospital-grade diagnostic and physiological monitoring equipment.</li>
                            <li>Studied end-to-end medical technology workflows, from sensor data capture to patient dashboard application.</li>
                            <li>Collaborated on conceptualizing systems that bridge clinical practice and hardware technologies.</li>
                        </ul>
                    </div>
                </section>

                <section>
                    <h2 class="section-title">Academic Projects</h2>
                    <div class="item">
                        <div class="item-header">AI-Based Drowsiness Detection System</div>
                        <div class="item-sub">Arduino, Computer Vision, OpenCV</div>
                        <p class="item-desc">
                            Designed a real-time driver assistance system combining machine learning and computer vision to detect physical fatigue, trigger alerts, and prevent traffic accidents.
                        </p>
                    </div>
                    <div class="item">
                        <div class="item-header">Pulse Oximeter using ESP32</div>
                        <div class="item-sub">ESP32 Microcontroller, IoT Cloud</div>
                        <p class="item-desc">
                            Built a compact wireless wearable oximeter designed to continuously measure blood oxygen saturation (SpO₂) and heart rate, transmitting real-time readings to a secure IoT dashboard.
                        </p>
                    </div>
                    <div class="item">
                        <div class="item-header">Smart Wearable Health Monitoring Bracelet</div>
                        <div class="item-sub">IoT, Embedded Systems, Biomedical Sensors</div>
                        <p class="item-desc">
                            Developed a multi-sensor wearable wristband tracking body temperature, heart rate, and steps, establishing an automated alert system for abnormal physiological thresholds.
                        </p>
                    </div>
                </div>

                <section style="margin-top: 12px;">
                    <h2 class="section-title">Certifications</h2>
                    <div class="item" style="margin-bottom: 6px;">
                        <div class="item-header" style="font-size: 9pt;">Design Thinking — Silver + Elite (78%)</div>
                        <div class="item-sub" style="font-size: 8pt; margin-bottom: 0;">NPTEL — IIT</div>
                    </div>
                    <div class="item" style="margin-bottom: 6px;">
                        <div class="item-header" style="font-size: 9pt;">Introduction to Cardiovascular Mechanics — Elite (68%)</div>
                        <div class="item-sub" style="font-size: 8pt; margin-bottom: 0;">NPTEL — IIT</div>
                    </div>
                    <div class="item" style="margin-bottom: 6px;">
                        <div class="item-header" style="font-size: 9pt;">Software Development Using Python</div>
                        <div class="item-sub" style="font-size: 8pt; margin-bottom: 0;">IMIC Training Centre</div>
                    </div>
                    <div class="item" style="margin-bottom: 6px;">
                        <div class="item-header" style="font-size: 9pt;">Digital Skills & Python Basics</div>
                        <div class="item-sub" style="font-size: 8pt; margin-bottom: 0;">FutureSkills Prime</div>
                    </div>
                </section>
            </div>
        </div>
    </div>
</body>
</html>
"""

# Write HTML content to a temporary file in the local script directory
html_file_path = os.path.abspath("resume_temp.html")
with open(html_file_path, "w", encoding="utf-8") as f:
    f.write(html_content)

# Target PDF path in public folder of portfolio-app
script_dir = os.path.dirname(os.path.abspath(__file__))
public_dir = os.path.join(script_dir, "..", "public")
pdf_file_path = os.path.abspath(os.path.join(public_dir, "Vishnu_Priya_Resume.pdf"))

# Ensure the public directory exists
os.makedirs(public_dir, exist_ok=True)

# Path to Microsoft Edge application on Windows
edge_path = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"

# Arguments to run Edge in headless mode and print HTML to PDF
args = [
    edge_path,
    "--headless",
    "--disable-gpu",
    f"--print-to-pdf={pdf_file_path}",
    "--no-margins",
    html_file_path
]

print(f"Temporary HTML path: {html_file_path}")
print(f"Target PDF path: {pdf_file_path}")
print("Running Edge PDF converter...")

try:
    result = subprocess.run(args, capture_output=True, text=True, check=True)
    print("Edge execution completed.")
    if os.path.exists(pdf_file_path) and os.path.getsize(pdf_file_path) > 0:
        print(f"Success! PDF generated at {pdf_file_path} ({os.path.getsize(pdf_file_path)} bytes)")
    else:
        print("Failed to generate PDF file. Output is empty or missing.")
except Exception as e:
    print(f"An error occurred during PDF generation: {e}")

# Clean up temp HTML file
if os.path.exists(html_file_path):
    try:
        os.remove(html_file_path)
        print("Cleaned up temporary HTML file.")
    except Exception as e:
        print(f"Could not delete temp HTML: {e}")
