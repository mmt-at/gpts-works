export interface MDss {
    // ss means snapshot
    id?: string
    html_id?: string
    web_url: string
    title: string
    abstract: string
    context: string
    created_at: string
    updated_at?: string
    located_at?: string
    keywords?: string[]
    tags?: string[]
}
  
export interface HTMLss {
    id?: string
    md_id?: string
    web_url: string
    title: string
    abstract: string
    context: string
    created_at: string
    updated_at?: string
    located_at?: string
    keywords?: string[]
    tags?: string[]
}

export interface Chunk {
    id? : string
    md_id: string
    md_index: string
    web_url: string
    context: string
    located_label? : string
    embeddings: Float32Array
    useful_questions?: string[]
    keywords?: string[]
    tags?: string[]
}