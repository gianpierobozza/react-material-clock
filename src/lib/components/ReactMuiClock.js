import * as React from "react"
import { useState } from "react"
import { Box, IconButton, Stack } from "@mui/material"
import AccessTimeIcon from "@mui/icons-material/AccessTime"
import NumbersIcon from "@mui/icons-material/Numbers"
import TimerIcon from "@mui/icons-material/Timer"
import AnalogFace from "./AnalogFace"
import DigitalFace from "./DigitalFace"
import Stopwatch from "./Stopwatch"

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

  const handleFunctionChange = (activate) => {
    setFunctionActive(activate)
  }

  return (
    <Box component="div">
      <Stack direction="row" spacing={1}>
        <IconButton color="primary"
          aria-label="clockFace"
          onClick={handleClockFaceChange}
        >
          {clockFaceStyle === "digital" && <AccessTimeIcon />}
          {clockFaceStyle === "analog" && <NumbersIcon />}
        </IconButton>
        <IconButton
          color="primary"
          aria-label="stopwatch"
          onClick={() => handleFunctionChange("stopwatch")}
        >
          <TimerIcon />
        </IconButton>
      </Stack>
      <Box component="div">
        {clockFaceStyle === "analog" && functionActive === "clock" && <AnalogFace />}
        {clockFaceStyle === "digital" && functionActive === "clock" && <DigitalFace />}
        {functionActive === "stopwatch" && <Stopwatch />}
      </Box>
    </Box>
  )
}

export default ReactMuiClock
