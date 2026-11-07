import {defineConfig} from 'vitest/config'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins:[vue()],
  base:process.env.GITHUB_ACTIONS?'/Pivo-VP-BOS-Development---MVP/':'/',
  server:{port:5179,strictPort:true},
  test:{environment:'node',include:['tests/**/*.test.ts']},
})
