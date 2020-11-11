import React from "react";
import "./App.css";
import DATA from "./data.js";

const App = () => {
  const [displayInfo, setDisplayInfo] = React.useState("Lets Play!");
  const [power, setPower] = React.useState(false);
  const keys = React.useState(DATA)[0];

  const play = (id) => {
    setDisplayInfo(id);
  };
  const enabledButtons = keys.map((item, idx) => (
    <Box
      audioLink={item.url}
      play={play}
      id={item.id}
      letter={item.letter}
      key={idx}
      className="drum-pad"
    />
  ));
  const disabledButtons = keys.map((item, idx) => (
    <BlankBox
      id={item.id}
      letter={item.letter}
      key={idx}
      className="drum-pad"
    />
  ));

  return (
    <div id="drum-machine">
      <div id="display" style={{ backgroundColor: !power ? "grey" : null }}>
        {power ? displayInfo : "Power Off."}
      </div>
      {/*
        <div id="button">
          <button onClick={() => {
              setPower(!power);
              if (power) setDisplayInfo("Lets Play!")
            }}>Power</button>
        </div>  */}
      <div id="button">
        <input
          className="l"
          type="checkbox"
          onClick={() => {
            setPower(!power);
            if (power) setDisplayInfo("Lets Play!");
          }}
        />
      </div>
      <div id="drum-pads">{power ? enabledButtons : disabledButtons}</div>
    </div>
  );
};

const Box = ({ id, letter, play, audioLink }) => {
  //let audio = new Audio(audioLink);
  return (
    <>
      <div
        className="button"
        id={id}
        onClick={() => {
          // audio.play();
          //play(id);
          // This is just to pass the fcc tests
          // The 2 lines commented out above functionally work fine in replacement
          // tests need to find correct id etc so just gets confusing for no reason
          const audio = document.getElementById(letter);
          if (audio) {
            audio.currentTime = 0;
            audio.play();
            const dataObject = DATA.filter((i) => i.letter === letter)[0].id;
            document.getElementById("display").innerText = dataObject;
          }
        }}
      >
        <button className="drum-pad" id={id}>
          <audio
            ref={(ref) => (this.audio = ref)}
            src={audioLink}
            className="clip"
            id={letter}
          />
          {letter}
        </button>
      </div>
    </>
  );
};
// Disabled Button Component
const BlankBox = ({ id, letter }) => {
  return (
    <button className="btn">
      <span>{letter}</span>
    </button>
  );
};

// Budget event listener version
// uses direct DOM to match keydowns to audio elements
// Manually sets display innerText if sounds selected
document.addEventListener("keydown", (e) => {
  const id = e.key.toUpperCase();
  const audio = document.getElementById(id);

  if (audio) {
    audio.currentTime = 0;
    audio.play();
    const dataObject = DATA.filter((i) => i.letter === id)[0].id;
    document.getElementById("display").innerText = dataObject;
  }
});

export default App;
