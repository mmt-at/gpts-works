export interface mdss {
    id: string
    htmlid: string
    web_url: string
    name: string
    abstract: string
    text: string
    created_at: string
    updated_at?: string
    located_at?: string
    keywords?: string[]
    tags?: string[]
}
  
export interface htmlss {
    id: string
    mdid: string
    web_url: string
    name: string
    abstract: string
    text: string
    created_at: string
    updated_at?: string
    located_at?: string
    keywords?: string[]
    tags?: string[]
}