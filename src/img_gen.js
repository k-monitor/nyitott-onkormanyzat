import satori from 'satori'
import { Resvg } from '@resvg/resvg-js'
import { writeFile, readFile, stat } from 'fs/promises'
import { join } from 'path'

const interPathRegular = join(process.cwd(), 'assets', 'Montserrat-Regular.ttf')
const interPathBold = join(process.cwd(), 'assets', 'Montserrat-Bold.ttf')

export async function generateImage({
  outputName,
  options
}) {
  const interFontRegular = await readFile(interPathRegular)
  const interFontBold = await readFile(interPathBold)
  const publicPath = 'public'
  const relativePath = `og-images/${outputName}.png`
  const pngPath = join(process.cwd(), publicPath, relativePath)
  const og =  (
    <div style={{ display: "flex", backgroundColor: 'white', width: '1200px', height: '600px', padding: '10px' }}>
      <img src={options.img} height="580px" width="386px" style={{ borderRadius: '10px', height:"580px", width: "386px" }} ></img>
      <div style={{ display: "flex", flexDirection: 'column', marginLeft: '10px', width: '794px', paddingRight: '10px'}} >
        <h1 style={{fontSize: '40px', margin: '0'}}>{'NYITOTT ÖNKORMÁNYZATOT ÉPÍTEK!'}</h1>
        <h1 style={{fontSize: '30px', margin: '0'}}>{options.district}</h1>
        <h1 style={{fontSize: '30px', margin: '0'}}>{options.name} polgármesterjelölt</h1>
        <p style={{fontSize: '30px', marginBottom: '0', fontFamily: 'Montserrat-Bold', fontWeight: "400"}}><b>{options.title}</b></p>
        <p style={{fontSize: '21px', marginTop: '0'}}>{'Probléma, hiányosság: '+options.problems}</p>
        <p style={{fontSize: '21px'}}>{'Vállalás részletei: '+options.details}</p>
      </div>
    </div>
  )
  
  const svg = await satori(og, {
    width: options.width,
    height: options.height,
    fonts: [
        {
          name: 'Montserrat-Regular',
          data: interFontRegular,
          weight: 400,
          style: 'normal',
        },
        {
          name: 'Montserrat-Bold',
          data: interFontBold,
          weight: 800,
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
