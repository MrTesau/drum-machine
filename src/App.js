import DATA from "./data.js";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: "Click to play!",
      enabled: true,
    };
  }

  play = (event) => {
    this.setState({
      current: event.target.id,
    });
  };

  handleClick = () => {
    this.setState({
      enabled: !this.state.enabled,
    });
  };

  render() {
    // change render conditional to tertiary operator
    const enabledButtons = DATA.map((item, idx) => (
      <Box {...item} key={idx} play={this.play} className="drum-pad" />
    ));

    const disabledButtons = DATA.map((item, idx) => (
      <BlankBox
        id={item.id}
        letter={item.letter}
        key={idx}
        className="drum-pad"
      />
    ));

    return (
      <div id="drum-machine">
        <div id="display">{this.state.current}</div>

        <div id="button">
          <button onClick={this.handleClick}>Power</button>
        </div>

        <div id="drum-pads">
          {this.state.enabled ? enabledButtons : disabledButtons}
        </div>
      </div>
    );
  }
}

// How audio works:

// audio (url link) is an object on the DOM. Create a ref in react to use its methods eg audio.play
// React.creatRef works slightly different and plays the audio a bit worse so I created
// the ref inside the jsx audio section

// window.focus() in component did mount

class Box extends React.Component {
  constructor(props) {
    super(props);
    // this.audio = React.createRef(); (this is created in section JSX instead)
  }

  componentDidMount() {
    document.addEventListener("keydown", function (e) {
      if (e.keyCode === this.props.keycode) {
        playSound();
      }
    });
    // window.focus(); //focus on window to allow keydown events immediately (annoying if app is below as it will keep focus on app)
  }

  // required cleanup
  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeydown);
  }

  playSound = (id) => {
    this.audio.play();
    this.audio.currentTime = 0;
    this.props.play(id);
  };

  render() {
    const letter = this.props.letter;
    const audio = this.props.url;
    const id = this.props.id;

    return (
      <div onClick={this.playSound} id={id} className="drum-pad">
        {letter}

        <audio
          ref={(ref) => (this.audio = ref)}
          src={audio}
          className="clip"
          id={letter}
        />
      </div>
    );
  }
}

// Blank Component for power off
const BlankBox = (props) => {
  return (
    <div className="drum-pad" id={props.id}>
      {props.letter}
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
    document.getElementById("info-box").innerText = dataObject;
  }
});

export default App;
