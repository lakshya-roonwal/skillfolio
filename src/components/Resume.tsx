import { ResumeData } from "@/types/Resume.type";
import React, { FC } from "react";

const styles = {
  nameFontSize: "31.2px",
  sectionTitleFontSize: "18.2px",
  itemTitleFontSize: "15.6px",
  itemSubTitleFontSize: "14.3px",
  normalTextFontSize: "14.3px",
  sectionMarginBottom: "5.2px",
  borderColor: "#4A4A4A",
  sectionTitleBorderWidth: "1px",
  itemSpacing: "8px",
};

interface ResumeProps {
  data: ResumeData;
}

const Resume: FC<ResumeProps> = ({ data }) => {
  return (
    <div
      style={{
        width: "21cm",
        height: "29.7cm",
        padding: "26px",
        backgroundColor: "#f9f9f9",
        color: "#333",
        boxShadow: "0 0 15px rgba(0, 0, 0, 0.1)",
        fontFamily: "Arial, sans-serif",
        lineHeight: "1.5",
      }}
    >
      <header className="flex flex-col items-center mb-4">
        <h1 style={{ fontSize: styles.nameFontSize }} className="font-bold tracking-tighter text-blue-600">
          {data.basics.name}
        </h1>
        <div className="flex flex-wrap justify-center text-sm mt-2">
          <div className="flex items-center mx-2">
            <span style={{ fontSize: styles.normalTextFontSize }}>{data.basics.location}</span>
          </div>
          <div className="flex items-center mx-2">
            <span style={{ fontSize: styles.normalTextFontSize }}>{data.basics.email}</span>
          </div>
          <div className="flex items-center mx-2">
            <span style={{ fontSize: styles.normalTextFontSize }}>{data.basics.phone}</span>
          </div>
          <div className="flex items-center mx-2">
            <a style={{ fontSize: styles.normalTextFontSize }} href={data.basics.linkedin} className="underline">
              LinkedIn
            </a>
          </div>
          <div className="flex items-center mx-2">
            <a style={{ fontSize: styles.normalTextFontSize }} href={data.basics.github} className="underline">
              GitHub
            </a>
          </div>
        </div>
      </header>

      <section style={{ marginBottom: styles.sectionMarginBottom }}>
        <h2
          style={{ fontSize: styles.sectionTitleFontSize, borderBottom: `${styles.sectionTitleBorderWidth} solid ${styles.borderColor}` }}
          className="pb-1 text-gray-700"
        >
          Education
        </h2>
        {data.education.map((edu, index) => (
          <div key={index} style={{ marginBottom: styles.itemSpacing }}>
            <div className="flex justify-between items-end">
              <span style={{ fontSize: styles.itemTitleFontSize }} className="font-bold">
                {edu.college}
              </span>
              <span style={{ fontSize: styles.normalTextFontSize }} className="text-right">
                {edu.startDate} - {edu.endDate}
              </span>
            </div>
            <div className="flex justify-between items-end">
              <span style={{ fontSize: styles.itemSubTitleFontSize }} className="italic text-gray-600">
                {edu.degree}
              </span>
              <span style={{ fontSize: styles.itemSubTitleFontSize }} className="italic text-right text-gray-600">
                {edu.location}
              </span>
            </div>
          </div>
        ))}
      </section>

      <section style={{ marginBottom: styles.sectionMarginBottom }}>
        <h2
          style={{ fontSize: styles.sectionTitleFontSize, borderBottom: `${styles.sectionTitleBorderWidth} solid ${styles.borderColor}` }}
          className="pb-1 text-gray-700"
        >
          Experience
        </h2>
        {data.experience.map((exp, index) => (
          <div key={index} style={{ marginBottom: styles.itemSpacing }}>
            <div className="flex justify-between items-end">
              <span style={{ fontSize: styles.itemTitleFontSize }} className="font-bold">
                {exp.role}
              </span>
              <span style={{ fontSize: styles.normalTextFontSize }} className="text-right">
                {exp.startDate} - {exp.endDate}
              </span>
            </div>
            <div className="flex justify-between items-end">
              <span style={{ fontSize: styles.itemSubTitleFontSize }} className="italic text-gray-600">
                {exp.company}
              </span>
              <span style={{ fontSize: styles.itemSubTitleFontSize }} className="italic text-right text-gray-600">
                {exp.location}
              </span>
            </div>
            <ul style={{ fontSize: styles.normalTextFontSize }} className="list-disc list-inside mt-2 pl-4">
              {exp.details.map((detail, i) => (
                <li key={i} style={{ fontSize: styles.normalTextFontSize }}>
                  {detail}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section style={{ marginBottom: styles.sectionMarginBottom }}>
        <h2
          style={{ fontSize: styles.sectionTitleFontSize, borderBottom: `${styles.sectionTitleBorderWidth} solid ${styles.borderColor}` }}
          className="pb-1 text-gray-700"
        >
          Projects
        </h2>
        {data.projects.map((project, index) => (
          <div key={index} style={{ marginBottom: styles.itemSpacing }}>
            <div className="flex justify-between items-end">
              <div className="flex">
                <span style={{ fontSize: styles.itemTitleFontSize }} className="font-bold">
                  {project.title} |
                </span>
                <span style={{ fontSize: styles.itemSubTitleFontSize }} className="italic text-gray-600 ml-1">
                  {project.technologies.join(", ")}
                </span>
              </div>
              <span style={{ fontSize: styles.normalTextFontSize }} className="text-right">
                {project.startDate} - {project.endDate}
              </span>
            </div>
            <ul style={{ fontSize: styles.normalTextFontSize }} className="list-disc list-inside mt-1 pl-4">
              {project.details.map((detail, i) => (
                <li key={i} style={{ fontSize: styles.normalTextFontSize }}>
                  {detail}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="px-1">
        <h2
          style={{ fontSize: styles.sectionTitleFontSize, borderBottom: `${styles.sectionTitleBorderWidth} solid ${styles.borderColor}` }}
          className="pb-1 text-gray-700"
        >
          Technical Skills
        </h2>
        {Object.entries(data.skills).map(([category, skills], index) => (
          <div key={index} className="mb-2">
            <div className="flex items-center flex-wrap">
              <span style={{ fontSize: styles.normalTextFontSize }} className="font-bold text-lg text-blue-600">
                {category}:
              </span>
              {skills.map((skill: string, skillIndex: number) => (
                <span key={skillIndex} style={{ fontSize: styles.normalTextFontSize }} className="ml-1">
                  {skill}
                  {skillIndex < skills.length - 1 && ","}
                </span>
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Resume;
