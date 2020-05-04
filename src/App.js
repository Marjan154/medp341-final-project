import React, { Component } from 'react';
import './App.css';
import questions from "./situations.json"
import { Button, ProgressBar } from "react-bootstrap"

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      questionNumber: 0,
      productivityLevel: 100,
      anxietyLevel: 0
    }
    this.styles = {
      progressBars: {
        width: "60%",
        textAlign: "left",
        alignSelf: "center",
        margin: "50px auto"
      },
      mybody: {
        margin: "3% 7%",
        textAlign: "center"
      }
    }
  }

  handleAnswer = (type) => {
    //handle progress bar or other animations
    const { questionNumber, productivityLevel, anxietyLevel } = this.state;
    if (type === "bad") {
      this.setState({
        productivityLevel: productivityLevel <= 10 ? 0 : productivityLevel - 10,
        anxietyLevel: anxietyLevel >= 100 ? 100 : anxietyLevel + 10
      })

    }
    else {
      this.setState({
        anxietyLevel: anxietyLevel <= 10 ? 0 : anxietyLevel - 10,
        productivityLevel: productivityLevel >= 100 ? 100 : productivityLevel + 10
      })

    }
    this.setState({ questionNumber: questionNumber >= questions.length - 1 ? 0 : questionNumber + 1 })
  }
  displayQuestion = (question) => {
    const { situation, optionBad, optionGood } = question
    return <div>
      <h3>{situation}</h3>
      <Button
        variant="secondary"
        size="lg"
        onClick={() => this.handleAnswer("bad")}
        style={{ backgroundColor: "#1aabab", margin: "5px", width: "25%", height: "70px", fontSize: "1vw" }}
      >
        {optionBad}
      </Button>
      <Button
        variant="secondary"
        size="lg"
        onClick={() => this.handleAnswer("good")}
        style={{ backgroundColor: "#1aabab", margin: "5px", width: "25%", height: "70px", fontSize: "1vw" }}
      >
        {optionGood}
      </Button>
    </div>
  }
  render() {
    const { questionNumber, productivityLevel, anxietyLevel } = this.state
    const progressColor = (level) => {
      return level > 65 ? "success" : level < 30 ? "danger" : "warning"
    }
    return (
      <div className="App">
        <div style={this.styles.mybody}>
          <h1>Performance Simulation</h1>
          <br />
          <p>You are practicing very healthy habits. You are making good decisions that make juggling your responsibilities  managable. You are a well put together person, You are practicing very healthy habits. You are making good decisions that make juggling your responsibilities  managable. You are a well put together person. You are practicing very healthy habits. You are making good decisions that make juggling your responsibilities  managable. You are a well put together person </p>
          <br />
          <br />
          <div>{this.displayQuestion(questions[questionNumber])}</div>
          <div style={this.styles.progressBars}>
            <label>Productivity:</label>
            <br />
            <ProgressBar animated now={productivityLevel} variant={progressColor(productivityLevel)} label={`${productivityLevel}%`} />
            <br />
            <br />
            <label>Anxiety:</label>
            <ProgressBar animated now={anxietyLevel} variant={progressColor(100 - anxietyLevel)} label={`${anxietyLevel}%`} />
            <br /><br />
            <br />
            <label>Ability to perform future tasks:</label>
            <ProgressBar animated now={100} variant="info" label={`100%`} />
          </div>
        </div>
      </div>);
  }
}

export default App;

