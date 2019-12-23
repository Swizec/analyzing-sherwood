import React, { useMemo } from "react"
import * as d3 from "d3"
import styled from "styled-components"

const Svg = styled.svg`
  width: 100%;
  height: 100vh;
`

function usePackingAlgorithm({ ngrams, width }) {
  return useMemo(() => {
    const widthScale = d3
      .scaleLog()
      .domain([1, d3.max(ngrams, d => d.count)])
      .range([1, 30])

    let rowWidth = 0
    let row = []
    let rows = []

    for (let ngram of ngrams) {
      const ngramWidth = widthScale(ngram.count)

      row.push({
        ...ngram,
        width: ngramWidth,
        x: rowWidth,
      })
      rowWidth += ngramWidth

      if (rowWidth >= width) {
        rows.push(row)
        rowWidth = 0
        row = []
      }
    }

    return rows
  }, [ngrams, width])
}

const VisualizeBinaryNgrams = ({ ngrams, width }) => {
  // iterate through ngrams
  // each becomes a rectangle
  // length proportional to count
  // pack as many as possible into same height
  // color ???

  const dataRows = usePackingAlgorithm({ ngrams, width })

  return (
    <Svg height={dataRows.length * 2}>
      <g>
        {dataRows.map((row, y) =>
          row.map((ngram, x) => (
            <rect
              key={`${x}, ${y}`}
              x={ngram.x}
              y={y * 2}
              width={ngram.width}
              height={2}
              fill={`#00${ngram.byte}`}
            />
          ))
        )}
      </g>
    </Svg>
  )
}

export default VisualizeBinaryNgrams
