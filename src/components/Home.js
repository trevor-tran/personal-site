import React, { useEffect } from 'react';
import $ from 'jquery';
import '../css/Home.css';
import { useMediaQuery } from 'react-responsive';

function Home() {

  const isBigScreen = useMediaQuery({ minWidth: 1224 });


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

  return (
    <React.Fragment>
      <div className="intro">
        <h6>Hello, my name is</h6>
        <h1 style={{ width: "290px" }}><b>Phuong D. Tran</b></h1>
        <p className="lead">I am a new grad in Computer Science at University of Washington, Seattle, Washington.</p>
        <button type="button" className="btn btn-outline-dark" onClick={handleClick}>View my resume</button>
      </div>
      <div className="skills">
        <h2>Technical skills</h2>
        <table>
          <tbody>
            {isBigScreen ? makeSkillList(SKILLS, 2) : makeSkillList(SKILLS, 1)}
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
}

export default Home;