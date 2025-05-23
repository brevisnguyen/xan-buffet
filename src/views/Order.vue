<script setup>
import { ref, onMounted, computed } from "vue";
import Header from "./partials/Header.vue";
import menuService from "@/services/menuService";
import { createOrder } from "@/services/orderService";
import { useToast } from "primevue/usetoast";

const toast = useToast();

const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
const todayIndex = new Date().getDay();
const todayString = days[todayIndex];

const menu = ref(null);
const loading = ref(true);
const error = ref(null);

const activeIndex = ref(0);
const tabs = ref([{ title: "Suất 1", value: 0 }]);
const dishesByTab = ref({});

const activeStep = ref(1);
const isOrderConfirmed = ref(false);
const order = ref({
    id: null,
    name: "",
    phone: "",
    address: "",
    note: "",
    status: "pending",
    dishes: [],
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

const currTime = () => {
    const date = new Date();

    const hour = date.getHours().toString().padStart(2, "0");
    const minute = date.getMinutes().toString().padStart(2, "0");
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear().toString().slice(-2);

    return `${hour}:${minute}, ${day}/${month}/${year}`;
};
const onCopy = (text) => {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            toast.add({
                severity: "success",
                summary: "Sao chép thành công",
                detail: "Mã đơn hàng đã được sao chép vào clipboard.",
                life: 3000,
            });
        });
    } else {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.setAttribute("readonly", "");
        textarea.style.position = "absolute";
        textarea.style.left = "-9999px";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        toast.add({
            severity: "success",
            summary: "Sao chép thành công",
            detail: "Mã đơn hàng đã được sao chép vào clipboard.",
            life: 3000,
        });
        document.body.removeChild(textarea);
    }
};
const activateCallback = (step) => {
    if (step === 2) {
        const allTabsValid = Object.values(selectedDishesByTab.value).every((dishes) => dishes.length >= 3);
        if (!allTabsValid) {
            toast.add({
                severity: "warn",
                summary: "Chưa chọn đủ món",
                detail: "Mỗi suất cần chọn ít nhất 3 món.",
                life: 3000,
            });
            return;
        }
    } else if (step === 3) {
        if (!order.value.name || !order.value.phone || !order.value.address) {
            toast.add({
                severity: "error",
                summary: "Thông tin không hợp lệ",
                detail: "Vui lòng điền đầy đủ thông tin.",
                life: 3000,
            });
            return;
        }
    } else if (step > 3) {
        onOrderSubmit();
        return;
    }
    activeStep.value = step;
};
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
const selectedDishesByTab = computed(() => {
    const result = {};
    Object.keys(dishesByTab.value).forEach((tabIndex) => {
        result[tabIndex] = dishesByTab.value[tabIndex].filter((dish) => dish.selected);
    });
    return result;
});
const onSelectDish = (dish, tabValue) => {
    const selected = selectedDishesByTab.value[tabValue] || [];

    const index = selected.findIndex((d) => d.id === dish.id);

    if (index > -1) {
        selected.splice(index, 1);
        dish.selected = false;
    } else {
        if (selected.length >= 6) {
            toast.add({
                severity: "warn",
                summary: "Giới hạn món",
                detail: "Mỗi suất chỉ được chọn tối đa 6 món.",
                life: 3000,
            });
            return;
        }
        selected.push(dish);
        dish.selected = true;
    }

    selectedDishesByTab.value[tabValue] = [...selected];
};
const onOrderSubmit = async () => {
    loading.value = true;
    try {
        order.value.dishes = tabs.value.map((tab) => {
            const dishes = selectedDishesByTab.value[tab.value] || [];
            return dishes.map((dish) => dish.id);
        });
        const payload = {
            ...order.value,
            dishes: order.value.dishes,
        };
        console.log("Submit payload", payload);
        const response = await createOrder(payload);
        if (response.success) {
            order.value.id = response.orderId;
            isOrderConfirmed.value = true;
            localStorage.setItem("newestOrderId", response.orderId);
            toast.add({
                severity: "success",
                summary: "Đặt hàng thành công",
                detail: "Quý khách đã đặt hàng thành công. Mã đơn hàng của quý khách là: " + order.value.id,
                life: 3000,
            });
        } else {
            toast.add({
                severity: "error",
                summary: "Đặt hàng không thành công",
                detail: response.message,
                life: 3000,
            });
        }
    } catch (err) {
        toast.add({
            severity: "error",
            summary: "Đặt hàng không thành công",
            detail: "Vui lòng thử lại sau.",
            life: 3000,
        });
        loading.value = false;
        return;
    }
};
const getDishNameById = (id) => {
    console.log(menu.value.dishes);
    const dish = menu.value.dishes.find((d) => d.id === id);
    return dish ? dish.name : `#${id}`;
};
</script>

