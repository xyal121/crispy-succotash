import {createSSRApp} from "vue";
import { setupRouter } from "./router"
import App from "./App.vue";


export function createApp() {
    const app = createSSRApp(App,{productionTip: false});
    // 注册router
    setupRouter(app)
    return {
        app,
    };
}






