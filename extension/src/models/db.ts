import {Pool} from "pg";
import {createClient, SupabaseClient} from "@supabase/supabase-js";
import * as process from "process";
let globalPool: Pool;
let globalSupabase : SupabaseClient;
export function getSupabase() {
    if(!globalSupabase) {
        const supabaseUrl = process.env.PLASMO_PUBLIC_SUPABASE_URL
        const supabaseKey = process.env.PLASMO_PUBLIC_SUPABASE_KEY
        console.log("supabaseUrl", supabaseUrl)
        console.log("supabaseKey", supabaseKey.substring(10))
        globalSupabase = createClient(supabaseUrl, supabaseKey)
    }
    return globalSupabase;
    // return globalPool
}