<template>
    <Header />
    <div class="mb-4 mt-10 md:mt-14 md:mb-8">
        <Stepper v-model:value="activeStep" linear class="px-2 md:px-4">
            <StepList>
                <Step v-slot="{ activateCallback, value, a11yAttrs }" asChild :value="1">
                    <div class="flex flex-row flex-auto gap-2" v-bind="a11yAttrs.root">
                        <button
                            class="bg-transparent border-0 inline-flex flex-col gap-2"
                            @click="activateCallback"
                            v-bind="a11yAttrs.header"
                        >
                            <span
                                :class="[
                                    'rounded-full border-2 w-12 h-12 inline-flex items-center justify-center',
                                    {
                                        'bg-primary text-primary-contrast border-primary': value <= activeStep,
                                        'border-surface-200 dark:border-surface-700': value > activeStep,
                                    },
                                ]"
                            >
                                <i class="pi pi-shop" />
                            </span>
                        </button>
                        <Divider />
                    </div>
                </Step>
                <Step v-slot="{ activateCallback, value, a11yAttrs }" asChild :value="2">
                    <div class="flex flex-row flex-auto gap-2 pl-2" v-bind="a11yAttrs.root">
                        <button
                            class="bg-transparent border-0 inline-flex flex-col gap-2"
                            @click="activateCallback"
                            v-bind="a11yAttrs.header"
                        >
                            <span
                                :class="[
                                    'rounded-full border-2 w-12 h-12 inline-flex items-center justify-center',
                                    {
                                        'bg-primary text-primary-contrast border-primary': value <= activeStep,
                                        'border-surface-200 dark:border-surface-700': value > activeStep,
                                    },
                                ]"
                            >
                                <i class="pi pi-user" />
                            </span>
                        </button>
                        <Divider />
                    </div>
                </Step>
                <Step v-slot="{ activateCallback, value, a11yAttrs }" asChild :value="3">
                    <div class="flex flex-row pl-2" v-bind="a11yAttrs.root">
                        <button
                            class="bg-transparent border-0 inline-flex flex-col gap-2"
                            @click="activateCallback"
                            v-bind="a11yAttrs.header"
                        >
                            <span
                                :class="[
                                    'rounded-full border-2 w-12 h-12 inline-flex items-center justify-center',
                                    {
                                        'bg-primary text-primary-contrast border-primary': value <= activeStep,
                                        'border-surface-200 dark:border-surface-700': value > activeStep,
                                    },
                                ]"
                            >
                                <i class="pi pi-receipt" />
                            </span>
                        </button>
                    </div>
                </Step>
            </StepList>
            <StepPanels>
                <StepPanel v-slot="{ activateCallback }" :value="1">
                    <div class="flex flex-col gap-2 mx-auto">
                        <Message severity="info" closable>
                            Quý khách vui lòng chọn 6 món, mỗi suất gồm 1 hộp cơm, 1 hộp đồ ăn, canh và dụng cụ ăn uống.
                            Nếu có yêu cầu đặc biệt, vui lòng ghi chú trong phần ghi chú.
                        </Message>
                        <div class="text-center my-2 md:my-4 text-xl font-bold">CHỌN MÓN</div>
                        <Tabs v-model:value="activeIndex" scrollable>
                            <TabList>
                                <Tab v-for="tab in tabs" :key="tab.title" :value="tab.value" class="px-2 py-2">
                                    {{ tab.title }}
                                    <Button
                                        v-if="tabs.length > 1"
                                        icon="pi pi-times"
                                        variant="text"
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
                                    <div
                                        v-else
                                        class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 my-6"
                                    >
                                        <div v-for="dish in dishesByTab[activeIndex]" :key="dish.id">
                                            <Card class="overflow-hidden">
                                                <template #header>
                                                    <img class="w-full h-auto object-center" :src="dish.image" />
                                                </template>
                                                <template #title>
                                                    <div class="min-h-20 text-lg">{{ dish.name }}</div>
                                                </template>
                                                <template #footer>
                                                    <Button
                                                        :variant="dish.selected ? '' : 'outlined'"
                                                        :severity="dish.selected ? 'primary' : ''"
                                                        class="w-full"
                                                        @click="onSelectDish(dish, tab.value)"
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
                </StepPanel>
                <StepPanel v-slot="{ activateCallback }" :value="2">
                    <div class="flex flex-col gap-2 mx-auto">
                        <div class="text-center my-2 md:my-4 text-xl font-bold">THÔNG TIN GIAO HÀNG</div>
                        <div class="flex flex-col gap-4 w-full md:max-w-xl mx-auto">
                            <Message size="small" severity="error" v-if="error"> {{ error }} </Message>
                            <div class="flex flex-col gap-2">
                                <label for="name" class="font-semibold">
                                    Họ và tên&nbsp;<span class="italic text-sm">(bắt buộc)</span>
                                </label>
                                <InputText
                                    id="name"
                                    v-model="order.name"
                                    autofocus
                                    placeholder="Họ và tên người nhận hàng"
                                />
                            </div>
                            <div class="flex flex-col gap-2">
                                <label for="phone" class="font-semibold">
                                    SĐT&nbsp;<span class="italic text-sm">(bắt buộc)</span>
                                </label>
                                <InputText
                                    id="phone"
                                    v-model="order.phone"
                                    type="tel"
                                    placeholder="SĐT người nhận hàng"
                                />
                            </div>
                            <div class="flex flex-col gap-2">
                                <label for="address" class="font-semibold">
                                    Địa chỉ&nbsp;<span class="italic text-sm">(bắt buộc)</span>
                                </label>
                                <InputText id="name" v-model="order.address" placeholder="Địa chỉ nhận hàng" />
                            </div>
                            <div class="flex flex-col gap-2">
                                <label for="note" class="font-semibold">Ghi chú</label>
                                <Textarea name="note" v-model="order.note" rows="3" />
                            </div>
                        </div>
                    </div>
                </StepPanel>
                <StepPanel v-slot="{ activateCallback }" :value="3">
                    <div class="flex flex-col gap-2 mx-auto">
                        <Message severity="info" closable>
                            Một bước nữa thôi, mời quý khách xem lại thông tin đơn hàng và ấn xác nhận.
                        </Message>
                        <div class="text-center my-2 md:my-4 text-xl font-bold">THÔNG TIN ĐƠN HÀNG</div>
                        <div class="flex flex-col gap-y-1 w-full mx-auto">
                            <div
                                class="flex border border-[var(--p-content-border-color)] rounded-md bg-[var(--p-content-background)]"
                            >
                                <div class="p-2 w-6/12 md:text-base">
                                    <div class="flex flex-col gap-2">
                                        <p class="font-semibold">Đơn hàng</p>
                                        <div class="grid grid-cols-2 gap-1 items-baseline">
                                            <p>Order #:</p>
                                            <div class="flex items-center justify-between md:justify-start">
                                                <p>{{ order.id }}</p>
                                                <Button
                                                    icon="pi pi-copy"
                                                    size="small"
                                                    variant="text"
                                                    rounded
                                                    @click="onCopy('XanOrderNo:' + order.id)"
                                                />
                                            </div>
                                            <p>Thời gian:</p>
                                            <p>{{ currTime() }}</p>
                                            <p>Thành tiền:</p>
                                            <p>35k + phí ship</p>
                                            <p>Trạng thái:</p>
                                            <p>{{ order.status }}</p>
                                        </div>
                                    </div>
                                </div>
                                <Divider layout="vertical" />
                                <div class="p-2 w-6/12 md:text-base">
                                    <div class="flex flex-col gap-1 md:gap-2">
                                        <p class="font-semibold">Người nhận</p>
                                        <div class="flex flex-col gap-1 md:gap-2">
                                            <p><i class="pi pi-user mr-1 md:mr-3"></i>{{ order.name }}</p>
                                            <p><i class="pi pi-phone mr-1 md:mr-3"></i>{{ order.phone }}</p>
                                            <p><i class="pi pi-map-marker mr-1 md:mr-3"></i>{{ order.address }}</p>
                                            <p>
                                                <i class="pi pi-pen-to-square mr-1 md:mr-3"></i>
                                                {{ order.note }}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="mt-3 flex flex-col">
                                <h4 class="font-bold text-xl mb-3">Món ăn</h4>
                                <ul>
                                    <li v-for="(dishes, index) in selectedDishesByTab" :key="index" class="mb-2">
                                        <span class="font-semibold text-lg">Suất {{ parseInt(index) + 1 }}:&nbsp;</span>
                                        <span>
                                            {{ dishes.map((dish) => dish.name).join(", ") }}
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </StepPanel>
            </StepPanels>
        </Stepper>
        <Dialog v-model:visible="isOrderConfirmed" modal :closable="false" class="w-full max-w-sm md:max-w-lg">
            <template #header>
                <div class="inline-flex items-center gap-2">
                    <Avatar image="/images/xan-logo.jpg" shape="circle" />
                    <span class="font-bold whitespace-nowrap">Đặt hàng thành công</span>
                </div>
            </template>
            <div class="flex flex-col gap-2">
                <h3>
                    ✅ Đơn hàng đang được chuẩn bị giao. Phí ship sẽ được XAN thông báo qua SĐT của quý khách. Mã đơn
                    hàng của quý khách là: {{ order.id }} <br />👉 Ấn vào mã đơn hàng bên dưới để sao chép nhanh. Quý
                    khách vui lòng nhấn vào nút "Đơn hàng của tôi" xem trạng thái đơn. <br />👉Nếu có bất kỳ thắc mắc
                    nào, xin vui lòng liên hệ bộ phận chăm sóc khách hàng. Xin cảm ơn!
                </h3>
                <Button variant="outlined" severity="contrast" size="small" @click="onCopy(order.id)">
                    Mã đơn hàng: {{ order.id }}
                </Button>
            </div>
            <template #footer>
                <Button asChild v-slot="slotProps" variant="link">
                    <RouterLink to="/" :class="slotProps.class">Về trang chủ</RouterLink>
                </Button>
                <Button asChild v-slot="slotProps" size="small">
                    <RouterLink to="/status" :class="slotProps.class">Đơn hàng của tôi</RouterLink>
                </Button>
            </template>
        </Dialog>
        <div
            :class="[
                'fixed flex bottom-0 w-full max-w-5xl shadow-2xl border-t border-[var(--p-content-border-color)] bg-[var(--p-content-background)] px-2 py-3 z-50',
                {
                    'justify-end': activeStep < 2,
                    'justify-between': activeStep >= 2,
                },
            ]"
        >
            <Button
                v-show="activeStep > 1"
                severity="secondary"
                label="Quay lại"
                icon="pi pi-arrow-left"
                @click="activateCallback(activeStep - 1)"
            />
            <Button
                :label="activeStep < 3 ? 'Tiếp' : 'Xác nhận'"
                :severity="activeStep < 3 ? 'primary' : 'success'"
                :icon="activeStep < 3 ? 'pi pi-arrow-right' : 'pi pi-check'"
                iconPos="right"
                :disabled="loading"
                @click="activateCallback(activeStep + 1)"
            />
        </div>
    </div>
</template>
