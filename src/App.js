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
    const introWords = introText.split(" ").map((word) => word);
    this.setState({ introWords });
  };
  breakParagraph = () => {
    const { rotateBy, marginBy } = this.state;
    const introWordStyle = {
      display: "inline-block",
      transform: `rotate(${rotateBy + 2}deg)`,
      margin: `${marginBy + 0.2}px`,
    };
    this.setState({
      introWordStyle,
      rotateBy: rotateBy + 2,
      marginBy: marginBy + 0.2,
    });
  };

  handleAnswer = (type) => {
    //handle progress bar or other animations
    const { questionNumber, productivityLevel, anxietyLevel } = this.state;
    if (type === "bad") {
      this.setState({
        productivityLevel: productivityLevel <= 10 ? 0 : productivityLevel - 10,
        anxietyLevel: anxietyLevel >= 100 ? 100 : anxietyLevel + 10,
      });
    } else {
      this.setState({
        anxietyLevel: anxietyLevel <= 10 ? 0 : anxietyLevel - 10,
        productivityLevel:
          productivityLevel >= 100 ? 100 : productivityLevel + 10,
      });
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
    const paragraph = this.state.introWords.map((word, i) => (
      <span id={`word-${i}`} style={this.state.introWordStyle}>
        {word + " "}
      </span>
    ));
    return (
      <div className="App">
        <div style={this.styles.mybody}>
          <h1>Performance Simulation</h1>
          <br />
          <div style={{ display: "block" }}>{paragraph}</div>

          <br />
          <br />
          <button onClick={this.breakParagraph}>Break text</button>
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
