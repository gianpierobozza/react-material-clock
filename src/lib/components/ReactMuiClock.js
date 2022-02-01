import * as React from "react"
import { useState } from "react"
import { Box } from "@mui/material"
import AnalogFace from "./AnalogFace"
import DigitalFace from "./DigitalFace"

const ReactMuiClock = () => {
  return (
    <Box component="div">
      <DigitalFace />
      <AnalogFace />
    </Box>
  )
}

export default ReactMuiClock
