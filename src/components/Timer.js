import React, { Component } from "react";
import "../App.css";

export default class Timer extends Component {
  state = {
    minutes: this.props.minutes || 3,
    seconds: this.props.seconds || 30,
  };

  componentDidMount() {
    this.props.addTime(this.addTime);
    this.props.loseTime(this.loseTime);
    this.myInterval = setInterval(() => {
      const { seconds, minutes } = this.state;

      if (seconds > 0) {
        this.setState(({ seconds }) => ({
          seconds: seconds - 1,
        }));
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(this.myInterval);
        } else {
          this.setState(({ minutes }) => ({
            minutes: minutes - 1,
            seconds: 59,
          }));
        }
      }
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.myInterval);
  }

  addTime = (moreTime) => {
    let currTime = this.convertTimetoSecs(this.state);
    let newTime = this.convertSecsToTime(currTime + moreTime);
    this.setState({ seconds: newTime.seconds, minutes: newTime.minutes });
  };

  loseTime = (lost) => {
    let currTime = this.convertTimetoSecs(this.state);
    let newTime = this.convertSecsToTime(
      currTime - lost >= 0 ? currTime - lost : 0
    );
    this.setState({ seconds: newTime.seconds, minutes: newTime.minutes });
  };
  convertSecsToTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time - minutes * 60;
    return { minutes, seconds };
  };
  convertTimetoSecs = (time) => {
    const { minutes, seconds } = time;
    return minutes * 60 + seconds;
  };

  render() {
    const { minutes, seconds } = this.state;
    const fontSize =
      minutes > 0 ? (120 / minutes < 40 ? 40 : 120 / minutes) : 160 - seconds;

    const color = minutes <= 1 ? "red" : "black";
    return (
      <div>
        <div>
          {(minutes > 0 || seconds > 0) && <h1>Timer:</h1>}
          {minutes === 0 && seconds === 0 ? (
            <h1
              class="wiggle"
              style={{
                fontSize: 120,
                color: "red",
                width: "inherit",
                textAlign: "center",
              }}
            >
              Times Up!
            </h1>
          ) : (
            <h1
              class={minutes <= 1 ? "wiggleSlow" : ""}
              style={{ fontSize, color }}
            >
              {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
            </h1>
          )}
        </div>
      </div>
    );
  }
}
