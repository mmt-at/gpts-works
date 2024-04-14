import {createClient, SupabaseClient} from "@supabase/supabase-js";
// import * as process from "process";
// fuck bug!!!!
let globalSupabase : SupabaseClient;
export function getSupabase() {
    if(!globalSupabase) {
        const supabaseUrl = process.env.PLASMO_PUBLIC_SUPABASE_URL
        console.log("when getSupabase, supabaseUrl")
        console.log(process.env.PLASMO_PUBLIC_SUPABASE_URL)
        const supabaseKey = process.env.PLASMO_PUBLIC_SUPABASE_KEY
        globalSupabase = createClient(supabaseUrl, supabaseKey)
    }
    return globalSupabase;
}