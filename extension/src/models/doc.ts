import type {Chunk, MDss} from "~types/snapshot";
import {getSupabase} from "~models/db";
import {createClient} from "@supabase/supabase-js";

export async function insertWholeMD({markdownContext, chaosFullMD, url}) {
    const createdAt: string = new Date().toISOString();
    const uuid = self.crypto.randomUUID();
    console.log("insertWholeMD:", markdownContext)

    const supabase = await getSupabase();
    const {data, error} = await supabase
        .from('mdss')
        .insert([
            {
                uuid: uuid,
                web_url: url,
                created_at: createdAt,
                title: "title",
                abstract: "abstract",
                readableMD: markdownContext,
                chaosFullMD: chaosFullMD
            },
        ])
        .select()
    // const res = await db.query(
    //     `INSERT INTO MDSS
    //         (web_url, created_at, title, abstract, context)
    //         VALUES
    //         ($1, $2, $3, $4, $5)
    //         `,
    //     [url, createdAt, "title", "abstract", markdownContext]
    // );
    return {data, error};
}