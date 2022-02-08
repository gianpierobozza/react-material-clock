import * as React from "react"
import { useEffect } from "react"

function getBrowserVisibilityProp() {
  if (typeof document.hidden !== "undefined") {
    return "visibilitychange"
  } else if (typeof document.msHidden !== "undefined") {
    return "msvisibilitychange"
  } else if (typeof document.webkitHidden !== "undefined") {
    return "webkitvisibilitychange"
  }
}

function getBrowserDocumentHiddenProp() {
  if (typeof document.hidden !== "undefined") {
    return "hidden"
  } else if (typeof document.msHidden !== "undefined") {
    return "msHidden"
  } else if (typeof document.webkitHidden !== "undefined") {
    return "webkitHidden"
  }
}

function getIsDocumentHidden() {
  return !document[getBrowserDocumentHiddenProp()]
}

export default function usePageVisibility() {
  const [isVisible, setIsVisible] = React.useState(getIsDocumentHidden())
  const onVisibilityChange = () => setIsVisible(getIsDocumentHidden())

  useEffect(() => {
    const visibilityChange = getBrowserVisibilityProp()
    document.addEventListener(visibilityChange, onVisibilityChange, false)
    return () => {
      document.removeEventListener(visibilityChange, onVisibilityChange)
    }
  })

  return isVisible
}