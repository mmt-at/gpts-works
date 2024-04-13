// "use client"

import * as turndownPluginGfm from "joplin-turndown-plugin-gfm"
import type {Dispatch, SetStateAction} from "react"
import TurndownService from "turndown"
// import {JSDOM} from 'jsdom';
// import Readability from '@mozilla/readability';
import {sendToBackground} from "@plasmohq/messaging"

interface Props {
    setClip: Dispatch<SetStateAction<boolean>>
    setLoading: Dispatch<SetStateAction<boolean>>
}

export default function ({setClip, setLoading}: Props) {
    const handleClip = async function () {
        setClip(true)
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
        const body = document.body.cloneNode(true) as HTMLElement;
        const scripts = body.getElementsByTagName('script');
        const styles = body.getElementsByTagName('style');
        // Remove all script and style elements
        for (let i = scripts.length - 1; i >= 0; i--) {
            scripts[i].parentNode?.removeChild(scripts[i]);
        }
        for (let i = styles.length - 1; i >= 0; i--) {
            styles[i].parentNode?.removeChild(styles[i]);
        }
        // Remove all class attributes
        const allElements = body.getElementsByTagName('*');
        for (let i = 0; i < allElements.length; i++) {
            allElements[i].removeAttribute('class');
        }
        const markdown = turndownService.turndown(body.innerHTML);

        // const dom = new JSDOM(document, {url:document.URL});
        //
        // // 创建一个 Readability 对象
        // const reader = new Readability(dom.window.document);
        //
        // // 使用 Readability 来解析 HTML 文档
        // const article = reader.parse();
        //
        // // 创建一个 TurndownService 对象
        // // const turndownService = new TurndownService();
        //
        // // 使用 TurndownService 来将 HTML 转换为 Markdown
        // const markdown = turndownService.turndown(article?.content || '');
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
