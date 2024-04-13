import type { Dispatch, SetStateAction } from "react"

interface Props {
  setCurrentPage: Dispatch<SetStateAction<boolean>>
  setWebSearch: Dispatch<SetStateAction<boolean>>
  setLibQuery: Dispatch<SetStateAction<boolean>>
}

export default ({ setCurrentPage, setWebSearch, setLibQuery }: Props) => {
  return (
    <div className="flex flex-row justify-center space-x-3">
      <div className="flex flex-row items-center space-x-2">
        <input
          type="checkbox"
          id="CurrentPage"
          aria-label="Checkbox for a"
          className="btn w-4"
          onChange={(e) => setCurrentPage(e.target.checked)}
        />
        <label htmlFor="CurrentPage" className="cursor-pointer">
          Current Page
        </label>
      </div>

      <div className="flex flex-row items-center space-x-2">
        <input
          type="checkbox"
          id="WebSearch"
          aria-label="Checkbox for b"
          className="btn w-4"
          onChange={(e) => setWebSearch(e.target.checked)}
        />
        <label htmlFor="WebSearch" className="cursor-pointer">
          Web Search
        </label>
      </div>

      <div className="flex flex-row items-center space-x-2">
        <input
          type="checkbox"
          id="LibQuery"
          aria-label="Checkbox for c"
          className="btn w-4"
          onChange={(e) => setLibQuery(e.target.checked)}
        />
        <label htmlFor="LibQuery" className="cursor-pointer">
          PerLib Query
        </label>
      </div>
    </div>
  )
}
