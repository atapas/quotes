import quoteList from '../../data/quotes.json';

export default async function quotes(req, res) {
  
  return res.json(quoteList.quotes)
}
