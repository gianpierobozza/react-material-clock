import * as React from "react"
import { useEffect, useState } from "react"
import { Box } from "@mui/material"
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
    <Box component="div" className="digital-clock">
      <Box component="div"className="hour section">
        <Box component="span">{hoursState}</Box>
        <Box component="div" className="back">88:</Box>
      </Box>
      <Box component="div"className="minute section">
        <Box component="span">{minutesState}</Box>
        <Box component="div" className="back">88:</Box>
      </Box>
      <Box component="div"className="second section">
        <Box component="span">{secondsState}</Box>
        <Box component="div" className="back">88</Box>
      </Box>
    </Box>
  )
}

export default DigitalFace
