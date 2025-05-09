<script setup>
import { ref } from "vue";
import Header from "./partials/Header.vue";

const activeStep = ref(1);
const activateCallback = (step) => {
    activeStep.value = step;
};
const name = ref();
const email = ref();
const password = ref();
const option1 = ref(false);
const option2 = ref(false);
const option3 = ref(false);
const option4 = ref(false);
const option5 = ref(false);
const option6 = ref(false);
const option7 = ref(false);
const option8 = ref(false);
const option9 = ref(false);
const option10 = ref(false);
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
                        <div class="text-center mt-2 md:my-4 text-xl font-semibold">Chọn món</div>
                        <Message size="small" severity="info" closable>
                            Quý khách vui lòng chọn 6 món, mỗi suất gồm 1 hộp cơm, 1 hộp đồ ăn, canh và dụng cụ ăn uống.
                            Nếu có yêu cầu đặc biệt, vui lòng ghi chú trong phần ghi chú.
                        </Message>
                    </div>
                    <div class="pt-6 justify-end hidden md:flex">
                        <Button label="Tiếp" icon="pi pi-arrow-right" iconPos="right" @click="activateCallback(2)" />
                    </div>
                </StepPanel>
                <StepPanel v-slot="{ activateCallback }" :value="2">
                    <div class="flex flex-col gap-2 mx-auto" style="min-height: 16rem; max-width: 24rem">
                        <div class="text-center mt-4 mb-4 text-xl font-semibold">Choose your interests</div>
                        <div class="flex flex-wrap justify-center gap-4">
                            <ToggleButton v-model="option1" onLabel="Nature" offLabel="Nature" />
                            <ToggleButton v-model="option2" onLabel="Art" offLabel="Art" />
                            <ToggleButton v-model="option3" onLabel="Music" offLabel="Music" />
                            <ToggleButton v-model="option4" onLabel="Design" offLabel="Design" />
                            <ToggleButton v-model="option5" onLabel="Photography" offLabel="Photography" />
                            <ToggleButton v-model="option6" onLabel="Movies" offLabel="Movies" />
                            <ToggleButton v-model="option7" onLabel="Sports" offLabel="Sports" />
                            <ToggleButton v-model="option8" onLabel="Gaming" offLabel="Gaming" />
                            <ToggleButton v-model="option9" onLabel="Traveling" offLabel="Traveling" />
                            <ToggleButton v-model="option10" onLabel="Dancing" offLabel="Dancing" />
                        </div>
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
                        <div class="flex justify-center">
                            <img alt="logo" src="https://primefaces.org/cdn/primevue/images/stepper/content.svg" />
                        </div>
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
                @click="activateCallback(activeStep - 1)"
            />
            <Button
                :label="activeStep < 3 ? 'Tiếp' : 'Xác nhận'"
                :severity="activeStep < 3 ? 'primary' : 'success'"
                :icon="activeStep < 3 ? 'pi pi-arrow-right' : 'pi pi-check'"
                iconPos="right"
                @click="activateCallback(activeStep + 1)"
            />
        </div>
    </div>
</template>
