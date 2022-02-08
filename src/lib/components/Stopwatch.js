import * as React from "react"
import { setDriftlessInterval, clearDriftless } from "driftless"
import { useEffect, useRef, useState } from "react"
import {
  Box, IconButton, Stack,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow
} from "@mui/material"
import PlayArrowIcon from "@mui/icons-material/PlayArrow"
import PauseIcon from "@mui/icons-material/Pause"
import ReplayIcon from "@mui/icons-material/Replay"
import FlagIcon from "@mui/icons-material/Flag"
import usePageVisibility from "../utils/PageVisibility"
import "./styles/stopwatch.css"

const columns = [
  { id: "id", label: "\u00a0", maxWidth: 60 },
  {
    id: "duration",
    label: "Lap\u00a0Time",
    minWidth: 100,
    align: "left"
  },
  {
    id: "split",
    label: "Split\u00a0Time",
    minWidth: 100,
    align: "right"
  },
];

function formatDuration(duration) {
  var seconds = Math.floor((duration / 100) % 60),
    minutes = Math.floor((duration / (100 * 60)) % 60),
    hours = Math.floor((duration / (100 * 60 * 60)) % 24)

  var formatted = minutes.toString().padStart(2, "0") + ":"
    + seconds.toString().padStart(2, "0")

  return hours > 0 ? hours.toString().padStart(2, "0") + ":" + formatted : formatted
}

function getDecimals(duration) {
  return (duration % 100).toString().padStart(2, "0")
}

const Stopwatch = () => {
  const [duration, setDuration] = useState(0)
  const [timerStarted, setTimerStarted] = useState(false)
  const [laps, setLaps] = useState([])
  const durationRef = useRef(duration)
  const lapsRef = useRef(laps)
  const isVisible = usePageVisibility()

  useEffect(() => {
    var storageDuration = localStorage.getItem("duration")
    var storageLaps = JSON.parse(localStorage.getItem("laps"))
    if (storageDuration !== null) {
      setDuration(parseInt(storageDuration))
      durationRef.current = parseInt(storageDuration)
      localStorage.removeItem("duration")
    }
    if (storageLaps !== null) {
      setLaps(storageLaps)
      lapsRef.current = storageLaps
      localStorage.removeItem("laps")
    }
    durationRef.current = duration
    lapsRef.current = laps
  }, [duration, laps])

  useEffect(() => {
    if (timerStarted && isVisible) {
      const interval = setDriftlessInterval(() => {
        setDuration((prevCounter) => prevCounter + 1)
      }, 10)

      return () => {
        clearDriftless(interval)
        localStorage.setItem("duration", durationRef.current)
        localStorage.setItem("laps", JSON.stringify(lapsRef.current))
      }
    }
    if (!isVisible) {
      setTimerStarted(false)
    }
  }, [isVisible, timerStarted])

  const handleClickReset = () => {
    localStorage.removeItem("duration")
    localStorage.removeItem("laps")
    durationRef.current = 0
    setTimerStarted(false)
    setDuration(0)
    setLaps([])
  }

  const handleClickLaps = () => {
    setLaps(prevLaps => {
      var lapTime, splitTime = 0
      if (prevLaps.length === 0) {
        lapTime = duration
        splitTime = duration
      } else {
        lapTime = duration - prevLaps[0].split
        splitTime = lapTime + prevLaps[0].split
      }
      return [{
        id: prevLaps.length,
        duration: lapTime,
        split: splitTime
      }, ...prevLaps]
    });
  }

  return (
    <Box>
      <Stack direction="row" spacing={1}>
        {!timerStarted &&
          <IconButton color="secondary"
            aria-label="start"
            onClick={() => setTimerStarted(true)}
          >
            <PlayArrowIcon />
          </IconButton>
        }
        {timerStarted &&
          <IconButton color="secondary"
            aria-label="stop"
            onClick={() => setTimerStarted(false)}
          >
            <PauseIcon />
          </IconButton>
        }
        <IconButton color="secondary"
          aria-label="reset"
          onClick={handleClickReset}
        >
          <ReplayIcon />
        </IconButton>
        {duration > 0 && timerStarted &&
          <IconButton color="secondary"
            aria-label="laps"
            onClick={handleClickLaps}
          >
            <FlagIcon />
          </IconButton>
        }
      </Stack>
      <Box className={(!timerStarted && duration !== 0) ? "stopwatch-timer blink" : "stopwatch-timer"}>
        <span>{formatDuration(duration)}</span>
        <span className="decimals">.{getDecimals(duration)}</span>
      </Box>
      {laps.length > 0 &&
        <TableContainer sx={{ width: 400, maxHeight: 350 }}>
          <Table stickyHeader aria-label="laps table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {laps.map(lap => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={lap.id}>
                    {columns.map((column) => {
                      var value
                      if (column.id !== "id") {
                        value = formatDuration(lap[column.id])+"."+getDecimals(lap[column.id])
                      } else {
                        value = (lap[column.id] + 1).toString().padStart(2, "0")
                      }
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                        >
                          {value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      }
    </Box>
  )
}

export default Stopwatch
