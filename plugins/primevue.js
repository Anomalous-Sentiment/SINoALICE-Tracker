import { defineNuxtPlugin } from "#app";
import PrimeVue from "primevue/config";
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import InputText from 'primevue/inputtext';
import MultiSelect from 'primevue/multiselect';
import Menubar from 'primevue/menubar';
import Button from 'primevue/button';
import Panel from 'primevue/panel';
import InlineMessage from 'primevue/inlinemessage';
import Dropdown from 'primevue/dropdown';
import Message from 'primevue/message';
import Image from 'primevue/image';

export default defineNuxtPlugin((nuxtApp) => {
    //console.log(useRuntimeConfig().public.siteKey)
    nuxtApp.vueApp.use(PrimeVue, { ripple: true });
    nuxtApp.vueApp.component("DataTable", DataTable);
    nuxtApp.vueApp.component("Column", Column);
    nuxtApp.vueApp.component("InputText", InputText);
    nuxtApp.vueApp.component("MultiSelect", MultiSelect);
    nuxtApp.vueApp.component("Menubar", Menubar);
    nuxtApp.vueApp.component("Button", Button);
    nuxtApp.vueApp.component("Panel", Panel);
    nuxtApp.vueApp.component("InlineMessage", InlineMessage);
    nuxtApp.vueApp.component("Dropdown", Dropdown);
    nuxtApp.vueApp.component("Message", Message);
    nuxtApp.vueApp.component("Image", Image);


    //other components that you need
});