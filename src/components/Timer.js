import React, { Component } from "react";
import "../App.css";

export default class Timer extends Component {
  state = {
    minutes: this.props.minutes || 2,
    seconds: this.props.seconds || 5,
  };

  componentDidMount() {
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

  render() {
    const { minutes, seconds } = this.state;
    const fontSize = minutes > 0 ? 120 / minutes : 160 - seconds;

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
