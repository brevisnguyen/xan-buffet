<script setup>
import { ref, shallowRef } from "vue";
import About from "./About.vue";
import Contact from "./Contact.vue";
import Media from "./Media.vue";
import Review from "./Review.vue";
import { useToast } from "primevue/usetoast";

const toast = useToast();

const tabs = shallowRef([
    { title: "Về Xan", content: About, value: "0" },
    { title: "Địa chỉ", content: Contact, value: "1" },
    { title: "Hình ảnh", content: Media, value: "2" },
    { title: "Review", content: Review, value: "3" },
]);

const like = () => {
    toast.add({ severity: "info", summary: "Info", detail: "I love you too", life: 2000 });
};
const message = () => {
    toast.add({ severity: "info", summary: "Info", detail: "Send me a message", life: 2000 });
};
const more = () => {
    toast.add({ severity: "info", summary: "Info", detail: "See more in ...", life: 2000 });
};
</script>

<template>
    <div class="cover-photo z-0">
        <img
            class="md:hidden mx-auto aspect-video w-full h-auto object-cover bg-[var(--p-content-background)]"
            src="/images/xan-cover-169.png"
            alt="Cover photo - Xan"
        />
        <img class="md:block hidden mx-auto w-full h-auto" src="/images/xan-cover-large.png" alt="Cover photo - Xan" />
    </div>
    <div class="px-2 pb-3 md:px-4 bg-[var(--p-content-background)]">
        <div class="z-10 md:-mt-8 flex flex-col md:flex-row items-start md:items-end">
            <div class="relative">
                <img
                    class="logo aspect-square w-40 md:w-44 rounded-full border-2 -mt-16 md:mt-0"
                    src="/images/xan-logo.jpg"
                    alt="Profile photo - Xan"
                />
                <Badge class="absolute bottom-3 right-2 rounded-full" value="24/7" severity="success"></Badge>
            </div>
            <div class="title mt-2 md:mt-9 md:mb-4 md:ml-5 grow">
                <span class="font-bold text-2xl md:text-4xl">Xan Buffet Cơm Nhà</span>
                <div class="mt-2 flex flex-row items-center md:flex-col-reverse md:items-start gap-2">
                    <AvatarGroup>
                        <Avatar image="/images/avatar-1.jpg" shape="circle" />
                        <Avatar image="/images/avatar-2.jpg" shape="circle" />
                        <Avatar image="/images/avatar-3.jpg" shape="circle" />
                        <Avatar image="/images/avatar-4.jpg" shape="circle" />
                        <Avatar label="+2" shape="circle" />
                    </AvatarGroup>
                    <p class="text-[var(--p-surface-400)]">Đã ăn 35k suất</p>
                </div>
            </div>
            <div
                class="action-btn md:mb-4 mt-4 md:mt-0 w-full md:w-fit grid grid-cols-7 gap-x-3 md:flex md:justify-end"
            >
                <Button
                    @click="like()"
                    label="Đã thích"
                    severity="secondary"
                    icon="pi pi-thumbs-up-fill"
                    badge="35k"
                    variant="outlined"
                    class="mr-0 md:mr-4 col-span-3"
                />
                <Button
                    @click="message()"
                    class="col-start-4 col-span-3"
                    label="Nhắn tin"
                    severity="success"
                    icon="pi pi-whatsapp"
                />
                <Button @click="more()" class="md:hidden flex-none" severity="secondary" icon="pi pi-ellipsis-h" />
            </div>
        </div>
    </div>
    <div class="mt-3">
        <Tabs value="0">
            <TabList>
                <Tab v-for="tab in tabs" :key="tab.title" :value="tab.value">{{ tab.title }}</Tab>
            </TabList>
            <TabPanels>
                <TabPanel v-for="tab in tabs" :key="tab.value" :value="tab.value">
                    <component :is="tab.content" />
                </TabPanel>
            </TabPanels>
        </Tabs>
    </div>
</template>
