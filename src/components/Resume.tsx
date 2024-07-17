import React from "react";


const styles={
  nameFontSize:"31.2px",
  sectionTitleFontSize:"18.2px",
  itemTitleFontSize:"15.6px",
  itemSubTitleFontSize:"14.3px",
  normalTextFontSize:"14.3px",
  sectionMarginBottom:"5.2px",
}

const Resume = ({ data }) => {
  return (
    <div
      style={{ width: "21cm", height: "29.7cm",fontFamily:"IBM Plex Serif" }}
      className={"p-[19.5px] bg-white text-black outline"}
    >
      <header className="flex flex-col items-center mb-[13px]">
        <h1 style={{fontSize:styles.nameFontSize}} className="font-bold tracking-tighter">{data.basics.name}</h1>
        <div className="flex justify-center text-[15.6px]">
          <div className="flex items-center space-x-1">
            <span style={{fontSize:styles.normalTextFontSize,marginLeft:"5.2px"}} className="leading-tight">{data.basics.location}</span>
          </div>
          <div className="flex items-center space-x-1">
            <span style={{fontSize:styles.normalTextFontSize,marginLeft:"5.2px"}} className="leading-tight">{data.basics.email}</span>
          </div>
          <div className="flex items-center space-x-1">
            <span style={{fontSize:styles.normalTextFontSize,marginLeft:"5.2px"}} className="leading-tight">{data.basics.phone}</span>
          </div>
          <div className="flex items-center space-x-1">
            <a style={{fontSize:styles.normalTextFontSize,marginLeft:"5.2px"}}  href={data.basics.linkedin} className="leading-tight">
              LinkedIn
            </a>
          </div>
          <div className="flex items-center space-x-1">
            <a style={{fontSize:styles.normalTextFontSize,marginLeft:"5.2px"}}  href={data.basics.github} className="leading-tight">
              GitHub
            </a>
          </div>
        </div>
      </header>

      <section style={{marginBottom:styles.sectionMarginBottom}}>
        <h2 style={{fontSize:styles.sectionTitleFontSize}} className="text-lg font-medium border-b-[2px] border-black pb-[5.2px]">
          Education
        </h2>
        {data.education.map((edu, index) => (
          <div key={index} className="mb-2">
            <div className="flex justify-between items-end">
              <span style={{fontSize:styles.itemTitleFontSize}} className="leading-tight font-bold">{edu.college}</span>
              <span style={{fontSize:styles.normalTextFontSize}} className="text-right">
                {edu.startDate} - {edu.endDate}
              </span>
            </div>
            <div className="flex justify-between items-end">
              <span style={{fontSize:styles.itemSubTitleFontSize}} className="font-extralight leading-tight  italic">{edu.degree}</span>
              <span style={{fontSize:styles.itemSubTitleFontSize}} className="font-extralight leading-tight text-right italic">{edu.location}</span>
            </div>
          </div>
        ))}
      </section>

      <section style={{marginBottom:styles.sectionMarginBottom}}>
      <h2 style={{fontSize:styles.sectionTitleFontSize}} className="text-lg font-medium border-b-2 border-black pb-1">
          Experience
        </h2>
        {data.experience.map((exp, index) => (
          <div key={index} className="mb-2">
            <div className="flex justify-between items-end">
            <span style={{fontSize:styles.itemTitleFontSize}} className="leading-tight font-bold">{exp.role}</span>
            <span style={{fontSize:styles.normalTextFontSize}} className="leading-tight text-right">
                {exp.startDate} - {exp.endDate}
              </span>
            </div>
            <div className="flex justify-between items-end">
              <span style={{fontSize:styles.itemSubTitleFontSize}} className="leading-tight font-extralight  italic">{exp.company}</span>
              <span style={{fontSize:styles.itemSubTitleFontSize}} className="leading-tight font-extralight  text-right italic">{exp.location}</span>
            </div>
            <ul style={{fontSize:styles.normalTextFontSize}} className="list-disc list-inside mt-2 pl-4">
              {exp.details.map((detail, i) => (
                <li key={i} className="leading-tight" style={{fontSize:styles.normalTextFontSize}}>
                  {detail}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section style={{marginBottom:styles.sectionMarginBottom}}>
      <h2 style={{fontSize:styles.sectionTitleFontSize}} className="text-lg font-medium border-b-2 border-black pb-1">
          Projects
        </h2>
        {data.projects.map((project, index) => (
          <div key={index} className="mb-2">
            <div className="flex justify-between items-end">
              <div className="flex">
              <span style={{fontSize:styles.itemTitleFontSize}} className="leading-tight font-bold">{project.title} |</span>
                <span style={{fontSize:styles.itemSubTitleFontSize}}  className="leading-tight font-extralight italic ml-1">
                  {project.technologies.join(", ")}
                </span>
              </div>
              <span style={{fontSize:styles.normalTextFontSize}} className="leading-tight text-right">
                {project.startDate} - {project.endDate}
              </span>
            </div>
            <ul style={{fontSize:styles.normalTextFontSize}} className="list-disc list-inside mt-[2.5px] pl-4">
              {project.details.map((detail, i) => (
                <li key={i} className="text-sm">
                  {detail}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section>
      <h2 style={{fontSize:styles.sectionTitleFontSize}} className="font-medium border-b-2 border-black pb-1">
          Technical Skills
        </h2>
        {Object.entries(data.skills).map(([category, skills], index) => (
          <div key={index}>
            <div className="flex items-center flex-wrap">
              <span style={{fontSize:styles.normalTextFontSize}} className="text-lg font-bold">{category}:</span>
              {skills.map((skill, skillIndex) => (
                <span key={skillIndex} style={{fontSize:styles.normalTextFontSize}} className="ml-1">
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
