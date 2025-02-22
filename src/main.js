import { createSSRApp } from "vue";
import App from "./App.vue";
import PrimeVue from "primevue/config";
import { definePreset } from '@primevue/themes';
import Aura from "@primevue/themes/aura";
import ToastService from "primevue/toastservice";

// SSR requires a fresh app instance per request, therefore we export a function
// that creates a fresh app instance. If using Vuex, we'd also be creating a
// fresh store here.
const MyPreset = definePreset(Aura, {
    semantic: {
        primary: {
            50: '{sky.50}',
            100: '{sky.100}',
            200: '{sky.200}',
            300: '{sky.300}',
            400: '{sky.400}',
            500: '{sky.500}',
            600: '{sky.600}',
            700: '{sky.700}',
            800: '{sky.800}',
            900: '{sky.900}',
            950: '{sky.950}'
        }
    }
});

export function createApp() {
    const app = createSSRApp(App);
    app.use(PrimeVue, {
        theme: {
            preset: MyPreset,
        },
    });
    app.use(ToastService);
    return { app };
}
