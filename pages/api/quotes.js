import supertokens from 'supertokens-node';
import { superTokensNextWrapper } from 'supertokens-node/nextjs';
import { verifySession } from 'supertokens-node/recipe/session/framework/express';
import { backendConfig } from '../../config/backendConfig';
import quoteList from '../../data/quotes.json';

supertokens.init(backendConfig())

export default async function quotes(req, res) {
  await superTokensNextWrapper(
    async (next) => {
      return await verifySession()(req, res, next)
    },
    req,
    res
  )

  return res.json(quoteList.quotes)
}
