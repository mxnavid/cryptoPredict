import React from 'react'

const Cryptocurrency = (props) => {
   return (
      <div>
         <p>{props.match.params.coin}</p>
      </div>
   )
}

export default Cryptocurrency;