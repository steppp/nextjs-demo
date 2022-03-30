// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const targetUrl = 'srand.it'

export default function handler(req, res) {
  const responseObj = {
    visit: targetUrl
  }
  console.log(responseObj)

  res.status(200).json(responseObj)
}
