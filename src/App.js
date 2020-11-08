const DATA = [
  {
    letter: "Q",
    keycode: 81,
    id: "Open-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
  },
  {
    letter: "W",
    keycode: 87,
    id: "Closed-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
  },
  {
    letter: "E",
    keycode: 69,
    id: "Kick-and-Hat",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
  },
  {
    letter: "A",
    keycode: 65,
    id: "Punchy-Kick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3",
  },
  {
    letter: "S",
    keycode: 83,
    id: "Kick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
  },
  {
    letter: "D",
    keycode: 68,
    id: "Snare",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3",
  },
  {
    letter: "Z",
    keycode: 90,
    id: "Side-Stick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3",
  },
  {
    letter: "X",
    keycode: 88,
    id: "Clap",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
  },
  {
    letter: "C",
    keycode: 67,
    id: "Shaker",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3",
  },
];

const App = () => {
  const [displayInfo, setDisplayInfo] = React.useState("Lets Play!");
  const [power, setPower] = React.useState(true);
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
      <div id="display">{power ? displayInfo : "Power Off."}</div>
      <div id="button">
        <button
          onClick={() => {
            setPower(!power);
            if (power) setDisplayInfo("Lets Play!");
          }}
        >
          Power
        </button>
      </div>
      <div id="drum-pads">{power ? enabledButtons : disabledButtons}</div>
    </div>
  );
};

const Box = ({ id, letter, play, audioLink }) => {
  let audio = new Audio(audioLink);
  return (
    <div
      className="drum-pad"
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
      <audio
        ref={(ref) => (this.audio = ref)}
        src={audioLink}
        className="clip"
        id={letter}
      />
      {letter}
    </div>
  );
};

const BlankBox = ({ id, letter }) => {
  return (
    <div className="drum-pad" id={id}>
      {letter}
    </div>
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

ReactDOM.render(<App />, document.getElementById("root"));
