import {expect,test} from '@playwright/test'
import {mkdir} from 'node:fs/promises'
import path from 'node:path'

test.skip(!process.env.CAPTURE_SCREENS,'Set CAPTURE_SCREENS=1 to generate review screenshots.')
test.setTimeout(180000)

const screens=[
  ['login','/login',''],
  ['overview','/overview','Aisha'],
  ['projects','/projects/project-sample','Aisha'],
  ['bookings','/bookings/case-demo','Aisha'],
  ['banker','/banker','Bank A Officer'],
  ['lawyer','/lawyer','Firm A Associate'],
  ['purchaser-home','/home','Purchaser One'],
  ['finance','/finance','Raj'],
  ['reports','/reports','Hana'],
  ['control-room','/control-room','Hana'],
  ['walkthrough','/demo/walkthrough','Aisha'],
] as const
const output=path.resolve('docs/review-artifacts/MVP-BUILD')

test('capture main screens at desktop and mobile',async({browser})=>{
  await mkdir(output,{recursive:true})
  for(const [name,route,persona] of screens){
    for(const width of [1440,390]){
      const context=await browser.newContext({viewport:{width,height:width===1440?1000:844}})
      const page=await context.newPage()
      await page.goto('http://127.0.0.1:5179/login')
      await page.evaluate(()=>localStorage.clear())
      await page.reload()
      if(persona){
        await page.locator('.persona-card').filter({hasText:persona}).first().click()
        await page.goto(`http://127.0.0.1:5179${route}`)
      }else{
        await page.goto(`http://127.0.0.1:5179${route}`)
      }
      await expect(page.locator('body')).toBeVisible()
      await page.screenshot({path:path.join(output,`${name}-${width}.png`),fullPage:true})
      await context.close()
    }
  }
})
