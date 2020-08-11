import React, { useEffect } from 'react';
import $ from 'jquery';
import '../css/Home.css';
import { useMediaQuery } from 'react-responsive';
import {BIG_SCREEN} from '../utils';

function Home() {

  const isBigScreen = useMediaQuery({ minWidth: BIG_SCREEN });


  const handleClick = () => {
    window.open("Phuong-Tran-Resume.pdf", "_blank");
  }

  const SKILLS = [
    { id: "java", skill: "Java", proficency: "60%" },
    { id: "javascript", skill: "JavaScript", proficency: "60%" },
    { id: "reactjs", skill: "ReactJS", proficency: "80%" },
    { id: "html", skill: "HTML/CSS", proficency: "60%" },
    { id: "sql", skill: "SQL", proficency: "60%" },
  ];

  const LOGOS = [
    {id: "react", title: "React", src: `${process.env.PUBLIC_URL}/logos/react.png`},
    {id: "bootstrap", title: "Boostrap", src: `${process.env.PUBLIC_URL}/logos/bootstrap.png`},
    {id: "material-ui", title: "Material-UI", src: `${process.env.PUBLIC_URL}/logos/material-ui.png`},
    {id: "javascript", title: "Javascript", src: `${process.env.PUBLIC_URL}/logos/javascript.png`},
    {id: "html", title: "HTML", src: `${process.env.PUBLIC_URL}/logos/html.png`},
    {id: "css", title: "CSS", src: `${process.env.PUBLIC_URL}/logos/css.png`},
    {id: "sass", title: "SASS", src: `${process.env.PUBLIC_URL}/logos/sass.png`},
    {id: "npm", title: "npm", src: `${process.env.PUBLIC_URL}/logos/npm.png`},
    {id: "java", title: "Java", src: `${process.env.PUBLIC_URL}/logos/java.png`},
    {id: "spark", title: "Spark Java", src: `${process.env.PUBLIC_URL}/logos/spark-java.png`},
    {id: "mysql", title: "MySQL", src: `${process.env.PUBLIC_URL}/logos/mysql.png`},
    {id: "neo4j", title: "Neo4j", src: `${process.env.PUBLIC_URL}/logos/neo4j.png`},
    {id: "node", title: "NodeJS", src: `${process.env.PUBLIC_URL}/logos/node.png`},
    {id: "aws", title: "AWS", src: `${process.env.PUBLIC_URL}/logos/aws.png`},
    {id: "Serverless", title: "Serverless", src: `${process.env.PUBLIC_URL}/logos/serverless.png`},
    {id: "jest", title: "Jest", src: `${process.env.PUBLIC_URL}/logos/jest.png`},
    {id: "socket", title: "Socket.io", src: `${process.env.PUBLIC_URL}/logos/socket-io.png`},
    {id: "git", title: "Git", src: `${process.env.PUBLIC_URL}/logos/git.png`},
    {id: "nginx", title: "NGINX", src: `${process.env.PUBLIC_URL}/logos/nginx.png`},
    {id: "digital-ocean", title: "Digital Ocean", src: `${process.env.PUBLIC_URL}/logos/digital-ocean.png`},
    {id: "vscode", title: "VS Code", src: `${process.env.PUBLIC_URL}/logos/vscode.png`},
    {id: "postman", title: "Postman", src: `${process.env.PUBLIC_URL}/logos/postman.png`},
    {id: "intellij-idea", title: "Intellij IDEA", src: `${process.env.PUBLIC_URL}/logos/intellij-idea.png`},
  ]

  // this useEffect() called once after the page mounted
  useEffect(() => {
    SKILLS.forEach(s => {
      $("#" + s.id).animate({
        width: s.proficency
      }, { duration: 4000 });
    })
  }, [isBigScreen]);

  // "skills" is a list of objects following the format below:
  // [{skill: "React", proficency: "50%"},{skill: "Java", proficency: "60%"}]
  const makeSkillList = (skills, cols) => {
    let lst = [];
    let row = [];
    let elementPerRow = 0;
    skills.forEach((s, i) => {
      if (elementPerRow === Number(cols)) {
        lst.push(<tr key={i}>{row}</tr>);
        //reset
        row = [];
        elementPerRow = 0;
      }
      row.push(
        <td key={s.id + cols}>
          <h6>{s.skill}</h6>
          <div className="progress">
            <div id={s.id} className="progress-bar"
              role="progressbar"
              aria-valuenow={s.proficency}
              aria-valuemin="0"
              aria-valuemax="100"
              style={{ width: "0%" }}
            />
          </div>
        </td>
      );
      elementPerRow++;
    });
    if (row.length > 0) {
      lst.push(<tr key={"0"}>{row}</tr>);
    }
    return lst;
  }

  const displayLogos = (logos) => {
    return logos.map(e =>
      <img className="m-2" width="50px" height="50px" key={e.id} src={e.src} title={e.title} alt=""/>
    );
  }

  return (
    <React.Fragment>
      <div className="intro">
        <h6>Hello, my name is</h6>
        <h1 style={{ width: "290px" }}><b>Phuong D. Tran</b></h1>
        <p className="lead">I am a new grad in Computer Science at University of Washington, Seattle, Washington, USA.</p>
        <button type="button" className="btn btn-outline-dark" onClick={handleClick}>View my resume</button>
      </div>
      <div className="skills mt-5">
        <h2>Technical skills</h2>
        <table>
          <tbody>
            {isBigScreen ? makeSkillList(SKILLS, 2) : makeSkillList(SKILLS, 1)}
          </tbody>
        </table>
      </div>
      <div className="justify-content-center mt-5">
      <h2>Experienced Tools</h2>
        <div className="d-flex flex-row"></div>
        {displayLogos(LOGOS)}
      </div>
    </React.Fragment>
  );
}

export default Home;