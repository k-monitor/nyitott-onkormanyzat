import satori from 'satori'
import { Resvg } from '@resvg/resvg-js'
import { writeFile, readFile, stat } from 'fs/promises'
import { join } from 'path'

const fontPath = 'assets'
const interPath = join(
  process.cwd(),
  fontPath,
  'Roboto-Regular.ttf'
)

export async function generateImage({
  outputName,
  options
}) {
const interFont = await readFile(interPath)
  const publicPath = 'public'
  const relativePath = `og-images/${outputName}.png`
  const pngPath = join(process.cwd(), publicPath, relativePath)
  const og =  (
    <div style={{ display: "flex", backgroundColor: 'white', width: '100%', height: '100%', padding: '20px' }}>
      <img src={options.img} height="60%" style={{ borderRadius: '10px' }} ></img>
      <div style={{ display: "flex", flexDirection: 'column', marginLeft: '20px'}} >
      <h1 style={{fontSize: '50px'}}>{options.name}</h1>
      <p style={{fontSize: '30px'}}>{options.description}</p>
      </div>
    </div>
  )
  
  const svg = await satori(og, {
    width: options.width,
    height: options.height,
    fonts: [
        {
          name: 'Roboto-Regular',
          data: interFont,
          weight: 400,
          style: 'normal',
        },
      ],
  })
  const resvg = new Resvg(svg)
  const pngBuffer = resvg.render().asPng()

  await writeFile(pngPath, pngBuffer)

  console.log(relativePath)
  return relativePath
}
