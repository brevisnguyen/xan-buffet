<script setup>
import { ref, onMounted } from "vue";
import Header from "./partials/Header.vue";
import { createOrder, getOrderStatus } from "@/services/orderService";

const orderId = ref(null);
const error = ref(null);
const orderError = ref(null);
const loading = ref(true);
const order = ref({});

const onSearch = async () => {
    error.value = null;
    orderError.value = null;
    loading.value = true;
    if (orderId.value) {
        localStorage.setItem("newestOrderId", orderId.value);
        const response = await getOrderStatus(orderId.value);
        if (response.success) {
            order.value = response.order;
        } else {
            error.value = response.message;
        }
        loading.value = false;
    } else {
        error.value = null;
        orderError.value = "Vui lòng nhập mã đơn hàng của bạn";
    }
};
const formatTime = (time) => {
    const date = new Date(time);

    const hour = date.getHours().toString().padStart(2, "0");
    const minute = date.getMinutes().toString().padStart(2, "0");
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear().toString().slice(-2);

    return `${hour}:${minute}, ${day}/${month}/${year}`;
};
const formatStatus = (status) => {
    switch (status) {
        case "pending":
            return "Chờ xác nhận";
        case "confirmed":
            return "Đã xác nhận";
        case "delivering":
            return "Đang giao hàng";
        case "delivered":
            return "Đã giao hàng";
        case "canceled":
            return "Đã hủy";
        case "completed":
            return "Hoàn thành";
        default:
            return status;
    }
};

onMounted(async () => {
    const storedOrderId = localStorage.getItem("newestOrderId");
    if (storedOrderId) {
        orderId.value = storedOrderId;
    }
});
</script>

<template>
    <Header />
    <div class="mb-4 mt-10 md:mt-14 md:mb-8 px-2.5 md:px-4 w-full md:w-md mx-auto">
        <InputGroup>
            <InputText v-model="orderId" placeholder="Nhập vào mã đơn hàng của bạn" />
            <Button label="Tìm kiếm" icon="pi pi-search" @click="onSearch"></Button>
        </InputGroup>
        <Message v-if="orderError" severity="error" variant="simple" size="small">{{ orderError }}</Message>
    </div>
    <div class="mt-5 px-2.5 md:px-4 w-full mx-auto text-center">
        <div v-if="loading"></div>
        <Message v-else-if="error" severity="error">{{ error }}</Message>
        <div v-else class="pb-8">
            <div class="flex border border-[var(--p-content-border-color)] rounded-md bg-[var(--p-content-background)]">
                <div class="pl-2 md:pl-4 py-2 w-6/12 text-sm md:text-base">
                    <div class="flex flex-col gap-2 text-left">
                        <p class="font-semibold">Đơn hàng</p>
                        <div class="grid grid-cols-2 gap-1 md:gap-2 text-xs md:text-sm items-center">
                            <p>Order #:</p>
                            <p>{{ order.id }}</p>
                            <p>Thời gian:</p>
                            <p>{{ formatTime(order.created_at) }}</p>
                            <p>Thành tiền:</p>
                            <p>{{ order.total }} <span class="italic">(có thể gồm phí ship)</span></p>
                            <p>Trạng thái:</p>
                            <Message severity="info" size="small" variant="simple">
                                {{ formatStatus(order.status) }}
                            </Message>
                        </div>
                    </div>
                </div>
                <Divider layout="vertical" />
                <div class="pr-2 md:pr-4 py-2 w-6/12 text-sm md:text-base text-left">
                    <div class="flex flex-col gap-1 md:gap-2">
                        <p class="font-semibold">Người nhận</p>
                        <div class="flex flex-col text-sm gap-1 md:gap-2">
                            <p><i class="pi pi-user text-xs md:text-sm mr-1 md:mr-3"></i>{{ order.name }}</p>
                            <p><i class="pi pi-phone text-xs md:text-sm mr-1 md:mr-3"></i>{{ order.phone }}</p>
                            <p><i class="pi pi-map-marker text-xs md:text-sm mr-1 md:mr-3"></i>{{ order.address }}</p>
                            <p><i class="pi pi-pen-to-square text-xs md:text-sm mr-1 md:mr-3"></i>{{ order.note }}</p>
                        </div>
                    </div>
                </div>
            </div>
            <h4 class="font-semibold my-4 md:my-5 text-left">Món ăn</h4>
            <div
                v-for="dish in order.dishes"
                class="border-b border-[var(--p-content-border-color)] py-2.5 grid grid-cols-8 items-center text-left"
            >
                <img
                    src="https://placehold.co/150x100.png?text=Dish"
                    :alt="dish.name"
                    class="object-cover col-span-2 md:col-span-1 m-auto"
                />
                <h4 class="font-bold col-span-5 md:col-span-6 col-start-4 md:col-start-3">{{ dish.name }}</h4>
            </div>
        </div>
    </div>
</template>
