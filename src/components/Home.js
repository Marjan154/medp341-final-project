import React, { Component } from "react";
import "../App.css";
import questions from "../situations.json";
import { Button, ProgressBar } from "react-bootstrap";
import introText from "../intro.js";
import Timer from "./Timer";

//Dont forget API call
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionNumber: 0,
      wordsAndStyles: [],
      productivityCount: 0,
      unproductiveCount: 0,
      timesUp: false,
      minutes: 3,
      seconds: 30,
    };
    // 4:5 ratio
    this.goodWords = [
      "good",
      "healthy",
      "well",
      "satisfactory",
      "progress",
      "managable",
      "balanced",
      "organized",
      "together",
      "responsible",
      "productive",
      "successful",
    ];
    this.antonyms = {
      good: "bad",
      healthy: "unhealthy",
      well: "not well",
      satisfactory: "disatisfactory",
      progress: "procrastination",
      managable: "unmanagable",
      balanced: "unbalanced",
      organized: "disorganized",
      together: "broken",
      responsible: "irresponsible",
      productive: "unproductive",
      successful: "unsuccessful",
    };
    this.styles = {
      progressBars: {
        width: "75%",
        textAlign: "left",
        margin: "50px auto",
        float: "right",
        marginLeft: "5vw",
      },
      mybody: {
        margin: "1% 7%",
        textAlign: "center",
      },
    };
  }

  // Convert intro paragraph text to individually styled spans
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

  // Returns random style for rotation, fontweight, margin and colors
  generateRandomStyle = (wordsObject) => {
    const { rotateBy, marginBy } = wordsObject;
    const margin = Math.floor(Math.random() + 10 - 5);
    const colors = [
      "red",
      "black",
      "black",
      "#4a0417",
      "black",
      "#fcba03",
      "#4a0417",
      "red",
    ];
    const fontWeights = [100, 400, 700];
    const rotation = Math.floor(Math.random() * 201 - 100);
    return {
      display: "inline-block",
      transform: `rotate(${rotateBy + rotation}deg)`,
      margin: `${marginBy + margin}px`,
      fontWeight: fontWeights[Math.floor(Math.random() * fontWeights.length)],
      color: colors[Math.floor(Math.random() * colors.length)],
      fontFamily: "Special Elite",
    };
  };

  /**
   * @param {boolean} breakP true to break paragraph, false to fix paragraph
   * This function randomly selects words in pargraph and styles
   * good words and randomly styles bad ones. Converts word words to bad
   * if breaking paragraph, and bad words back to big if fixing paragraph
   */
  breakParagraph = (breakP) => {
    const { wordsAndStyles } = this.state;
    const arr = wordsAndStyles;
    const times = breakP ? 5 : 15; // change more good words than bad
    for (let i = 0; i < times; i++) {
      // pick random word to style
      const selected = Math.floor(Math.random() * wordsAndStyles.length);
      const replaceIndex = wordsAndStyles[selected].index;
      let newStyles = {
        display: "inline-block",
        margin: "3px",
      };
      // If breaking paragraph, give random style to word and
      // replace word if it is a good word. otherwise reset styles and fix word.
      if (breakP) {
        newStyles = this.generateRandomStyle(wordsAndStyles[selected]);
        if (this.goodWords.includes(arr[replaceIndex].word)) {
          arr[replaceIndex].display = this.antonyms[arr[replaceIndex].word];
        }
      } else {
        if (arr[replaceIndex].word !== arr[replaceIndex].display) {
          arr[replaceIndex].display = arr[replaceIndex].word;
        }
        if (this.goodWords.includes(arr[replaceIndex].display)) {
          newStyles = {
            display: "inline-block",
            margin: "3px",
            color: "green",
          };
        }
      }
      arr[replaceIndex].style = newStyles;
    }
    this.setState({ wordsAndStyles: arr });
  };

  // Take words and style objects and displays them as a paragraph
  generateParagraph = () => {
    const { wordsAndStyles } = this.state;

    const paragraph = wordsAndStyles.map((word, i) => (
      <span id={`word-${i}`} style={word.style}>
        {word.display + " "}
      </span>
    ));
    return paragraph;
  };

  // Handles answer selection. Updates progress bars and
  // breaks or fixes paragraph based on choice
  handleAnswer = (type) => {
    const { questionNumber, productivityCount, unproductiveCount } = this.state;
    if (type === "bad") {
      this.setState({
        unproductiveCount: unproductiveCount + 1,
      });
      this.breakParagraph(true);
    } else {
      this.setState({
        productivityCount: productivityCount + 1,
      });
      this.breakParagraph(false);
    }
    this.setState({
      questionNumber:
        questionNumber >= questions.length - 1 ? 0 : questionNumber + 1,
    });
  };

  // Create and show animated time message, and then remove the element
  displayTimeMessage = (message, color) => {
    let timeMessage = document.createElement("div");
    timeMessage.textContent = message;
    timeMessage.className = "timeMessage";
    timeMessage.style.color = color;
    document.body.appendChild(timeMessage);
    let myInterval = setTimeout(() => {
      let elements = document.getElementsByClassName("timeMessage");
      elements[0].parentNode.removeChild(elements[0]);
    }, 1000);
    clearInterval(myInterval);
  };

  setTimesUp = () => {
    this.setState({ timesUp: true });
    console.log("SETTING TIME", this.state.timesUp);
  };
  setMinutes = (minutes) => {
    this.setState({ minutes: minutes });
  };
  setSeconds = (seconds) => {
    this.setState({ seconds: seconds });
  };

  replay = () => {
    this.setState({
      minutes: 30,
      seconds: 30,
      done: false,
      productivityCount: 0,
      unproductiveCount: 0,
    });
    this.resetTime();
  };
  // Sets up questions display. Handles answer and adjusts time
  displayQuestion = (question) => {
    const { situation, optionBad, optionGood } = question;
    const { minutes, seconds } = this.state;
    // if times up, display play again
    if (minutes === 0 && seconds === 0) {
      return (
        <div>
          <Button
            variant="secondary"
            size="lg"
            onClick={this.replay}
            style={{
              backgroundColor: "#1aabab",
              margin: "5px",
              width: "25%",
              height: "70px",
              fontSize: "1vw",
            }}
          >
            You are out of time! Play Again
          </Button>
        </div>
      );
    } else {
      return (
        <div>
          <h2 style={{ color: "#1d365e", fontWeight: 600 }}>{situation}</h2>
          <br />
          <Button
            variant="secondary"
            size="lg"
            onClick={() => {
              this.handleAnswer("bad");
              this.displayTimeMessage("-20", "red");
              this.loseTime(10);
            }}
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
            onClick={() => {
              this.handleAnswer("good");
              this.displayTimeMessage("+5", "green");
              this.addTime(5);
            }}
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
    }
  };

  render() {
    const { questionNumber, productivityCount, unproductiveCount } = this.state;
    const plevel =
      productivityCount + unproductiveCount <= 3
        ? 100 - unproductiveCount * 20
        : Math.round(
            (productivityCount / (productivityCount + unproductiveCount)) * 100
          );
    const ulevel =
      productivityCount + unproductiveCount <= 3
        ? unproductiveCount * 20
        : Math.round(
            (unproductiveCount / (productivityCount + unproductiveCount)) * 100
          );

    const progressColor = (level) => {
      return level > 60 ? "success" : level < 40 ? "danger" : "warning";
    };
    const paragraph =
      this.state.wordsAndStyles.length && this.generateParagraph();
    return (
      <div className="App">
        <div style={this.styles.mybody}>
          <h1 className="title">Performance Simulation</h1>
          <br />
          <div className="introp" style={{ display: "block" }}>
            {paragraph}
          </div>

          <br />
          <br />
          <p style={{ color: "grey" }}>
            Select your thoughts or decision for each prompt:
          </p>

          <div>{this.displayQuestion(questions[questionNumber])}</div>
          <div style={this.styles.progressBars}>
            <label>Productivity:</label>
            <br />
            <ProgressBar
              animated
              now={plevel}
              variant={progressColor(plevel)}
              label={`${plevel}%`}
            />
            <br />
            <label>Anxiety:</label>
            <ProgressBar
              animated
              now={ulevel}
              variant={progressColor(100 - ulevel)}
              label={`${ulevel}%`}
            />
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
              font: "initial",
            }}
          >
            <Timer
              setTimesUp={this.setTimesUp}
              setMinutes={this.setMinutes}
              setSeconds={this.setSeconds}
              addTime={(add) => (this.addTime = add)}
              loseTime={(lost) => (this.loseTime = lost)}
              resetTime={(reset) => (this.resetTime = reset)}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
