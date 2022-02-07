import * as React from "react"
import { useEffect, useState } from "react"
import moment from "moment"
import { Box, Grid } from "@mui/material"
import "./styles/digital-clock.css"

const DigitalFace = () => {
  const now = new Date()
  const [secondsState, setSecondsState] = useState(now.getSeconds().toString().padStart(2, "0"))
  const [minutesState, setMinutesState] = useState(now.getMinutes().toString().padStart(2, "0"))
  const [hoursState, setHoursState] = useState(now.getHours().toString().padStart(2, "0"))

  useEffect(() => {
    var active = true

    const updateTime = () => {
      if (active) {
        const updatedDate = new Date()

        const seconds = updatedDate.getSeconds()
        setSecondsState(seconds.toString().padStart(2, "0"))

        const minutes = updatedDate.getMinutes()
        setMinutesState(minutes.toString().padStart(2, "0"))

        const hours = updatedDate.getHours()
        setHoursState(hours.toString().padStart(2, "0"))
      }
    }

    updateTime()
    setInterval(updateTime, 1000)
    return () => {
      active = false
    }
  }, [])

  return (
    <Box sx={{ flexGrow: 1, width: "470px" }}>
      <Grid container className="digital-clock">
        <Grid item xs>
          <Box component="div" className="time">
            <Box component="div" className="hour section">
              <Box component="span" className="digits">{hoursState}</Box>
              <Box component="div" className="backdrop">88:</Box>
            </Box>
            <Box component="div" className="minute section">
              <Box component="span" className="digits">{minutesState}</Box>
              <Box component="div" className="backdrop">88:</Box>
            </Box>
            <Box component="div" className="second section">
              <Box component="span" className="digits">{secondsState}</Box>
              <Box component="div" className="backdrop">88</Box>
            </Box>
          </Box>
        </Grid>
        <Grid item xs>
          <Box component="div" className="date">
            {
              moment().format("ddd Do MMM YYYY")
            }
          </Box>
        </Grid>
      </Grid >
    </Box >
  )
}

export default DigitalFace
