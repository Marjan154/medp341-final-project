import React, { Component } from "react";
import "./App.css";
import questions from "./situations.json";
import { Button, ProgressBar } from "react-bootstrap";
import introText from "./intro.js";

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
    };
    this.styles = {
      progressBars: {
        width: "60%",
        textAlign: "left",
        alignSelf: "center",
        margin: "50px auto",
      },
      mybody: {
        margin: "3% 7%",
        textAlign: "center",
      },
    };
  }
  componentDidMount = () => {
    const wordsAndStyles = introText.split(" ").map((word, i) => {
      const style = {
        display: "inline-block",
        margin: "3px",
      };
      return { index: i, word, style, rotateBy: 0, marginBy: 2 };
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
      console.log(newStyles);
      console.log(arr[replaceIndex]);
      arr[replaceIndex].style = newStyles;
    }
    this.setState({ wordsAndStyles: arr });
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

  generateParagraph = () => {
    const { wordsAndStyles } = this.state;

    const paragraph = wordsAndStyles.map((word, i) => (
      <span id={`word-${i}`} style={word.style}>
        {word.word + " "}
      </span>
    ));
    return paragraph;
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
        </div>
      </div>
    );
  }
}

export default App;
