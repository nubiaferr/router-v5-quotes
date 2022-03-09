import React from 'react'
import { Route, useParams, Link, useRouteMatch } from 'react-router-dom'
import Comments from '../components/comments/Comments'
import HighlightedQuote from '../components/quotes/HighlightedQuote'
import LoadingSpinner from '../components/UI/LoadingSpinner'
import useHttp from '../hooks/use-http'
import { getSingleQuote } from '../lib/api'

const DUMMY_QUOTES = [
  {
    id: 'q1',
    author: 'Shakespeare',
    text: 'Paçocaaaaaaaaaa'
  },
  {
    id: 'q2',
    author: 'Shakespeare',
    text: 'Queijoooooooo'
  }
]

const QuoteDetail = () => {
    const match = useRouteMatch()
    const params = useParams()

    const {sendRequest, status, data: loadedQuote, error} = useHttp(getSingleQuote, true)

    React.useEffect(() => {
      sendRequest(params.quoteId)
    }, [sendRequest, params])

    if (status === 'pending') {
      return (
        <div className='centered'>
          <LoadingSpinner />  
        </div>
      )
    }
  
    if (error) {
      return (
        <p className='centered focused'>
          {error} 
        </p>
      )
    }

    if (!loadedQuote.text) return <p>No quote</p>

  return (
    <div>
        <h1>QuoteDetail</h1>
       <HighlightedQuote text={loadedQuote.text} author={loadedQuote.author}/>
       <Route path={`${match.path}`} exact>
          <div className='centered'>
              <Link className='btn--flat' to={`${match.url}/comments`}>
                Load Comments
              </Link>
          </div>
       </Route>
        <Route path={`${match.path}/comments`}>
            <Comments />
        </Route>
    </div>
  )
}

export default QuoteDetail