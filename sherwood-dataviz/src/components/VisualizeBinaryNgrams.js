import React, { useMemo, useRef } from "react"
import * as d3 from "d3"
import styled from "styled-components"
import { Canvas, useFrame } from "react-three-fiber"

const Svg = styled.svg`
  width: 100%;
  height: 100vh;
`

function usePackingAlgorithm({ ngrams, width }) {
  const center = Math.floor(width / 2)

  return useMemo(() => {
    const widthScale = d3
      .scaleLog()
      .domain([1, d3.max(ngrams, d => d.count)])
      .range([1, 30])

    let rowWidth = 0
    let row = []
    let rows = []

    for (let ngram of ngrams) {
      const ngramWidth = Math.floor(widthScale(ngram.count))

      row.push({
        ...ngram,
        width: ngramWidth,
        x: rowWidth - center,
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

const Bigram = ({ ngram, x, y }) => {
  //   return (
  //     <rect
  //       key={`${x}, ${y}`}
  //       x={ngram.x}
  //       y={y * 2}
  //       width={ngram.width}
  //       height={2}
  //       fill={`#00${ngram.byte}`}
  //     />
  //   )

  //   console.log(ngram, x, y)

  //   console.log(x, y)

  return (
    <mesh position={[x, y, 0]} onPointerOver={e => console.log(ngram, x, y)}>
      <planeBufferGeometry attach="geometry" args={[ngram.width, 1]} />
      <meshBasicMaterial attach="material" color={`#00${ngram.byte}`} />
    </mesh>
  )
}

const VisualizeBinaryNgrams = ({ ngrams, width }) => {
  // iterate through ngrams
  // each becomes a rectangle
  // length proportional to count
  // pack as many as possible into same height
  // color ???

  const dataRows = usePackingAlgorithm({ ngrams, width })

  return (
    <Canvas
      //   style={{ width: width, height: dataRows.length * 5 }}
      camera={{ position: [0, 0, 50] }}
    >
      {dataRows.map((row, y) =>
        row.map((ngram, x) => (
          <Bigram ngram={ngram} x={ngram.x} y={y} key={`${x}, ${y}`} />
        ))
      )}
    </Canvas>
  )

  //   return (
  //     <Svg height={dataRows.length * 2}>
  //       <g>
  //         {dataRows.map((row, y) =>
  //           row.map((ngram, x) => (

  //           ))
  //         )}
  //       </g>
  //     </Svg>
  //   )
}

export default VisualizeBinaryNgrams
