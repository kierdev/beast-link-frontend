"use client";
import { useState } from "react";
import styles from "./dashboard.module.css";

export default function CourseDetails({ course, onClose }) {
  const [activeTab, setActiveTab] = useState("overview");

  if (!course) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <div className={styles.courseTag}>{course.college}</div>
          <h2 className={styles.modalTitle}>{course.title}</h2>
          <button className={styles.closeButton} onClick={onClose}>
            ×
          </button>
        </div>

        <div className={styles.modalTabs}>
          <button
            className={`${styles.modalTab} ${
              activeTab === "overview" ? styles.activeModalTab : ""
            }`}
            onClick={() => setActiveTab("overview")}
          >
            Overview
          </button>
          <button
            className={`${styles.modalTab} ${
              activeTab === "curriculum" ? styles.activeModalTab : ""
            }`}
            onClick={() => setActiveTab("curriculum")}
          >
            Curriculum
          </button>
          <button
            className={`${styles.modalTab} ${
              activeTab === "admission" ? styles.activeModalTab : ""
            }`}
            onClick={() => setActiveTab("admission")}
          >
            Admission
          </button>
          <button
            className={`${styles.modalTab} ${
              activeTab === "financial" ? styles.activeModalTab : ""
            }`}
            onClick={() => setActiveTab("financial")}
          >
            Financial
          </button>
        </div>

        <div className={styles.modalBody}>
          {activeTab === "overview" && (
            <>
              <h3 className={styles.sectionHeading}>Course Overview</h3>
              <p className={styles.courseDescription}>{course.description}</p>

              <div className={styles.courseInfoGrid}>
                <div className={styles.courseInfoItem}>
                  <span className={styles.infoIcon}>⏱️</span>
                  <span className={styles.infoLabel}>Duration:</span>
                  <span className={styles.infoValue}>4 years</span>
                </div>
                <div className={styles.courseInfoItem}>
                  <span className={styles.infoIcon}>📚</span>
                  <span className={styles.infoLabel}>Credits:</span>
                  <span className={styles.infoValue}>120</span>
                </div>
                <div className={styles.courseInfoItem}>
                  <span className={styles.infoIcon}>📅</span>
                  <span className={styles.infoLabel}>Start Date:</span>
                  <span className={styles.infoValue}>August 2025</span>
                </div>
                <div className={styles.courseInfoItem}>
                  <span className={styles.infoIcon}>👨‍🏫</span>
                  <span className={styles.infoLabel}>Faculty:</span>
                  <span className={styles.infoValue}>Dr. Sarah Johnson</span>
                </div>
                <div className={styles.courseInfoItem}>
                  <span className={styles.infoIcon}>📍</span>
                  <span className={styles.infoLabel}>Location:</span>
                  <span className={styles.infoValue}>
                    Main Campus, Building A
                  </span>
                </div>
                <div className={styles.courseInfoItem}>
                  <span className={styles.infoIcon}>💰</span>
                  <span className={styles.infoLabel}>Tuition:</span>
                  <span className={styles.infoValue}>$12,500 per year</span>
                </div>
              </div>

              <h3 className={styles.sectionHeading}>Career Opportunities</h3>
              <ul className={styles.careerList}>
                <li>Software Developer</li>
                <li>Systems Analyst</li>
                <li>Database Administrator</li>
                <li>Web Developer</li>
                <li>IT Consultant</li>
              </ul>
            </>
          )}

          {activeTab === "curriculum" && (
            <>
              <h3 className={styles.sectionHeading}>Curriculum Highlights</h3>
              <div className={styles.curriculumGrid}>
                <div className={styles.curriculumItem}>
                  <span className={styles.curriculumIcon}>📝</span>
                  <span>Introduction to Programming</span>
                </div>
                <div className={styles.curriculumItem}>
                  <span className={styles.curriculumIcon}>📊</span>
                  <span>Data Structures and Algorithms</span>
                </div>
                <div className={styles.curriculumItem}>
                  <span className={styles.curriculumIcon}>💾</span>
                  <span>Database Systems</span>
                </div>
                <div className={styles.curriculumItem}>
                  <span className={styles.curriculumIcon}>🌐</span>
                  <span>Web Development</span>
                </div>
                <div className={styles.curriculumItem}>
                  <span className={styles.curriculumIcon}>⚙️</span>
                  <span>Software Engineering</span>
                </div>
                <div className={styles.curriculumItem}>
                  <span className={styles.curriculumIcon}>🖥️</span>
                  <span>Computer Networks</span>
                </div>
                <div className={styles.curriculumItem}>
                  <span className={styles.curriculumIcon}>🔧</span>
                  <span>Operating Systems</span>
                </div>
                <div className={styles.curriculumItem}>
                  <span className={styles.curriculumIcon}>🧠</span>
                  <span>Artificial Intelligence</span>
                </div>
              </div>

              <h3 className={styles.sectionHeading}>Course Structure</h3>
              <div className={styles.courseStructure}>
                <div className={styles.yearSection}>
                  <h4>Year 1</h4>
                  <ul>
                    <li>Introduction to Computer Science</li>
                    <li>Programming Fundamentals</li>
                    <li>Discrete Mathematics</li>
                    <li>Computer Organization</li>
                  </ul>
                </div>
                <div className={styles.yearSection}>
                  <h4>Year 2</h4>
                  <ul>
                    <li>Data Structures and Algorithms</li>
                    <li>Object-Oriented Programming</li>
                    <li>Database Systems</li>
                    <li>Web Development</li>
                  </ul>
                </div>
                <div className={styles.yearSection}>
                  <h4>Year 3</h4>
                  <ul>
                    <li>Software Engineering</li>
                    <li>Operating Systems</li>
                    <li>Computer Networks</li>
                    <li>Artificial Intelligence</li>
                  </ul>
                </div>
                <div className={styles.yearSection}>
                  <h4>Year 4</h4>
                  <ul>
                    <li>Capstone Project</li>
                    <li>Advanced Topics in CS</li>
                    <li>Internship</li>
                    <li>Electives</li>
                  </ul>
                </div>
              </div>
            </>
          )}

          {activeTab === "admission" && (
            <>
              <h3 className={styles.sectionHeading}>Admission Requirements</h3>
              <ul className={styles.requirementsList}>
                <li>High School Diploma or equivalent</li>
                <li>Minimum GPA of 3.0</li>
                <li>Proficiency in Mathematics</li>
                <li>Basic computer skills</li>
              </ul>

              <h3 className={styles.sectionHeading}>Application Process</h3>
              <div className={styles.applicationProcess}>
                <div className={styles.processStep}>
                  <div className={styles.processNumber}>1</div>
                  <div className={styles.processContent}>
                    <h4>Submit Application</h4>
                    <p>
                      Complete the online application form with your personal
                      details.
                    </p>
                  </div>
                </div>
                <div className={styles.processStep}>
                  <div className={styles.processNumber}>2</div>
                  <div className={styles.processContent}>
                    <h4>Upload Documents</h4>
                    <p>
                      Submit your transcripts, recommendation letters, and other
                      required documents.
                    </p>
                  </div>
                </div>
                <div className={styles.processStep}>
                  <div className={styles.processNumber}>3</div>
                  <div className={styles.processContent}>
                    <h4>Entrance Exam</h4>
                    <p>
                      Take the admission exam to assess your aptitude and
                      knowledge.
                    </p>
                  </div>
                </div>
                <div className={styles.processStep}>
                  <div className={styles.processNumber}>4</div>
                  <div className={styles.processContent}>
                    <h4>Interview</h4>
                    <p>Participate in an interview with faculty members.</p>
                  </div>
                </div>
                <div className={styles.processStep}>
                  <div className={styles.processNumber}>5</div>
                  <div className={styles.processContent}>
                    <h4>Decision</h4>
                    <p>
                      Receive admission decision within 2-3 weeks after
                      completing all steps.
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === "financial" && (
            <>
              <h3 className={styles.sectionHeading}>Financial Information</h3>
              <div className={styles.financialInfo}>
                <div className={styles.financialItem}>
                  <span className={styles.financialLabel}>Tuition Fee:</span>
                  <span className={styles.financialValue}>
                    $12,500 per year
                  </span>
                </div>
                <div className={styles.financialItem}>
                  <span className={styles.financialLabel}>
                    Application Fee:
                  </span>
                  <span className={styles.financialValue}>
                    $75 (non-refundable)
                  </span>
                </div>
                <div className={styles.financialItem}>
                  <span className={styles.financialLabel}>
                    Books & Supplies:
                  </span>
                  <span className={styles.financialValue}>
                    $1,200 per year (estimated)
                  </span>
                </div>
                <div className={styles.financialItem}>
                  <span className={styles.financialLabel}>Housing:</span>
                  <span className={styles.financialValue}>
                    $8,000 - $12,000 per year
                  </span>
                </div>
              </div>

              <h3 className={styles.sectionHeading}>
                Scholarships & Financial Aid
              </h3>
              <div className={styles.scholarshipInfo}>
                <div className={styles.scholarshipItem}>
                  <h4>Merit Scholarships</h4>
                  <p>
                    Available for students with outstanding academic
                    achievements. Covers up to 50% of tuition.
                  </p>
                </div>
                <div className={styles.scholarshipItem}>
                  <h4>Need-Based Aid</h4>
                  <p>
                    Financial assistance based on demonstrated financial need.
                  </p>
                </div>
                <div className={styles.scholarshipItem}>
                  <h4>Work-Study Programs</h4>
                  <p>
                    Opportunities to work on campus to help cover educational
                    expenses.
                  </p>
                </div>
              </div>
            </>
          )}

          <div className={styles.modalActions}>
            <button className={styles.closeModalBtn} onClick={onClose}>
              Close
            </button>
            <button className={styles.applyNowBtn}>Apply Now</button>
          </div>
        </div>
      </div>
    </div>
  );
}
