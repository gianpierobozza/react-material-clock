import * as React from "react"
import { useState } from "react"
import { Box, IconButton, Stack } from "@mui/material"
import AccessTimeIcon from "@mui/icons-material/AccessTime"
import NumbersIcon from "@mui/icons-material/Numbers"
import AnalogFace from "./AnalogFace"
import DigitalFace from "./DigitalFace"

const ReactMuiClock = () => {
  const [clockFaceStyle, setClockFaceStyle] = useState("analog")

  const handleClockFaceChange = () => {
    clockFaceStyle === "analog" ? setClockFaceStyle("digital") : setClockFaceStyle("analog")
  }

  return (
    <Box component="div">
      <Stack direction="row" spacing={1}>
        <IconButton color="primary" aria-label="clockFace" onClick={handleClockFaceChange}>
          {clockFaceStyle === "digital" && <AccessTimeIcon />}
          {clockFaceStyle === "analog" && <NumbersIcon />}
        </IconButton>
      </Stack>
      {clockFaceStyle === "analog" && <AnalogFace />}
      {clockFaceStyle === "digital" && <DigitalFace />}
    </Box>
  )
}

export default ReactMuiClock
