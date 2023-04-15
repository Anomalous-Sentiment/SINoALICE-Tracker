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

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(PrimeVue, { ripple: true });
    nuxtApp.vueApp.component("DataTable", DataTable);
    nuxtApp.vueApp.component("Column", Column);
    nuxtApp.vueApp.component("InputText", InputText);
    nuxtApp.vueApp.component("MultiSelect", MultiSelect);
    nuxtApp.vueApp.component("Menubar", Menubar);
    nuxtApp.vueApp.component("Button", Button);
    nuxtApp.vueApp.component("Panel", Panel);
    nuxtApp.vueApp.component("InlineMessage", InlineMessage);

    //other components that you need
});