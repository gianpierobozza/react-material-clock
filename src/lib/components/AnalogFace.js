import * as React from "react"
import { useEffect } from "react"
import * as ReactDom from "react-dom"
import { useTheme } from "@mui/material/styles"
import { Box } from "@mui/material"
import "./styles/analog-clock.css"

const AnalogFace = () => {
  const theme = useTheme()

  useEffect(() => {
    const innerAnalogClock = document.getElementById("innerAnalogClock")
    const secondsHand = ReactDom.findDOMNode(innerAnalogClock).getElementsByClassName("seconds-hand")[0]
    const minutesHand = ReactDom.findDOMNode(innerAnalogClock).getElementsByClassName("minutes-hand")[0]
    const hoursHand = ReactDom.findDOMNode(innerAnalogClock).getElementsByClassName("hours-hand")[0]

    const setDate = () => {
      const updatedDate = new Date()

      const seconds = updatedDate.getSeconds()
      const secondsDeg = ((seconds / 60) * 360) + 90
      secondsHand.style.transform = `rotate(${secondsDeg}deg)`

      const minutes = updatedDate.getMinutes()
      const minutesDeg = ((minutes / 60) * 360) + ((seconds / 60) * 6) + 90
      minutesHand.style.transform = `rotate(${minutesDeg}deg)`

      const hours = updatedDate.getHours()
      const hoursDeg = ((hours / 12) * 360) + ((minutes / 60) * 30) + 90
      hoursHand.style.transform = `rotate(${hoursDeg}deg)`
    }

    setDate()
    setInterval(setDate, 1000)
  }, [])

  return (
    <Box component="div" className="analog-clock">
      <Box component="div" className="outer-clock-face">
        <Box component="div" className="marking marking-one"></Box>
        <Box component="div" className="marking marking-two"></Box>
        <Box component="div" className="marking marking-three"></Box>
        <Box component="div" className="marking marking-four"></Box>
        <Box component="div" id="innerAnalogClock" className="inner-clock-face"
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
  )
}

export default AnalogFace
