import * as React from "react"
import { useEffect, useRef, useState } from "react"
import { Box, IconButton, Stack } from "@mui/material"
import PlayArrowIcon from "@mui/icons-material/PlayArrow"
import PauseIcon from "@mui/icons-material/Pause"
import ReplayIcon from "@mui/icons-material/Replay"
import "./styles/stopwatch.css"

function formatDuration(duration) {
  var decimals = duration % 100,
    seconds = Math.floor((duration / 100) % 60),
    minutes = Math.floor((duration / (100 * 60)) % 60),
    hours = Math.floor((duration / (100 * 60 * 60)) % 24)

  return hours.toString().padStart(2, "0") + ":"
    + minutes.toString().padStart(2, "0") + ":"
    + seconds.toString().padStart(2, "0") + ":"
    + decimals.toString().padStart(2, "0")
}

const Stopwatch = () => {
  const [duration, setDuration] = useState(0)
  const [timerStarted, setTimerStarted] = useState(false)
  const durationRef = useRef(duration)

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
    if (timerStarted) {
      const interval = setInterval(() => {
        setDuration((prevCounter) => prevCounter + 1)
      }, 10)

      return () => {
        clearInterval(interval)
        localStorage.setItem("duration", durationRef.current)
      }
    }
  }, [timerStarted])

  const handleClickStart = () => {
    setTimerStarted(true)
  }

  const handleClickStop = () => {
    setTimerStarted(false)
  }

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
            onClick={handleClickStart}
          >
            <PlayArrowIcon />
          </IconButton>
        }
        {timerStarted && 
          <IconButton color="primary"
            aria-label="stop"
            onClick={handleClickStop}
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
        {formatDuration(duration)}
      </Box>
    </Box>
  )
}

export default Stopwatch
