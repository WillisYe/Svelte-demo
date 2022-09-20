/*
 * @Author: dary
 * @Date: 2021-04-09 17:45:43
 * @LastEditors: Dary
 * @LastEditTime: 2022-03-15 11:43:08
 * @Description: file content
 */
import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import Unocss from 'unocss/vite'
import { extractorSvelte } from '@unocss/core'
import transformerDirective from '@unocss/transformer-directives'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        Unocss({
            extractors: [extractorSvelte],
            transformers: [
                transformerDirective(),
            ],
            /* more options */
        }),
        svelte()
    ],
    server: {
        port: 3020,
        proxy: {
            '/apix': {
                target: 'https://fragrant-waterfall-d607.ywbyl7722.workers.dev/',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/apix/, '')
            },
            '/api': {
                target: 'http://resource-aliyun.dcloud.net.cn/r/crash/__UNI__E9B6D54/i',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, '')
            },
        }
    }
})