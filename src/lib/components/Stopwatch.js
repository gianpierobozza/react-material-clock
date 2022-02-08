import * as React from "react"
import { setDriftlessInterval, clearDriftless } from "driftless"
import { useEffect, useRef, useState } from "react"
import { Box, IconButton, Stack } from "@mui/material"
import PlayArrowIcon from "@mui/icons-material/PlayArrow"
import PauseIcon from "@mui/icons-material/Pause"
import ReplayIcon from "@mui/icons-material/Replay"
import usePageVisibility from "../utils/PageVisibility"
import "./styles/stopwatch.css"

function formatDuration(duration) {
  var seconds = Math.floor((duration / 100) % 60),
    minutes = Math.floor((duration / (100 * 60)) % 60),
    hours = Math.floor((duration / (100 * 60 * 60)) % 24)

  return hours.toString().padStart(2, "0") + ":"
    + minutes.toString().padStart(2, "0") + ":"
    + seconds.toString().padStart(2, "0")
}

function getDecimals(duration) {
  return (duration % 100).toString().padStart(2, "0")
}

const Stopwatch = () => {
  const [duration, setDuration] = useState(0)
  const [timerStarted, setTimerStarted] = useState(false)
  const durationRef = useRef(duration)
  const isVisible = usePageVisibility()

  useEffect(() => {
    var storageDuration = localStorage.getItem("duration")
    if (storageDuration !== null) {
      setDuration(parseInt(storageDuration))
      durationRef.current = parseInt(storageDuration)
      localStorage.removeItem("duration")
    }
    durationRef.current = duration
  }, [duration])

  useEffect(() => {
    if (timerStarted && isVisible) {
      const interval = setDriftlessInterval(() => {
        setDuration((prevCounter) => prevCounter + 1)
      }, 10)

      return () => {
        clearDriftless(interval)
        localStorage.setItem("duration", durationRef.current)
      }
    }
    if (!isVisible) {
      setTimerStarted(false)
    }
  }, [isVisible, timerStarted])

  const handleClickReset = () => {
    localStorage.removeItem("duration")
    durationRef.current = 0
    setTimerStarted(false)
    setDuration(0)
  }

  return (
    <Box>
      <Stack direction="row" spacing={1}>
        {!timerStarted && 
          <IconButton color="primary"
            aria-label="start"
            onClick={() => setTimerStarted(true)}
          >
            <PlayArrowIcon />
          </IconButton>
        }
        {timerStarted && 
          <IconButton color="primary"
            aria-label="stop"
            onClick={() => setTimerStarted(false)}
          >
            <PauseIcon />
          </IconButton>
        }
        <IconButton color="primary"
          aria-label="reset"
          onClick={handleClickReset}
        >
          <ReplayIcon />
        </IconButton>
      </Stack>
      <Box className={(!timerStarted && duration !== 0) ? "stopwatch-timer blink" : "stopwatch-timer"}>
        <span>{formatDuration(duration)}</span>
        <span className="decimals">.{getDecimals(duration)}</span>
      </Box>
    </Box>
  )
}

export default Stopwatch
