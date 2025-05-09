<script setup>
import { ref } from "vue";
import Header from "./partials/Header.vue";
import menu from "../services/menu.json";

const today = new Date().getDay();
const title = menu[today].title;
const items = menu[today].items;

const activeStep = ref(1);
const activateCallback = (step) => {
    activeStep.value = step;
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
                        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 md:gap-4">
                            <div v-for="(item, index) in items" :key="index">
                                <Card class="overflow-hidden">
                                    <template #header>
                                        <img :src="item.image" />
                                    </template>
                                    <template #title>{{ item.title }}</template>
                                    <template #footer>
                                        <div class="flex">
                                            <Button label="Chọn" class="w-full" />
                                        </div>
                                    </template>
                                </Card>
                            </div>
                        </div>
                    </div>
                    <div class="pt-6 justify-end hidden md:flex">
                        <Button label="Tiếp" icon="pi pi-arrow-right" iconPos="right" @click="activateCallback(2)" />
                    </div>
                </StepPanel>
                <StepPanel v-slot="{ activateCallback }" :value="2">
                    <div class="flex flex-col gap-2 mx-auto" style="min-height: 16rem; max-width: 24rem">
                        <div class="text-center md:my-4 text-xl font-semibold">Choose your interests</div>
                        <div class="flex flex-wrap justify-center gap-4"></div>
                    </div>
                    <div class="flex pt-6 justify-between">
                        <Button
                            label="Quay lại"
                            severity="secondary"
                            icon="pi pi-arrow-left"
                            @click="activateCallback(1)"
                        />
                        <Button label="Tiếp" icon="pi pi-arrow-right" iconPos="right" @click="activateCallback(3)" />
                    </div>
                </StepPanel>
                <StepPanel v-slot="{ activateCallback }" :value="3">
                    <div class="flex flex-col gap-2 mx-auto" style="min-height: 16rem; max-width: 24rem">
                        <div class="text-center mt-4 mb-4 text-xl font-semibold">Account created successfully</div>
                        <div class="flex justify-center"></div>
                    </div>
                    <div class="flex pt-6 justify-between">
                        <Button
                            label="Quay lại"
                            severity="secondary"
                            icon="pi pi-arrow-left"
                            @click="activateCallback(2)"
                        />
                        <Button label="Tiếp" icon="pi pi-arrow-right" iconPos="right" @click="activateCallback(3)" />
                    </div>
                </StepPanel>
            </StepPanels>
        </Stepper>
        <div
            :class="[
                'fixed flex lg:hidden bottom-0 w-full max-w-5xl bg-[var(--p-content-background)] px-2 py-3 z-50',
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
