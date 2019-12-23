import React, { useState, useEffect } from "react"
import * as d3 from "d3"
import styled from "styled-components"

import Layout from "../components/layout"
import SEO from "../components/seo"

import ShowNGrams from "../components/ShowNGrams"

const Svg = styled.svg`
  width: 100%;
  height: 100vh;
`

function useDataset(path) {
  const [data, setData] = useState()

  // load data on component mount or path change
  useEffect(() => {
    d3.csv(path).then(rows => {
      setData(
        rows.map(row => ({
          ...row,
          count: Number(row.count),
        }))
      )
    })
  }, [path])

  return data
}

const IndexPage = () => {
  const data = useDataset("dataset.csv")

  return (
    <Layout>
      <SEO title="Sherwood Dataviz" />
      <Svg>
        {data ? <ShowNGrams ngrams={data} width={1024} height={1024} /> : null}
      </Svg>
    </Layout>
  )
}

export default IndexPage
