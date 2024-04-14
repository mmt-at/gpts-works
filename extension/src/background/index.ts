import { sendToContentScript } from "@plasmohq/messaging"
import process from "process";

export {}

console.log(
  "Live now; make now always the most precious time. Now will never come again."
)

chrome.action.onClicked.addListener((tab) => {
  // console.log("SUPABASE_URL", process.env.PLASMO_PUBLIC_SUPABASE_URL)
  if (tab.id) {
    console.log("fuck tab id")
    sendToContentScript({
      name: "showSidebar",
      body: {}
    })
  }
})