"use client"

import type {
  ChangeEvent,
  Dispatch,
  KeyboardEvent,
  SetStateAction
} from "react"
import { useRef, useState } from "react"

import { sendToBackground } from "@plasmohq/messaging"
import {getStreamOpenAI} from "~facility/chat/chat"

interface Props {
  currentPage: boolean;
  webSearch: boolean;
  libQuery: boolean;
  clip: boolean;
  setUserInput: Dispatch<SetStateAction<string>>;
  lastMsg: string;
  setLastMsg: Dispatch<SetStateAction<string|null>>;
  lastMsgEnd: boolean
  setLastMsgEnd :Dispatch<SetStateAction<boolean>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

export default function SearchChat({currentPage, webSearch, libQuery, clip, setUserInput,lastMsg, setLastMsg, lastMsgEnd, setLastMsgEnd, setLoading }: Props) {
  const [inputDisabled, setInputDisabled] = useState(false)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [content, setContent] = useState("")

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if(!lastMsgEnd) {
      setLastMsgEnd(false)
    }
    setContent(e.target.value)
  }

  const handleInputKeydown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter" && !e.shiftKey) {
      if (e.keyCode !== 229) {
        e.preventDefault()
        handleSubmit()
      }
    }
  }

  // const searchGpts = async (question: string) => {
  //   setLoading(true)
  //   const resp = await sendToBackground({
  //     name: "searchGpts",
  //     body: {
  //       question: question
  //     }
  //   })
  //   setLoading(false)
  //   if (resp && resp.data) {
  //     // setGpts(resp.data)
  //   } else {
  //     // setGpts([])
  //   }
  // }

  const handleSubmit = async () => {
    console.log(content, ":fuck click")
    if (content) {
      setUserInput(content)
      setLastMsg(content)
      setLastMsgEnd(true)
      setInputDisabled(true)
      setContent("")
      const stream = await getStreamOpenAI(content)
      setLastMsgEnd(false)
      for await (const chunk of stream) {
        const lastContent = chunk.choices[0]?.delta?.content
        if(lastContent) {
          setLastMsg(lastMsg + chunk.choices[0]?.delta?.content || '')
        }
      }
      setLastMsgEnd(true)
      setInputDisabled(false)
    }
  }

  return (
    <section className="relatve">
      <div className="mx-auto w-full max-w-3xl px-5 py-2 md:px-4 pt-2 pb-4 md:pt-4 lg:pt-4 text-center">
        <div className="flex items-center">
          <input
            type="text"
            className="flex-1 px-4 py-2 border-2 border-[#e5e8f3] bg-white rounded-lg"
            placeholder="Chat with AI"
            ref={inputRef}
            value={content}
            disabled={inputDisabled}
            onChange={handleInputChange}
            onKeyDown={handleInputKeydown}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="-ml-8 cursor-pointer"
            onClick={handleSubmit}>
            <polyline points="9 10 4 15 9 20"></polyline>
            <path d="M20 4v7a4 4 0 0 1-4 4H4"></path>
          </svg>
        </div>
      </div>
    </section>
  )
}
