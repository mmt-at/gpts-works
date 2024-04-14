import cssText from "data-text:~style.css"
import type {PlasmoCSConfig, PlasmoGetOverlayAnchor} from "plasmo"
import {useEffect, useRef, useState} from "react"

import {sendToBackground} from "@plasmohq/messaging"
import {useMessage} from "@plasmohq/messaging/hook"

import Clipper from "~components/Clipper"
import GptsList from "~components/GptsList"
import ModeChoice from "~components/ModeChoice"
import Search from "~components/SearchChat"
import SearchChat from "~components/SearchChat"
// import * as process from "process";
// import type {Gpts} from "~types/gpts"
// import "@mantine/core/styles.css";
// import globalCss from "data-text:@mantine/core/styles.css";

export const config: PlasmoCSConfig = {
    // matches: ["https://chat.openai.com/*"]
    matches: ["<all_urls>"],
    css: ["../style.css"]
}

export const getStyle = () => {
    const style = document.createElement("style")
    // alert(style.textContent)
    style.textContent = cssText
    // alert(style.textContent)
    return style
}

export const getOverlayAnchor: PlasmoGetOverlayAnchor = async () =>
    document.querySelector("body")

export default () => {
    console.log("SUPABASE_URL", process.env.PLASMO_PUBLIC_SUPABASE_URL)
    const [loading, setLoading] = useState(false)
    const toggleRef = useRef(null)
    const [currentPage, setCurrentPage] = useState(false)
    const [webSearch, setWebSearch] = useState(false)
    const [libQuery, setLibQuery] = useState(false)
    const [clip, setClip] = useState(false)

    useMessage<string, string>(async (req, res) => {
        if (req.name === "showSidebar") {
            // alert("show sidebar")
            setIsExpanded(!isExpanded)
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
    const [isExpanded, setIsExpanded] = useState(false);
    const [previous, setPrevious] = useState("");
    useEffect(() => {
        if (isExpanded) {
            console.log("SUPABASE_URL", process.env.PLASMO_PUBLIC_SUPABASE_URL)
            alert(process.env.PLASMO_PUBLIC_SUPABASE_URL)
//             const style = document.createElement("style")
//             style.textContent =`
//   .plugin-maximized {
//     width: calc(100% - 320px) !important;
//   }
//   // 添加更多自定义样式
// `
            const css = `.plugin-maximized {
  width: calc(100% - 320px) !important;
}`;

            const head = document.head || document.getElementsByTagName('head')[0];
            const style = document.createElement('style');
            head.appendChild(style);

            style.type = 'text/css';
            if (style.style){
                // This is required for IE8 and below.
                style.style.cssText = css;
            } else {
                style.appendChild(document.createTextNode(css));
            }
            document.body.classList.add("plugin-maximized");
            // if (toggleRef && toggleRef.current) {
            //     // fetchGpts()
            //     toggleRef.current.checked = true
            // }
            setPrevious(document.body.className)
            // document.body.style.content += ' .plugin-maximized { width: calc(100% - 320px) !important; } '
            // document.body.className += " plugin-maximized";
        } else {
          // document.body.className = previous
            document.body.classList.remove("plugin-maximized");
        }
    }, [isExpanded]);

    return (
        isExpanded && <div className="container">
            <div className="box-border h-full w-full">
                <div className="relative">
                    <div id="draggableOverlay"
                         className="pointer-events-none fixed inset-0 z-extension box-border h-full w-full bg-transparent ">
                        <div
                            className="pointer-events-none fixed inset-0 z-extension box-border h-full w-full bg-transparent ">
                            <div
                                className="container pointer-events-auto fixed right-0 top-0 z-extension box-border w-full max-w-pluginMax bg-white p-0 shadow-plugin">
                                {/*<div className="relative flex justify-between rounded-t-md bg-neutral-50 px-3 py-0.5 aria-expanded:rounded-none">*/}
                                <div id="plugin-body" className="overflow-hidden rounded-b-md">
                                    <div
                                        className="invisible relative h-full w-full opacity-0 transition-all aria-selected:visible aria-selected:opacity-100"
                                        aria-selected="true">
                                        <div className=" h-full w-1/4 pb-4 right-0 fixed">
                                            <div
                                                className="bg-slate-50 w-1/4 right-0 fixed top-0 bottom-0 overflow-y-auto text-black px-8">
                                                <div className="flex items-center px-4 pt-10 pb-4">
                                                    <h2
                                                        className="text-2xl mr-2 font-bold cursor-pointer"
                                                        onClick={() => {
                                                        }}>
                                                        PerKnown
                                                    </h2>
                                                    <div className="flex-1"></div>
                                                    <a
                                                        className="text-primary"
                                                        href="https://www.perknown.com"
                                                        target="_blank">
                                                        👉Visit website
                                                    </a>
                                                </div>
                                                <div>
                                                    <Clipper clipped={clip} setLoading={setLoading} setClip={setClip}/>
                                                    {/*{!clip && <Clipper setLoading={setLoading} setClip={setClip}/>}*/}
                                                    {/*{clip && (*/}
                                                    {/*    <p className="flex items-center px-6 pt-2 pb-2">*/}
                                                    {/*        Already Clipped !*/}
                                                    {/*    </p>*/}
                                                    {/*)}*/}
                                                </div>
                                                <div
                                                    className="fixed bottom-3 w-1/4 right-0 max-w-3xl mx-auto px-4">
                                                    <SearchChat
                                                        currentPage={currentPage}
                                                        webSearch={webSearch}
                                                        libQuery={libQuery}
                                                        clip={clip}
                                                        setLoading={setLoading}
                                                    />
                                                    <ModeChoice
                                                        setCurrentPage={setCurrentPage}
                                                        setWebSearch={setWebSearch}
                                                        setLibQuery={setLibQuery}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
