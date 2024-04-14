

import * as turndownPluginGfm from "joplin-turndown-plugin-gfm"
import TurndownService from "turndown"
// import {JSDOM} from 'jsdom';
// import Readability from '@mozilla/readability';
export async function simpleClip(document: Document) {

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
    // console.log(body.outerHTML)
    const markdown: string = turndownService.turndown(body.outerHTML);
    // console.log(markdown)
    return markdown
}