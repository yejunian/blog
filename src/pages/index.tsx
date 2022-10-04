import React from 'react'
import type { HeadFC } from 'gatsby'

const IndexPage = () => {
  return (
    <div>
      <h1>yejunian/blog</h1>
    </div>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>yejunian/blog</title>
