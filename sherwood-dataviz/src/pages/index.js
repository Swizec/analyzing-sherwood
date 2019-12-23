import React, { useState, useEffect } from "react"
import * as d3 from "d3"

import Layout from "../components/layout"
import SEO from "../components/seo"

import VisualizeBinaryNgrams from "../components/VisualizeBinaryNgrams"

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
      <h1>Hackers leaked a 2TB dataset from Cayman National Bank</h1>
      <p>
        The data was trapped in virtual machines and I'm not dumb enough to run
        those. Here is their binary composition instead.
      </p>
      {data ? <VisualizeBinaryNgrams ngrams={data} width={1024} /> : null}
    </Layout>
  )
}

export default IndexPage
