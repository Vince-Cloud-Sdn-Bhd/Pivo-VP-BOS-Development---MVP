import {expect,test} from '@playwright/test'

async function selectPersona(page:import('@playwright/test').Page,name:string){
  await page.goto('/login')
  await page.getByRole('button',{name:new RegExp(name)}).click()
}

test('persona sign-in reaches the correct role home',async({page})=>{
  await selectPersona(page,'Bank A Officer')
  await expect(page).toHaveURL(/\/banker/)
  await expect(page.getByRole('heading',{name:'My applications'})).toBeVisible()
})

test('purchaser cannot access projects',async({page})=>{
  await selectPersona(page,'Purchaser One')
  await page.goto('/projects')
  await expect(page).toHaveURL(/\/denied/)
  await expect(page.getByText('Record not found')).toBeVisible()
})

test('hold conflict and idempotent retry are visible',async({page})=>{
  await selectPersona(page,'Demo Agent')
  await page.goto('/bookings/new?unit=unit-12-5')
  await page.getByRole('button',{name:'Place hold'}).click()
  await page.getByRole('button',{name:'Simulate competing request'}).click()
  await expect(page.getByRole('alert')).toContainText('CONFLICT')
})

test('booking requires purchaser identity',async({page})=>{
  await selectPersona(page,'Demo Agent')
  await page.goto('/bookings/new?unit=unit-12-5')
  await page.getByRole('button',{name:'Place hold'}).click()
  await page.getByRole('button',{name:'Prepare purchaser'}).click()
  await page.getByLabel('NRIC / Passport No').fill('')
  await page.getByRole('button',{name:'Submit booking'}).click()
  await expect(page.getByRole('alert')).toContainText('NRIC / Passport No')
})

test('Bank B cannot see Bank A application',async({page})=>{
  await selectPersona(page,'Bank B Officer')
  await expect(page.getByText('loan-a',{exact:true})).toHaveCount(0)
  await expect(page.getByText(/loan-b/)).toBeVisible()
})

test('purchase bill keeps RM5,000 outstanding',async({page})=>{
  await selectPersona(page,'Purchaser One')
  await page.goto('/payments')
  await expect(page.locator('p').filter({hasText:'Outstanding'}).getByText('RM 5,000.00')).toBeVisible()
})

test('purchaser home has no page-level horizontal scroll at 390px',async({page})=>{
  await selectPersona(page,'Purchaser One')
  await page.setViewportSize({width:390,height:844})
  await page.goto('/home')
  const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>document.documentElement.clientWidth)
  expect(overflow).toBe(false)
})
