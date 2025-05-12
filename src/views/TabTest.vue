<script setup>
import { ref, onMounted } from "vue";
import Header from "./partials/Header.vue";
import menuService from "@/services/menuService";

const menu = ref(null);
const loading = ref(true);
const error = ref(null);
const activeIndex = ref(0);
const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
const todayIndex = new Date().getDay();
const todayString = days[todayIndex];
const tabs = ref([{ title: "Suất 1", value: "0" }]);

onMounted(async () => {
    try {
        const data = await menuService.getMenuByDay(todayString);
        menu.value = data.data;
        menu.value.dishes = menu.value.dishes.map((dish) => ({
            ...dish,
            selected: false,
        }));
    } catch (err) {
        error.value = "Không thể tải thực đơn. Vui lòng thử lại sau." + err;
    } finally {
        loading.value = false;
    }
});

const onAddNewTab = () => {
    const newTabIndex = tabs.value.length + 1;
    tabs.value.push({
        title: `Suất ${newTabIndex}`,
        value: newTabIndex,
    });
    activeIndex.value = tabs.value.length - 1;
};
</script>

<template>
    <div class="my-10">
        <Tabs value="0">
            <TabList>
                <Tab v-for="tab in tabs" :key="tab.title" :value="tab.value">{{ tab.title }}</Tab>
                <Button icon="pi pi-plus" variant="text" label="Thêm suất" @click="onAddNewTab"></Button>
            </TabList>
            <TabPanels>
                <TabPanel v-for="tab in tabs" :key="tab.value" :value="tab.value">
                    <div v-if="loading">Đang tải dữ liệu thực đơn...</div>
                    <div v-else-if="error" class="error">
                        {{ error }}
                    </div>
                    <div v-else class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 md:gap-4 my-6">
                        <div v-for="dish in menu.dishes" :key="dish.id">
                            <Card class="overflow-hidden">
                                <template #header>
                                    <img :src="dish.image" />
                                </template>
                                <template #title>
                                    <div class="min-h-20 text-lg">{{ dish.name }}</div>
                                </template>
                                <template #footer>
                                    <Button
                                        :variant="dish.selected ? '' : 'outlined'"
                                        :severity="dish.selected ? 'primary' : ''"
                                        class="w-full"
                                        @click="onSelectDish(dish)"
                                    >
                                        {{ dish.selected ? "Đã chọn" : "Chọn" }}
                                    </Button>
                                </template>
                            </Card>
                        </div>
                    </div>
                </TabPanel>
            </TabPanels>
        </Tabs>
    </div>
</template>
