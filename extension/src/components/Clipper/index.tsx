"use client"

import * as turndownPluginGfm from "joplin-turndown-plugin-gfm"
import type { Dispatch, SetStateAction } from "react"
import TurndownService from "turndown"

import { sendToBackground } from "@plasmohq/messaging"

interface Props {
  setClip: Dispatch<SetStateAction<boolean>>
  setLoading: Dispatch<SetStateAction<boolean>>
}
export default function ({ setClip, setLoading }: Props) {
  const Clip = async function () {
    const turndownService = new TurndownService({
      headingStyle: "atx",
      bulletListMarker: "-",
      codeBlockStyle: "fenced",
      fence: "```",
      emDelimiter: "_",
      strongDelimiter: "**",
      linkStyle: "inlined",
      linkReferenceStyle: "full"
    })
    const htmlString = document.documentElement.outerHTML.toString()
    const markdown = turndownService.turndown(htmlString)
    // alert(htmlString)
    alert(markdown)
    // console.log("markdown", markdown)
    // const markdown = turndownService.turndown(htmlString)
    setLoading(true)
    const resp = await sendToBackground({
      name: "fullClip",
      body: {
        htmlString: markdown
      }
    })
    //   alert("3"+markdown)
    setLoading(false)
    if (resp && resp.data) {
      alert("Clip Success")
    }
    // alert("Clip Success")
  }
  const handleClip = async function () {
    setClip(true)
    // await Clip()

    // setLoading(true)

    const turndownService = new TurndownService({
      headingStyle: "atx",
      bulletListMarker: "-",
      codeBlockStyle: "fenced",
      fence: "```",
      emDelimiter: "_",
      strongDelimiter: "**",
      linkStyle: "inlined",
      linkReferenceStyle: "full"
    })
    turndownService.remove(["i", "script", "iframe"])
    turndownService.addRule("codeBlock", {
      filter: "pre",
      replacement(_, node) {
        const content = node.textContent?.trim() || ""
        // @ts-ignore
        const codeName = node?._attrsByQName?.class?.data?.trim() || ""

        return `\n\`\`\`${codeName}\n${content}\n\`\`\`\n`
      }
    })

    turndownService.use(turndownPluginGfm.gfm)

    // const htmlString = document.documentElement.outerHTML.toString()
    // const htmlString = document.documentElement.outerHTML.toString()
    // const markdown : string = turndownService.turndown(htmlString)
    let documentClone = document.cloneNode(true);
    const markdown = turndownService.turndown(documentClone)
    // documentClone.find('#skPlayer')
    //     .remove()
    if (markdown) {
      const mdStr: string = markdown
      // alert("1Clip markdown" + mdStr)
    }
    // alert(htmlString)
    // alert("3" + markdown)
    // console.log("markdown", markdown)
    // const markdown = turndownService.turndown(htmlString)
    setLoading(true)
    const resp = await sendToBackground({
      name: "fullClip",
      body: {
        data: markdown
      }
    })
    setLoading(false)
    //   alert("3"+markdown)
    if (resp && resp.data) {
      alert(document.URL + " Clip Success")
    }
    // setClip(false)
  }
  return (
    <button
      className="btn btn-block flex items-center px-6 pt-2 pb-2"
      onClick={handleClip}>
      Current Page Clip
    </button>
  )
}
