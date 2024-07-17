import React from "react";
import { Document, Page, Text, View, StyleSheet, Font, Link, Image } from "@react-pdf/renderer";

Font.register({
  family: "IBMPBold",
  src: "/IBMPlexSerif-Bold.ttf",
  fontStyle: "normal",
  fontWeight: 800,
});
Font.register({
  family: "IBMPReg",
  src: "/IBMPlexSerif-Regular.ttf",
});
Font.register({
  family: "IBMPELItalic",
  src: "/IBMPlexSerif-ExtraLightItalic.ttf",
  fontWeight: 200,
});
Font.register({
  family: "IBMPLight",
  src: "/IBMPlexSerif-Light.ttf",
  fontWeight: 200,
});

const styles = StyleSheet.create({
  page: {
    padding: 15,
    fontSize: 11,
    color: "#000",
    fontFamily: "IBMPReg",
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
    fontFamily: "IBMPBold",
    fontWeight: "bold",
    marginBottom:4,
  },
  contactInfo: {
    flexDirection: "row",
    justifyContent: "center",
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  contactText: {
    marginLeft: 4,
  },
  section: {
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: "IBMPReg",
    borderBottomWidth: 1.5,
    borderBottomColor: "#000000",
    marginBottom: 2,
    paddingBottom: 4,
  },
  subsection: {
    marginBottom: 4,
  },
  itemTitle: {
    fontSize: 12,
    fontFamily: "IBMPBold",
    fontWeight: "bold",
  },
  itemSubtitle: {
    fontSize: 11,
    fontFamily: "IBMPELItalic",
    fontWeight: "extralight",
  },
  itemDetails: {
    marginTop: 4,
    paddingLeft: 12,
  },
  bulletPoint: {
    fontSize: 11,
  },
  dateLocation: {
    flexDirection: "row",
    justifyContent: "space-between",
    fontFamily: "IBMPReg",
    alignItems: "flex-end",
  },
  rightAlign: {
    textAlign: "right",
  },
  skillsContainer: {
    flexDirection: "column",
    flexWrap: "wrap",
  },
  skillCategory: {
    flexDirection: "column",
    marginBottom: 4,
  },
  skillCategoryTitle: {
    fontSize: 11,
    fontWeight: "bold",
    fontFamily: "IBMPBold",
  },
  skillItem: {
    fontSize: 11,
    fontWeight:"normal",
    fontFamily:"IBMPReg"
  },
  icon: {
    width: 12,
    height: 12,
  },
});

const MyDocument = ({ data,setLoading }) => (

  <Document onRender={()=>{setLoading(false);console.log("Loading")}}>
    <Page size="A4" style={styles.page}>
      <View style={styles.header} >
        <Text style={styles.name}> {data.basics.name}</Text>
        <View style={styles.contactInfo} > 
          <View style={styles.contactItem}>
            <Text style={styles.contactText}>{data.basics.location}</Text>
          </View>
          <View style={styles.contactItem}>
            <Text style={styles.contactText}>{data.basics.email}</Text>
          </View>
          <View style={styles.contactItem}>
            <Text style={styles.contactText}>{data.basics.phone}</Text>
          </View>
          <View style={styles.contactItem}>
            <Link style={styles.contactText} src={data.basics.linkedin}>
              LinkedIn
            </Link>
          </View>
          <View style={styles.contactItem}>
            <Image style={styles.icon} src="/assets/icons/github.png" />
            <Link style={styles.contactText} src={data.basics.github}>
              GitHub
            </Link>
          </View>
        </View>
      </View>
      <View style={styles.section} >
        <Text style={styles.sectionTitle} >Education</Text>
        {data.education.map((edu, index) => (
          <View key={index} style={styles.subsection} >
            <View style={styles.dateLocation} >
              <Text style={styles.itemTitle}>{edu.college}</Text>
              <Text style={[styles.dateLocation, styles.rightAlign]}>
                {edu.startDate} - {edu.endDate}
              </Text>
            </View>
            <View style={styles.dateLocation} >
              <Text style={styles.itemSubtitle}>{edu.degree}</Text>
              <Text style={[styles.itemSubtitle, styles.rightAlign]}>
                {edu.location}
              </Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Experience</Text>
        {data.experience.map((exp, index) => (
          <View key={index} style={styles.subsection} >
            <View style={styles.dateLocation} >
              <Text style={styles.itemTitle}>{exp.role}</Text>
              <Text style={[styles.dateLocation, styles.rightAlign]}>
                {exp.startDate} - {exp.endDate}
              </Text>
            </View>
            <View style={styles.dateLocation} >
              <Text style={styles.itemSubtitle}>{exp.company}</Text>
              <Text style={[styles.itemSubtitle, styles.rightAlign]}>
                {exp.location}
              </Text>
            </View>
            <View style={styles.itemDetails} >
              {exp.details.map((detail, i) => (
                <Text key={i} style={styles.bulletPoint}>
                  • {detail}
                </Text>
              ))}
            </View>
          </View>
        ))}
      </View>

      <View style={styles.section} >
        <Text style={styles.sectionTitle} >Projects</Text>
        {data.projects.map((project, index) => (
          <View key={index} style={styles.subsection} >
            <View style={styles.dateLocation}>
              <View style={{ display: "flex", flexDirection: "row" }}>
                <Text style={styles.itemTitle}>{project.title} | </Text>
                <Text style={styles.itemSubtitle}>{project.technologies.join(", ")}</Text>
              </View>
              <Text style={[styles.dateLocation, styles.rightAlign]}>
                {project.startDate} - {project.endDate}
              </Text>
            </View>
            <View style={styles.itemDetails}>
              {project.details.map((detail, i) => (
                <Text key={i} style={styles.bulletPoint}>
                  • {detail}
                </Text>
              ))}
            </View>
          </View>
        ))}
      </View>

      <View style={styles.section} debug>
        <Text style={styles.sectionTitle} >Technical Skills</Text>
        <View style={styles.skillsContainer} >
          {Object.entries(data.skills).map(([category, skills], index) => (
            <View key={index} style={styles.skillCategory} debug>
            <View style={{flexDirection:"row",height:"auto",flexWrap:"wrap"}} debug>
              <Text style={styles.skillCategoryTitle}>{category}: </Text>
              {skills.map((skill)=>(
                  <Text style={styles.skillItem}>{skill}, </Text>
                ))}
                </View>
              {/* <Text style={styles.skillItem}>{skills.join(", ")}</Text> */}
            </View>
          ))}
        </View>
      </View>
    </Page>
  </Document>
);

export default MyDocument;
