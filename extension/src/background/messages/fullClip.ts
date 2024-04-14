// "use client"
import type { PlasmoMessaging } from '@plasmohq/messaging';
// import {getDb} from "~models/db";
import type {MDss} from "~types/snapshot";
import {insertWholeMD} from "~models/doc";
const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  const { data } = req.body
  if(data) {
    console.log("insertWholeMD message handler background: ", data)
    // const db = await insertWholeMD()
    // const dt = await insertWholeMD({data, url})
    res.send({
      data
    })
  }
}

export default handler