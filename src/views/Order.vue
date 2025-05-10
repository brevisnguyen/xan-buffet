<script setup>
import { ref, onMounted } from "vue";
import Header from "./partials/Header.vue";
import menuService from "@/services/menuService";
import { useToast } from "primevue/usetoast";

const toast = useToast();
const menu = ref(null);
const loading = ref(true);
const error = ref(null);
const activeStep = ref(2);
const order = ref({
    name: "",
    phone: "",
    address: "",
    note: "",
    dishes: [],
});

const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
const todayIndex = new Date().getDay();
const todayString = days[todayIndex];

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

const activateCallback = (step) => {
    if (step === 2) {
        if (order.value.dishes.length < 6) {
            toast.add({
                severity: "warn",
                summary: "Chưa chọn đủ món",
                detail: "Quý khách vui lòng chọn tối thiểu 6 món.",
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
    }
    activeStep.value = step;
};
const onSelectDish = (dish) => {
    const exists = order.value.dishes.some((d) => d.id === dish.id);
    if (exists) {
        order.value.dishes = order.value.dishes.filter((d) => d.id !== dish.id);
    } else {
        if (order.value.dishes.length >= 6) {
            toast.add({
                severity: "error",
                summary: "Số lượng món vượt quá giới hạn",
                detail: "Quý khách chỉ được chọn tối đa 6 món. Xin vui lòng bỏ chọn món khác.",
                life: 3000,
            });
            return;
        }
        order.value.dishes.push(dish);
    }
    dish.selected = !dish.selected;
};
</script>

<template>
    <Header />
    <div class="">
        <Stepper v-model:value="activeStep" linear class="px-2 md:px-4 mt-3">
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
                        <Message size="small" severity="info" closable>
                            Quý khách vui lòng chọn 6 món, mỗi suất gồm 1 hộp cơm, 1 hộp đồ ăn, canh và dụng cụ ăn uống.
                            Nếu có yêu cầu đặc biệt, vui lòng ghi chú trong phần ghi chú.
                        </Message>
                        <div class="text-center my-2 md:my-4 text-xl font-semibold">Chọn món</div>
                        <div v-if="loading" class="loading">
                            Đang tải dữ liệu thực đơn...
                            <span class="animate-spin">🌀</span>
                        </div>
                        <div v-else-if="error" class="error">
                            {{ error }}
                        </div>
                        <div v-else class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 md:gap-4">
                            <div v-for="dish in menu.dishes" :key="dish.id">
                                <Card class="overflow-hidden">
                                    <template #header>
                                        <img :src="dish.image" />
                                    </template>
                                    <template #title>
                                        <div class="min-h-20">{{ dish.name }}</div>
                                    </template>
                                    <template #footer>
                                        <Button
                                            :variant="dish.selected ? '' : 'outlined'"
                                            :severity="dish.selected ? 'primary' : ''"
                                            size="small"
                                            class="w-full"
                                            @click="onSelectDish(dish)"
                                        >
                                            {{ dish.selected ? "Đã chọn" : "Chọn" }}
                                        </Button>
                                    </template>
                                </Card>
                            </div>
                        </div>
                    </div>
                </StepPanel>
                <StepPanel v-slot="{ activateCallback }" :value="2">
                    <div class="flex flex-col gap-2 mx-auto">
                        <div class="text-center my-2 md:my-4 text-xl font-semibold">Thông tin giao hàng</div>
                        <div class="flex flex-col gap-4 w-full md:max-w-xl mx-auto">
                            <Message size="small" severity="error" v-if="error"> {{ error }} </Message>
                            <div class="flex flex-col gap-2">
                                <label for="name">Họ và tên</label>
                                <InputText
                                    id="name"
                                    v-model="order.name"
                                    autofocus
                                    placeholder="Họ và tên người nhận hàng"
                                />
                            </div>
                            <div class="flex flex-col gap-2">
                                <label for="phone">Địa chỉ</label>
                                <InputText
                                    id="phone"
                                    v-model="order.phone"
                                    type="tel"
                                    placeholder="SĐT người nhận hàng"
                                />
                            </div>
                            <div class="flex flex-col gap-2">
                                <label for="address">Địa chỉ</label>
                                <InputText id="name" v-model="order.address" placeholder="Địa chỉ nhận hàng" />
                            </div>
                            <div class="flex flex-col gap-2">
                                <label for="note">Ghi chú</label>
                                <Textarea name="note" v-model="order.note" rows="3" />
                            </div>
                        </div>
                    </div>
                </StepPanel>
                <StepPanel v-slot="{ activateCallback }" :value="3">
                    <div class="flex flex-col gap-2 mx-auto">
                        <Message size="small" severity="info" closable>
                            Một bước nữa thôi, mời quý khách xem lại thông tin đơn hàng và ấn xác nhận.
                        </Message>
                        <div class="text-center my-2 md:my-4 text-xl font-semibold">Xác nhận</div>
                        <div class="flex flex-col gap-y-1 w-full mx-auto">
                            <p>Người nhận:&nbsp;{{ order.name }}</p>
                            <p>SĐT:&nbsp;{{ order.phone }}</p>
                            <p>Địa chỉ:&nbsp;{{ order.address }}</p>
                        </div>
                    </div>
                </StepPanel>
            </StepPanels>
        </Stepper>
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
                size="small"
                @click="activateCallback(activeStep - 1)"
            />
            <Button
                :label="activeStep < 3 ? 'Tiếp' : 'Xác nhận'"
                :severity="activeStep < 3 ? 'primary' : 'success'"
                :icon="activeStep < 3 ? 'pi pi-arrow-right' : 'pi pi-check'"
                iconPos="right"
                size="small"
                @click="activateCallback(activeStep + 1)"
            />
        </div>
    </div>
</template>
