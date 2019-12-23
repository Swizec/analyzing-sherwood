import React from "react"
import * as d3 from "d3"

function packIntoRows({ ngrams, width, widthScale }) {
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
}

const ShowNGrams = ({ ngrams, width, height }) => {
  // iterate through ngrams
  // each becomes a rectangle
  // length proportional to count
  // pack as many as possible into same height
  // color ???

  const widthScale = d3
    .scaleLog()
    .domain([1, d3.max(ngrams, d => d.count)])
    .range([1, 30])

  // pack into rows based on ngram width
  const dataRows = packIntoRows({ ngrams, width, widthScale })

  return (
    <g>
      {dataRows.map((row, y) =>
        row.map((ngram, x) => (
          <rect
            key={`${x}, ${y}`}
            x={ngram.x}
            y={y * 2}
            width={ngram.width}
            height={2}
          />
        ))
      )}
    </g>
  )
}

export default ShowNGrams
