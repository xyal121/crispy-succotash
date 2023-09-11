import {defineConfig} from "vite";
import uni from "@dcloudio/vite-plugin-uni";
import AutoImport from "unplugin-auto-import/vite";
// @ts-ignore
import h5ProdEffectPlugin from "uni-vite-plugin-h5-prod-effect";

const path = require('path')

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        uni(),
        AutoImport({
            // 自动导入vue相关的Api
            imports: ["vue"],   // 也支持vue-router、axios等
            // 声明文件的存放位置
            dts: 'src/auto-imports.d.ts',
        }),
        // 对h5 production环境打包时的特殊处理，否则uni-crazy-router在这个环境会异常
        h5ProdEffectPlugin()
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
    server: {
        host: "127.0.0.1", // 监听的IP地址
        port: 3000, //启动端口
        open: true, // 自动打开
        // proxy: {
        //     "/dapi": {
        //         target: "http://120.76.52.66",
        //         changeOrigin: true,
        //         rewrite: path => path.replace(/^\/dapi/, ""),
        //     },
        // },
    }
});