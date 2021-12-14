/*
 * @Author: dary
 * @Date: 2021-04-09 17:45:43
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-12-07 18:16:09
 * @Description: file content
 */
import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [svelte()],
    server: {
        port: 3020,
        proxy: {
            '/api': {
                target: 'http://resource-aliyun.dcloud.net.cn/r/crash/__UNI__E9B6D54/i',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, '')
            }            
        }
    }
})