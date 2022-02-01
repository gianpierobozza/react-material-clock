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
    const setDate = () => {
      const updatedDate = new Date()

      const seconds = updatedDate.getSeconds()
      setSecondsState(seconds.toString().padStart(2, "0"))

      const minutes = updatedDate.getMinutes()
      setMinutesState(minutes.toString().padStart(2, "0"))

      const hours = updatedDate.getHours()
      setHoursState(hours.toString().padStart(2, "0"))
    }

    setDate()
    setInterval(setDate, 1000)
  }, [])

  return (
    <Box component="div" className="digital-clock">
      <div className="hour section">
        <ul><li>{hoursState}</li></ul>
      </div>
      <div className="minute section">
        <ul><li>{minutesState}</li></ul>
      </div>
      <div className="second section">
        <ul><li>{secondsState}</li></ul>
      </div>
    </Box>
  )
}

export default DigitalFace
