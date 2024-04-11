import cssText from "data-text:~style.css"
import type { PlasmoCSConfig, PlasmoGetOverlayAnchor } from "plasmo"
import { useEffect, useRef, useState } from "react"

import { sendToBackground } from "@plasmohq/messaging"
import { useMessage } from "@plasmohq/messaging/hook"

import Clipper from "~components/Clipper"
import GptsList from "~components/GptsList"
import ModeChoice from "~components/ModeChoice"
import Search from "~components/SearchChat"
import SearchChat from "~components/SearchChat"
import type { Gpts } from "~types/gpts"

export const config: PlasmoCSConfig = {
  // matches: ["https://chat.openai.com/*"]
  matches: ["<all_urls>"]
}

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

export const getOverlayAnchor: PlasmoGetOverlayAnchor = async () =>
  document.querySelector("main")

export default () => {
  const [gpts, setGpts] = useState<Gpts[]>([])
  const [loading, setLoading] = useState(false)
  const [showButton, setShowButton] = useState(true)
  const toggleRef = useRef(null)
  const [currentPage, setCurrentPage] = useState(false)
  const [webSearch, setWebSearch] = useState(false)
  const [libQuery, setLibQuery] = useState(false)
  const [clip, setClip] = useState(false)

  const fetchGpts = async () => {
    setLoading(true)
    const resp = await sendToBackground({
      name: "getGpts",
      body: {
        category: "all"
      }
    })
    setLoading(false)
    if (resp && resp.data) {
      setGpts(resp.data)
    }
  }

  useMessage<string, string>(async (req, res) => {
    if (req.name === "showSidebar") {
      if (toggleRef && toggleRef.current) {
        fetchGpts()
        toggleRef.current.checked = true
      }
    }
  })

  // useEffect(() => {
  //   if (window.location.href.startsWith("https://www.perknown.com/")) {
  //     // fetchGpts()
  //     setShowButton(true)
  //   } else {
  //     setShowButton(false)
  //   }
  // }, [window.location.href])

  return (
    <div className="fixed top-0 right-0">
      <div className="drawer open drawer-end">
        <input
          ref={toggleRef}
          id="perknown-drawer"
          type="checkbox"
          className="drawer-toggle"
        />
        {/* <div className="drawer-content">
          {showButton && (
            <label
              htmlFor="perknown-drawer"
              className="text-sm btn btn-primary m-8">
              PerKnown
            </label>
          )}
        </div> */}
        <div className="drawer-side">
          <label
            htmlFor="perknown-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"></label>

          <div className="bg-slate-50 fixed top-0 bottom-0 overflow-y-auto text-black px-8">
            <div className="flex items-center px-4 pt-10 pb-4">
              <h2
                className="text-2xl mr-2 font-bold cursor-pointer"
                onClick={() => {}}>
                Here is PerKnown
              </h2>
              <div className="flex-1"></div>
              <a
                className="text-primary"
                href="https://gpts.works"
                target="_blank">
                Visit website 👉
              </a>
            </div>
            <div>
              {!clip && <Clipper setLoading={setLoading} setClip={setClip} />}
              {/* {clip && <p>The button was clicked.</p>} */}
              {clip && (
                <p className="flex items-center px-6 pt-2 pb-2">
                  Already Clipped !
                </p>
              )}
            </div>
            <div className="fixed bottom-3 left-0 right-0 w-full max-w-3xl mx-auto px-4">
              <SearchChat
                currentPage={currentPage}
                webSearch={webSearch}
                libQuery={libQuery}
                clip={clip}
                setLoading={setLoading}
              />
              {/* <button> */}
              <ModeChoice
                setCurrentPage={setCurrentPage}
                setWebSearch={setWebSearch}
                setLibQuery={setLibQuery}
              />

              {/* </button> */}
              {/* <Chat /> */}
              {/* <GptsList gpts={gpts} loading={loading} /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
