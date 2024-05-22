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
    <div style={{ display: "flex", backgroundColor: 'white', width: '1200px', height: '600px', padding: '40px', }}>
      <img src={options.img} height="600px" width="450px" style={{ position: "absolute", right: "0", height:"600px", width: "450px" }} ></img>
      <div style={{width: "1200", height: "1200", position: "absolute", backgroundColor: "#4498c4", transform: "rotate(70deg) translate(-520px, 250px)", borderRadius: "30px"}}> </div>
      <div style={{ display: "flex", flexDirection: 'column', marginLeft: '10px', width: '754px', paddingRight: '10px'}} >
        <h1 style={{color: "white", fontSize: '52px', fontFamily: 'Montserrat-Bold', margin: '0'}}>{'NYITOTT ÖNKORMÁNYZATOT ÉPÍTEK!'}</h1>
        <p style={{color: "white", fontSize: '30px', margin: '0'}}>{options.district}</p>
        <h1 style={{color: "white", fontSize: '30px', fontFamily: 'Montserrat-Bold', margin: '0'}}>{options.name} polgármesterjelölt</h1>
        <p style={{color: "white", fontSize: '30px', marginTop: "auto", marginBottom: '0', }}>{options.title}</p>
        <h1 style={{color: "white", fontSize: '26px', marginBottom: '0', fontFamily: 'Montserrat-Bold'}}>Probléma, hiányosság</h1>
        <p style={{color: "white", fontSize: '26px', marginTop: '0', maxWidth: "640px"}}>{options.problems}</p>
      </div>
        <img style={{position: "absolute", bottom: "30px", right: "300px"}} src="https://raw.githubusercontent.com/k-monitor/nyitott-onkormanyzat/4b5e02a6e1541f0f87f98b1f29c4c13c8be00051/public/nyitott-onkormanyzat-logo-szoveg.svg" scale="0.2" width="180px"></img>
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
