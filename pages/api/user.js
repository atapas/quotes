
export default async function user(req, res) {
  
  return res.json({
    note: 'Fetch any data from your application for authenticated user after using verifySession middleware',
    userId: req.session.getUserId(),
    sessionHandle: req.session.getHandle(),
    accessTokenPayload: req.session.getAccessTokenPayload(),
  })
}
