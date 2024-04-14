// "use client"

import * as turndownPluginGfm from "joplin-turndown-plugin-gfm"
import type {Dispatch, SetStateAction} from "react"
import TurndownService from "turndown"
import {createClient} from '@supabase/supabase-js'
// import {JSDOM} from 'jsdom';
// import Readability from '@mozilla/readability';
// import {sendToBackground} from "@plasmohq/messaging"
import {insertWholeMD} from "~models/doc";
import {sendToBackground} from "@plasmohq/messaging";
import {simpleClip} from "~facility/webclipper/SimpleClipper";
import {readabilityClip} from "~facility/webclipper/ReadabilityClipper";

// import {getDb} from "~models/db";

interface Props {
    clipped: boolean
    setClip: Dispatch<SetStateAction<boolean>>
    setLoading: Dispatch<SetStateAction<boolean>>
}

export default function ({clipped, setClip, setLoading}: Props) {
    const handleClip = async function () {
        setClip(true)
        const uglyFullMD: string = await simpleClip(document)
        const markdown: string = await readabilityClip(document)
        setLoading(true)
        const resp1 = await sendToBackground({
            name: "fullClip",
            body: {
                data: markdown,
            }
        })
        setLoading(false)
        console.log()
        const supabaseRes = await insertWholeMD({
            markdownContext: markdown,
            chaosFullMD: uglyFullMD,
            url: document.URL
        });
        setLoading(true)
        const resp = await sendToBackground({
            name: "fullClip",
            body: {
                data: supabaseRes,
            }
        })
        setLoading(false)
        //   alert("3"+markdown)
        // if (resp && resp.data) {
        //     alert(document.URL + " Clip Success")
        // }
    }

    return (
        <button
            className="btn btn-block flex items-center px-6 pt-2 pb-2"
            disabled={clipped}
            onClick={handleClip}>
            Current Page Clip
        </button>
    )
}
