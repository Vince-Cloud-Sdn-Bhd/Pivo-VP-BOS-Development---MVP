import {expect,test} from '@playwright/test'
import {mkdir} from 'node:fs/promises'
import path from 'node:path'

const base='http://127.0.0.1:5179'

async function selectPersona(page:import('@playwright/test').Page,name:string){
  await page.goto(`${base}/login`)
  await page.evaluate(()=>localStorage.clear())
  await page.reload()
  await page.locator('.persona-card').filter({hasText:name}).first().click()
}

test('product map exports every module and validates every link',async({page})=>{
  test.setTimeout(600000)
  await selectPersona(page,'Hana')
  await expect(page).toHaveURL(/\/product-map$/)
  await selectPersona(page,'Aisha')
  await expect(page).toHaveURL(/\/product-map$/)
  await expect(page.getByRole('heading',{name:'PIVO Product Map'})).toBeVisible()
  const sidebarText=await page.locator('.sidebar').innerText()
  for(const label of ['Product Map','Partner Work','Documents','Appointments','Tasks'])expect(sidebarText).toContain(label)
  expect(sidebarText).not.toContain('Demo guide')

  const links=await page.locator('.product-map a[href]').evaluateAll(anchors=>anchors.map(anchor=>anchor.getAttribute('href')).filter((value):value is string=>Boolean(value)))
  expect(links.length).toBeGreaterThanOrEqual(50)
  console.log(`PRODUCT_MAP_LINKS=${links.length};ROLE_BUTTONS=8;TOTAL_INTERACTIONS=${links.length+8}`)

  const pageErrors:string[]=[]
  page.on('pageerror',error=>pageErrors.push(error.message))
  for(const href of links){
    await page.goto(`${base}${href}`,{waitUntil:'domcontentloaded'})
    await expect(page.locator('main, .portal-shell')).toBeVisible()
    const body=await page.locator('body').innerText()
    expect(body.trim().length).toBeGreaterThan(20)
    expect(body).not.toContain('Vince Properties')
    expect(body).not.toMatch(/\bPivo\b/)
    expect(body).not.toContain('Page not found')
    expect(body).not.toContain('Coming next')
  }
  expect(pageErrors).toEqual([])

  const portals=[
    ['Staff','/product-map'],
    ['Developer','/developer'],
    ['Banker','/banker'],
    ['Lawyer','/lawyer'],
    ['Agent','/agent'],
    ['Purchaser','/home'],
    ['Landowner','/jv'],
    ['Fund Partner','/jv'],
  ]
  for(const [label,route] of portals){
    await selectPersona(page,'Aisha')
    const card=page.locator('.portal-strip article').filter({hasText:label})
    await card.getByRole('button',{name:'Open as this role'}).click()
    await expect(page).toHaveURL(new RegExp(`${route.replace('/', '\\/')}$`))
    await expect(page.locator('main, .portal-shell')).toBeVisible()
    const body=await page.locator('body').innerText()
    expect(body.trim().length).toBeGreaterThan(20)
    expect(body).not.toContain('Vince Properties')
    expect(body).not.toMatch(/\bPivo\b/)
  }

  const output=path.resolve('docs/review-artifacts/MVP-PRESENT')
  await mkdir(output,{recursive:true})
  await selectPersona(page,'Aisha')
  for(const width of [1440,390]){
    await page.setViewportSize({width,height:width===1440?1000:844})
    await page.goto(`${base}/product-map`)
    await expect(page.getByRole('heading',{name:'PIVO Product Map'})).toBeVisible()
    await page.screenshot({path:path.join(output,`product-map-${width}.png`),fullPage:true})
  }
})
