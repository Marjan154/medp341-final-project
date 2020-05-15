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
      wordsAndStyles: [],
      productivityCount: 0,
      unproductiveCount: 0,
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
    const colors = ["red", "black", "black", "black", "#fcba03", "#4a0417"];
    const fontWeights = [100, 400, 700];
    const rotation = Math.floor(Math.random() * 201 - 100);
    return {
      display: "inline-block",
      transform: `rotate(${rotateBy + rotation}deg)`,
      margin: `${marginBy + margin}px`,
      fontWeight: fontWeights[Math.floor(Math.random() * fontWeights.length)],
      color: colors[Math.floor(Math.random() * colors.length)],
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
    const {
      questionNumber,
      productivityLevel,
      anxietyLevel,
      productivityCount,
      unproductiveCount,
    } = this.state;
    if (type === "bad") {
      this.setState({
        unproductiveCount: unproductiveCount + 1,
        productivityLevel: productivityLevel <= 10 ? 0 : productivityLevel - 10,
        anxietyLevel: anxietyLevel >= 100 ? 100 : anxietyLevel + 10,
      });
      this.breakParagraph(true);
    } else {
      this.setState({
        productivityCount: productivityCount + 1,
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

  replay = () => {
    this.setState({
      minutes: 30,
      seconds: 30,
      done: false,
      productivityLevel: 100,
      anxietyLevel: 0,
    });
  };
  // Sets up questions display. Handles answer and adjusts time
  displayQuestion = (question) => {
    const { situation, optionBad, optionGood } = question;
    return (
      <div>
        <h2>{situation}</h2>
        <br />
        <Button
          variant="secondary"
          size="lg"
          onClick={() => {
            this.handleAnswer("bad");
            this.displayTimeMessage("-10", "red");
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
            this.displayTimeMessage("+20", "green");
            this.addTime(20);
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
  };

  render() {
    const {
      questionNumber,
      productivityLevel,
      anxietyLevel,
      productivityCount,
      unproductiveCount,
    } = this.state;
    const plevel =
      productivityCount + unproductiveCount === 0
        ? 100
        : Math.round(
            (productivityCount / (productivityCount + unproductiveCount)) * 100
          );
    const ulevel =
      productivityCount + unproductiveCount === 0
        ? 0
        : Math.round(
            (unproductiveCount / (productivityCount + unproductiveCount)) * 100
          );
    console.log("productivity", productivityCount, " level", plevel);
    console.log("unproductivity", unproductiveCount, " level", ulevel);
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
            }}
          >
            <Timer
              addTime={(add) => (this.addTime = add)}
              loseTime={(lost) => (this.loseTime = lost)}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
