// "use client"
import type { PlasmoMessaging } from '@plasmohq/messaging';
const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  const { data } = req.body

  console.log("1full clip in back", data)

  res.send({
    data
  })
}

export default handler