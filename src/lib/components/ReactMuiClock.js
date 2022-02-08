import * as React from "react"
import { useState } from "react"
import { Box, IconButton, Stack } from "@mui/material"
import AccessTimeIcon from "@mui/icons-material/AccessTime"
import NumbersIcon from "@mui/icons-material/Numbers"
import TimerIcon from "@mui/icons-material/Timer"
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty"
import AnalogFace from "./AnalogFace"
import DigitalFace from "./DigitalFace"
import Stopwatch from "./Stopwatch"
import Timer from "./Timer"

const ReactMuiClock = () => {
  const [clockFaceStyle, setClockFaceStyle] = useState("analog")
  const [functionActive, setFunctionActive] = useState("clock")

  const handleClockFaceChange = () => {
    if (functionActive === "clock") {
      clockFaceStyle === "analog" ? setClockFaceStyle("digital") : setClockFaceStyle("analog")
    } else {
      setFunctionActive("clock")
    }
  }

  return (
    <Box component="div">
      <Stack direction="row" spacing={1}>
        <IconButton color="primary"
          aria-label="clockFace"
          onClick={handleClockFaceChange}
        >
          {(clockFaceStyle === "digital" || functionActive !== "clock") && <AccessTimeIcon />}
          {(clockFaceStyle === "analog" && functionActive === "clock") && <NumbersIcon />}
        </IconButton>
        <IconButton
          color="primary"
          aria-label="stopwatch"
          onClick={() => setFunctionActive("stopwatch")}
        >
          <TimerIcon />
        </IconButton>
        <IconButton
          color="primary"
          aria-label="stopwatch"
          onClick={() => setFunctionActive("timer")}
        >
          <HourglassEmptyIcon />
        </IconButton>
      </Stack>
      <Box component="div">
        {clockFaceStyle === "analog" && functionActive === "clock" && <AnalogFace />}
        {clockFaceStyle === "digital" && functionActive === "clock" && <DigitalFace />}
        {functionActive === "stopwatch" && <Stopwatch />}
        {functionActive === "timer" && <Timer />}
      </Box>
    </Box>
  )
}

export default ReactMuiClock
