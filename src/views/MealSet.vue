<script setup>
import { ref, onMounted, computed } from "vue";
import menuService from "@/services/menuService";

const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
const todayIndex = new Date().getDay();
const todayString = days[todayIndex];

const menu = ref(null);
const loading = ref(false);
const error = ref(null);

const activeIndex = ref(0);
const tabs = ref([{ title: "Suất 1", value: 0 }]);
const dishesByTab = ref({});

const selectedDishesByTab = computed(() => {
    const result = {};
    Object.keys(dishesByTab.value).forEach((tabIndex) => {
        result[tabIndex] = dishesByTab.value[tabIndex].filter((dish) => dish.selected);
    });
    return result;
});

onMounted(async () => {
    try {
        const data = await menuService.getMenuByDay(todayString);
        menu.value = data.data;
        dishesByTab.value[0] = menu.value.dishes.map((dish) => ({
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
    const maxValue = tabs.value.length > 0 ? Math.max(...tabs.value.map((tab) => tab.value)) : null;
    const newTabIndex = maxValue + 1;
    tabs.value.push({
        title: `Suất ${newTabIndex + 1}`,
        value: newTabIndex,
    });

    activeIndex.value = newTabIndex;

    if (menu.value.dishes?.length) {
        dishesByTab.value[newTabIndex] = menu.value.dishes.map((dish) => ({
            ...dish,
            selected: false,
        }));
    }
};
const onRemoveTab = (index) => {
    if (tabs.value.length <= 1) return;

    const newTabs = tabs.value.filter((tab) => tab.value !== index);
    tabs.value = newTabs;

    activeIndex.value = tabs.value[0].value;

    delete dishesByTab.value[index];
};

const onSelectDish = (dish) => {
    const currentTab = activeIndex.value;

    dishesByTab.value[currentTab] = dishesByTab.value[currentTab].map((d) => {
        if (d.id === dish.id) {
            return { ...d, selected: !d.selected };
        }
        return d;
    });
};
</script>

<template>
    <div class="">
        <Tabs v-model:value="activeIndex" scrollable>
            <TabList>
                <Tab v-for="tab in tabs" :key="tab.title" :value="tab.value" class="px-2 py-2">
                    {{ tab.title }}
                    <Button
                        v-if="tabs.length > 1"
                        icon="pi pi-times"
                        rounded
                        text
                        severity="secondary"
                        size="small"
                        @click.stop="onRemoveTab(tab.value)"
                    />
                </Tab>
                <Button
                    class="text-nowrap shrink-0 z-10"
                    icon="pi pi-plus"
                    variant="text"
                    label="Thêm suất"
                    @click="onAddNewTab"
                />
            </TabList>
            <TabPanels>
                <TabPanel v-for="tab in tabs" :key="tab.value" :value="tab.value">
                    <div v-if="loading">Đang tải dữ liệu thực đơn...</div>
                    <div v-else-if="error" class="error">{{ error }}</div>
                    <div v-else class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 md:gap-4 my-6">
                        <div v-for="dish in dishesByTab[activeIndex]" :key="dish.id">
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
