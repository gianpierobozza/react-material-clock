import * as React from "react"
import { useEffect } from "react";
import * as ReactDom from "react-dom"
import { useTheme } from "@mui/material/styles"
import { Box } from "@mui/material"
import "./styles/analog-clock.css"
import "./styles/digital-clock.css"

var hoursValues = []
for (var i = 0; i < 24; i++) {
  hoursValues.push(i.toString().padStart(2, '0'))
}

var minutesSecondsValues = []
for (var i = 0; i < 60; i++) {
  minutesSecondsValues.push(i.toString().padStart(2, '0'))
}

const ReactMuiClock = () => {
  const theme = useTheme()

  useEffect(() => {
    const innerClock = document.getElementById("innerClock")
    const secondsHand = ReactDom.findDOMNode(innerClock).getElementsByClassName("seconds-hand")[0]
    const minutesHand = ReactDom.findDOMNode(innerClock).getElementsByClassName("minutes-hand")[0]
    const hoursHand = ReactDom.findDOMNode(innerClock).getElementsByClassName("hours-hand")[0]
    
    const setDate = () => {
      const now = new Date()

      const seconds = now.getSeconds()
      const secondsDeg = ((seconds / 60) * 360) + 90
      secondsHand.style.transform = `rotate(${secondsDeg}deg)`

      const minutes = now.getMinutes();
      const minutesDeg = ((minutes / 60) * 360) + ((seconds / 60) * 6) + 90;
      minutesHand.style.transform = `rotate(${minutesDeg}deg)`;

      const hours = now.getHours();
      const hoursDeg = ((hours / 12) * 360) + ((minutes / 60) * 30) + 90;
      hoursHand.style.transform = `rotate(${hoursDeg}deg)`;      
    }
    
    setDate()
    setInterval(setDate, 1000)
  }, []);

  return (
    <>
      <Box component="div" className="digital-clock">
        <div className="hour section">
          <ul>
            {hoursValues.map((value, index) => {
              return (<li key={`hours-${index}`}>{value}</li>)
            })}
          </ul>
        </div>
        <div className="minute section">
          <ul>
            {minutesSecondsValues.map((value, index) => {
              return (<li key={`minutes-${index}`}>{value}</li>)
            })}
          </ul>
        </div>
        <div className="second section">
          <ul>
            {minutesSecondsValues.map((value, index) => {
              return (<li key={`seconds-${index}`}>{value}</li>)
            })}
          </ul>
        </div>
      </Box>
      <Box component="div" className="analog-clock">
        <Box component="div" className="outer-clock-face">
          <Box component="div" className="marking marking-one"></Box>
          <Box component="div" className="marking marking-two"></Box>
          <Box component="div" className="marking marking-three"></Box>
          <Box component="div" className="marking marking-four"></Box>
          <Box component="div" id="innerClock" className="inner-clock-face"
            sx={{
              background: theme.palette.background.default
            }}
          >
            <Box component="div" className="hand hours-hand"></Box>
            <Box component="div" className="hand minutes-hand"></Box>
            <Box component="div" className="hand seconds-hand"></Box>
            <Box component="div" className="day-of-month"
              sx={{
                borderColor: theme.palette.text.primary,
                borderRadius: "8px",
                borderStyle: "solid",
                borderWidth: "2px",
                color: theme.palette.error.main
              }}
            >
              {new Date().getUTCDate()}
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default ReactMuiClock
