

import * as turndownPluginGfm from "joplin-turndown-plugin-gfm"
import TurndownService from "turndown"
// import {JSDOM} from 'jsdom';
// import { Readability } from '@web-clipper/readability';
import {Readability} from "@mozilla/readability";
export async function readabilityClip(document: Document) {
    // const turndownService = new TurndownService({codeBlockStyle: "fenced"})
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
    // turndownService.use(plugin)

    // const dom = new JSDOM(document, {url:document.URL});
    //
    // // 创建一个 Readability 对象
    // // @ts-ignore
    // const reader = new Readability(dom.window.document);
    //
    // // 使用 Readability 来解析 HTML 文档
    // const article = reader.parse();

    // 创建一个 TurndownService 对象
    // const turndownService = new TurndownService();
    // const { turndown, document, Readability } = context;
    let documentClone = document.cloneNode(true) as Document;
    // const doc = new JSDOM(document)
    // let skPlayerElement = documentClone.getElementById('skPlayer');if (skPlayerElement) {
    //     skPlayerElement.parentNode?.removeChild(skPlayerElement);}
    let article = new Readability(documentClone, {  keepClasses: true,
    }).parse();
    // const markdown = turndownService.turndown(article.content);
    // console.log("!!!!!!!!fuck md", markdown)
    // 使用 TurndownService 来将 HTML 转换为 Markdown
    const markdown = turndownService.turndown(article?.content || '');
    return markdown
}