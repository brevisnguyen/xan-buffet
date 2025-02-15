<script setup>
import { ref } from "vue";
import { useToast } from "primevue/usetoast";

const toast = useToast();

const tabs = ref([
    { title: "Về Xan", content: "Tab 1 Content", value: "0" },
    { title: "Địa chỉ", content: "Tab 2 Content", value: "1" },
    { title: "Hình ảnh", content: "Tab 3 Content", value: "2" },
    { title: "Review", content: "Tab 3 Content", value: "3" },
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
        <img class="md:hidden mx-auto" src="https://placehold.co/640x360" alt="Cover photo - Xan" />
        <img class="md:block hidden mx-auto" src="https://placehold.co/1024x370" alt="Cover photo - Xan" />
    </div>
    <div class="px-2 pb-3 md:px-4 bg-[var(--p-content-background)]">
        <div class="z-10 -mt-16 md:-mt-8 flex flex-col md:flex-row items-start md:items-end">
            <div class="relative">
                <img
                    class="logo aspect-square w-40 md:w-44 rounded-full border-2"
                    src="https://placehold.co/315x315"
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
                    <p class="text-[var(--p-surface-400)]">Đã ăn 35 suất</p>
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
                <TabPanel v-for="tab in tabs" :key="tab.content" :value="tab.value">
                    <p class="m-0">{{ tab.content }}</p>
                </TabPanel>
            </TabPanels>
        </Tabs>
    </div>
</template>
