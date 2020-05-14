import React, { Component } from "react";
import "./App.css";
import questions from "./situations.json";
import { Button, ProgressBar } from "react-bootstrap";
import introText from "./intro.js";
import Timer from "./components/Timer";

//Dont forget API call
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionNumber: 0,
      productivityLevel: 100,
      anxietyLevel: 0,
      intro: "",
      introWords: [],
      rotateBy: 2,
      marginBy: 1,
      introWordStyle: {
        display: "inline-block",
        margin: "2px",
      },
      wordsAndStyles: [],
      goodWords: [
        "good",
        "healthy",
        "well",
        "satisfactory",
        "progress",
        "managable",
        "balanced",
        "organized",
        "together",
      ],
      antonyms: {
        good: "bad",
        healthy: "unhealthy",
        well: "not well",
        satisfactory: "disatisfactory",
        progress: "procrastination",
        managable: "unmanagable",
        balanced: "unbalanced",
        organized: "disorganized",
        together: "broken",
      },
    };
    this.styles = {
      progressBars: {
        width: "75%",
        textAlign: "left",
        // alignSelf: "right",
        margin: "50px auto",
        // display: "inline-block",
        float: "right",
        marginLeft: "5vw",
      },
      mybody: {
        margin: "3% 7%",
        textAlign: "center",
      },
    };
  }
  // goodWords = ["good", "healthy"];
  // // badWord = ["bad", "unhealthy"];
  // antonyms = {
  //   good: "bad",
  //   healthy: "unhealthy",
  //   // bad: "good",
  //   // unhealthy: "healthy",
  // };
  componentDidMount = () => {
    const wordsAndStyles = introText.split(" ").map((word, i) => {
      const style = {
        display: "inline-block",
        margin: "3px",
      };
      return { index: i, word, display: word, style, rotateBy: 0, marginBy: 2 };
    });
    this.setState({ wordsAndStyles });
  };
  generateRandomStyle = (wordsObject) => {
    const { rotateBy, marginBy } = wordsObject;
    const margin = Math.floor(Math.random() + 10 - 5);
    const colors = ["red", "black", "black", "black", "#fcba03", "#4a0417"];
    const fontWeights = [100, 400, 700];
    const rotation = Math.floor(Math.random() * 101 - 50);
    return {
      display: "inline-block",
      transform: `rotate(${rotateBy + rotation}deg)`,
      margin: `${marginBy + margin}px`,
      fontWeight: fontWeights[Math.floor(Math.random() * fontWeights.length)],
      color: colors[Math.floor(Math.random() * colors.length)],
    };
  };
  breakParagraph = (breakP) => {
    const { wordsAndStyles } = this.state;
    const arr = wordsAndStyles;
    const times = breakP ? 5 : 15;
    for (let i = 0; i < times; i++) {
      const selected = Math.floor(Math.random() * wordsAndStyles.length);
      const replaceIndex = wordsAndStyles[selected].index;
      const newStyles = breakP
        ? this.generateRandomStyle(wordsAndStyles[selected])
        : {
            display: "inline-block",
            margin: "3px",
          };
      arr[replaceIndex].style = newStyles;
      if (!breakP) {
        if (arr[replaceIndex].word !== arr[replaceIndex].display) {
          arr[replaceIndex].display = arr[replaceIndex].word;
        }
      } else {
        if (this.state.goodWords.includes(arr[replaceIndex].word)) {
          arr[replaceIndex].display = this.state.antonyms[
            arr[replaceIndex].word
          ];
        }
      }
    }
    this.setState({ wordsAndStyles: arr });
  };

  generateParagraph = () => {
    const { wordsAndStyles } = this.state;

    const paragraph = wordsAndStyles.map((word, i) => (
      <span id={`word-${i}`} style={word.style}>
        {word.display + " "}
      </span>
    ));
    return paragraph;
  };

  handleAnswer = (type) => {
    //handle progress bar or other animations
    const { questionNumber, productivityLevel, anxietyLevel } = this.state;
    if (type === "bad") {
      this.setState({
        productivityLevel: productivityLevel <= 10 ? 0 : productivityLevel - 10,
        anxietyLevel: anxietyLevel >= 100 ? 100 : anxietyLevel + 10,
      });
      this.breakParagraph(true);
    } else {
      this.setState({
        anxietyLevel: anxietyLevel <= 10 ? 0 : anxietyLevel - 10,
        productivityLevel:
          productivityLevel >= 100 ? 100 : productivityLevel + 10,
      });
      this.breakParagraph(false);
    }
    this.setState({
      questionNumber:
        questionNumber >= questions.length - 1 ? 0 : questionNumber + 1,
    });
  };
  displayQuestion = (question) => {
    const { situation, optionBad, optionGood } = question;
    return (
      <div>
        <h3>{situation}</h3>
        <Button
          variant="secondary"
          size="lg"
          onClick={() => this.handleAnswer("bad")}
          style={{
            backgroundColor: "#1aabab",
            margin: "5px",
            width: "25%",
            height: "70px",
            fontSize: "1vw",
          }}
        >
          {optionBad}
        </Button>
        <Button
          variant="secondary"
          size="lg"
          onClick={() => this.handleAnswer("good")}
          style={{
            backgroundColor: "#1aabab",
            margin: "5px",
            width: "25%",
            height: "70px",
            fontSize: "1vw",
          }}
        >
          {optionGood}
        </Button>
      </div>
    );
  };

  render() {
    const { questionNumber, productivityLevel, anxietyLevel } = this.state;
    const progressColor = (level) => {
      return level > 65 ? "success" : level < 30 ? "danger" : "warning";
    };
    const paragraph =
      this.state.wordsAndStyles.length && this.generateParagraph();
    return (
      <div className="App">
        <div style={this.styles.mybody}>
          <h1>Performance Simulation</h1>
          <br />
          <div style={{ display: "block" }}>{paragraph}</div>

          <br />
          <br />
          <div>{this.displayQuestion(questions[questionNumber])}</div>
          <div style={this.styles.progressBars}>
            <label>Productivity:</label>
            <br />
            <ProgressBar
              animated
              now={productivityLevel}
              variant={progressColor(productivityLevel)}
              label={`${productivityLevel}%`}
            />
            <br />
            <br />
            <label>Anxiety:</label>
            <ProgressBar
              animated
              now={anxietyLevel}
              variant={progressColor(100 - anxietyLevel)}
              label={`${anxietyLevel}%`}
            />
            <br />
            <br />
            <br />
            <label>Ability to perform future tasks:</label>
            <ProgressBar animated now={100} variant="info" label={`100%`} />
          </div>
          <div
            style={{
              textAlign: "left",
              position: "absolute",
              bottom: 20,
              left: 20,
              width: "20%",
            }}
          >
            <Timer />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
