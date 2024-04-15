import type {PlasmoCSConfig, PlasmoGetOverlayAnchor} from "plasmo"
import {useEffect, useRef, useState} from "react"

import {useMessage} from "@plasmohq/messaging/hook"

import Clipper from "~components/Clipper"
import ModeChoice from "~components/ModeChoice"
import SearchChat from "~components/SearchChat"
// import cssText from "data-text:~style.css";
// export const config: PlasmoCSConfig = {
//     // matches: ["https://chat.openai.com/*"]
//     matches: ["<all_urls>"],
//     // css: ["./style.css"]
// }
import "./style.css"
import ChatPage from "~components/Chat/ChatPage";

// export const getStyle = () => {
//     const style = document.createElement("style")
//     style.textContent = cssText
//     return style
// }
// export const getOverlayAnchor: PlasmoGetOverlayAnchor = async () =>
//     document.querySelector("body")

export default function () {
    console.log("SUPABASE_URL", process.env.PLASMO_PUBLIC_SUPABASE_URL)
    const [loading, setLoading] = useState(false)
    const toggleRef = useRef(null)
    const [currentPage, setCurrentPage] = useState(false)
    const [webSearch, setWebSearch] = useState(false)
    const [libQuery, setLibQuery] = useState(false)
    const [clip, setClip] = useState(false)

    const [isExpanded, setIsExpanded] = useState(true);

    return (
        isExpanded && <div className="container">
            {/*<p>2now at: {document.URL}</p>*/}
            <div className="flex items-center px-16 pt-10 pb-4">
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
            <div className="px-6">
                <Clipper clipped={clip} setLoading={setLoading} setClip={setClip}/>
                {/*{!clip && <Clipper setLoading={setLoading} setClip={setClip}/>}*/}
                {/*{clip && (*/}
                {/*    <p classNameName="flex items-center px-6 pt-2 pb-2">*/}
                {/*        Already Clipped !*/}
                {/*    </p>*/}
                {/*)}*/}
            </div>
            <div
                className="fixed bottom-3 w-full right-0 max-w-3xl mx-auto px-4">
                <SearchChat
                    currentPage={currentPage}
                    webSearch={webSearch}
                    libQuery={libQuery}
                    clip={clip}
                    setLoading={setLoading}
                />
                <ModeChoice
                    clipped={clip}
                    setCurrentPage={setCurrentPage}
                    setWebSearch={setWebSearch}
                    setLibQuery={setLibQuery}
                />
            </div>
        </div>
        // <div>
        //     <div className="absolute inset-0 flex flex-col overflow-hidden bg-white dark:bg-zinc-900">
        //         <div
        //             className="relative flex overflow-hidden h-auto w-auto before:opacity-[var(--end-opacity)] after:opacity-[var(--start-opacity)] after:transition-opacity after:duration-300 after:ease-in-out before:transition-opacity before:duration-300 before:ease-in-out after:absolute after:z-10 before:absolute before:z-10 after:block before:block after:content-[''] before:content-[''] after:shadow-[0_1px_8px_2px] before:shadow-[0_1px_8px_2px] before:shadow-zinc-300 after:shadow-zinc-300 dark:before:shadow-zinc-700 dark:after:shadow-zinc-700 after:top-0 after:left-0 after:right-0 before:bottom-0 before:left-0 before:right-0 flex-1"
        //             // style="--start-opacity: 0; --end-opacity: 0;"
        //         >
        //             <div className="flex-1 overflow-auto"><span data-position="start"></span>
        //                 <div className="absolute inset-0 flex flex-col items-center justify-center group">
        //                     <div className="flex flex-col items-center justify-center gap-4">
        //                         <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 512 512"
        //                              fill="currentColor" stroke="currentColor" className="text-amber-500">
        //                             <path
        //                                 d="M213.09,499l-19.94-26.02l19.94-173.43H100.36L178.4,39.4l173.43-26.02l-86.72,182.11h147.42L213.09,499z"></path>
        //                         </svg>
        //                         <div className="text-2xl font-medium text-zinc-950 dark:text-zinc-50">Elmo</div>
        //                         <div className="text-sm text-zinc-600 dark:text-zinc-200 px-12 text-center"><a
        //                             className="text-amber-500 hover:text-amber-400 underline underline-offset-2"
        //                             href="https://developer.chrome.com/docs/extensions/develop/concepts/declare-permissions#allow_access_to_file_urls_and_incognito_pages"
        //                             target="_blank">How to summarize a local pdf</a></div>
        //                     </div>
        //                 </div>
        //                 <span data-position="end"></span></div>
        //         </div>
        //         <div className="flex-none p-4 flex flex-col gap-2">
        //             <div className="relative">
        //                 <div
        //                     className="relative flex items-center justify-center pb-1.5 border-b-2 border-zinc-950 dark:border-zinc-300 gap-2">
        //                     {/*<input placeholder="Ask Elmo a question or type '/' for commands"*/}
        //                     {/*       className="flex-1 w-full bg-transparent outline-none text-zinc-900 dark:text-zinc-50 placeholder-zinc-500 dark:placeholder-zinc-100"*/}
        //                     {/*       id="headlessui-combobox-input-:r0:" role="combobox" type="text" aria-expanded="false"*/}
        //                     {/*       aria-autocomplete="list" data-headlessui-state="" value="">*/}
        //                     {/*    <div className="flex-none flex gap-2">*/}
        //                     {/*        <button title="Generate"*/}
        //                     {/*                className="w-auto justify-center text-xs flex items-center gap-1 overflow-hidden relative text-amber-500 hover:text-amber-400 dark:text-zinc-50">*/}
        //                     {/*            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14"*/}
        //                     {/*                 viewBox="0 0 512 512" fill="currentColor" stroke="currentColor">*/}
        //                     {/*                <path*/}
        //                     {/*                    d="M213.09,499l-19.94-26.02l19.94-173.43H100.36L178.4,39.4l173.43-26.02l-86.72,182.11h147.42L213.09,499z"></path>*/}
        //                     {/*            </svg>*/}
        //                     {/*        </button>*/}
        //                     {/*        <button title="Settings"*/}
        //                     {/*                className="w-auto justify-center text-xs flex items-center gap-1 overflow-hidden relative text-zinc-900 hover:text-amber-500 dark:text-zinc-50">*/}
        //                     {/*            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14"*/}
        //                     {/*                 viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"*/}
        //                     {/*                 strokeLinecap="round" strokeLinejoin="round"*/}
        //                     {/*                 className="lucide lucide-bolt ">*/}
        //                     {/*                <path*/}
        //                     {/*                    d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>*/}
        //                     {/*                <circle cx="12" cy="12" r="4"></circle>*/}
        //                     {/*            </svg>*/}
        //                     {/*        </button>*/}
        //                     {/*    </div>*/}
        //                     {/*</input>*/}
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </div>
    );
}
