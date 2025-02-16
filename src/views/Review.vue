<script setup></script>

<template>
    <h1 class="my-3 font-bold text-xl">Những đánh giá về Xan</h1>
    <Panel class="mb-3">
        <template #header>
            <div class="flex items-center gap-2">
                <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" shape="circle" />
                <span class="font-bold">Thu Hiền</span>
            </div>
        </template>
        <template #footer>
            <div class="flex flex-wrap items-center justify-between gap-4">
                <Rating defaultValue="5" readonly />
                <span class="text-surface-500 dark:text-surface-400">Updated 2 hours ago</span>
            </div>
        </template>
        <p class="m-0">
            Hôm qua ghé thử buffet cơm ở đây, thật sự ấn tượng! Chỉ tầm 35k mà ăn no căng bụng luôn. Các món thay đổi
            liên tục, từ thịt kho trứng, rau xào đến gỏi, canh đủ cả. Đặc biệt thích món cà pháo với dưa cải muối, ăn
            kèm cơm nóng thì tuyệt cú mèo. Sẽ quay lại ủng hộ dài dài!
        </p>
    </Panel>
    <Panel class="mb-3">
        <template #header>
            <div class="flex items-center gap-2">
                <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/onyamalimba.png" shape="circle" />
                <span class="font-bold">Phương Phương Thảo</span>
            </div>
        </template>
        <template #footer>
            <div class="flex flex-wrap items-center justify-between gap-4">
                <Rating defaultValue="3" readonly />
                <span class="text-surface-500 dark:text-surface-400">Updated 8 hours ago</span>
            </div>
        </template>
        <p class="m-0">
            Mình hay đi làm về trễ, nhiều khi không kịp nấu ăn thì ghé quán này. Buffet cơm giá rẻ mà chất lượng ổn áp
            lắm. Đồ ăn lúc nào cũng tươi mới, không bị nguội hay khô như một số chỗ khác. Cô chú chủ quán dễ thương, còn
            hỏi thăm khách ăn có vừa miệng không nữa. Điểm cộng to đùng cho quán.
        </p>
    </Panel>
    <Panel>
        <template #header>
            <div class="flex items-center gap-2">
                <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/asiyajavayant.png" shape="circle" />
                <span class="font-bold">Tâm Trần</span>
            </div>
        </template>
        <template #footer>
            <div class="flex flex-wrap items-center justify-between gap-4">
                <Rating defaultValue="4" readonly />
                <span class="text-surface-500 dark:text-surface-400">Updated 2 days ago</span>
            </div>
        </template>
        <p class="m-0">
            Ăn buffet cơm ở đây cảm giác giống như được ăn cơm nhà vậy. Không gian đơn giản, sạch sẽ, món ăn dân dã
            nhưng rất ngon. Món nào cũng có vị đậm đà riêng, không cần thêm gia vị gì nhiều. Với mức giá chỉ hơn 30k mà
            ăn thoải mái thì quá hời rồi. Quán nằm hơi khuất tí nhưng đáng để thử
        </p>
    </Panel>
    <Panel>
        <template #header>
            <div class="flex items-center gap-2">
                <Avatar image="https://primefaces.org/cdn/primevue/images/organization/walter.jpg" shape="circle" />
                <span class="font-bold">Hieu Thứ 2</span>
            </div>
        </template>
        <template #footer>
            <div class="flex flex-wrap items-center justify-between gap-4">
                <Rating defaultValue="4" readonly />
                <span class="text-surface-500 dark:text-surface-400">Updated 4 days ago</span>
            </div>
        </template>
        <p class="m-0">
            Bữa trưa nay mình thử ghé quán này theo gợi ý của đồng nghiệp, thật sự bất ngờ luôn! Buffet cơm bình dân mà
            đầy đủ món mặn, món xào, món canh, thậm chí còn có cả trái cây tráng miệng nữa. Chén cơm trắng thơm dẻo, ăn
            kèm với cá chiên giòn tan thì thôi rồi... Ngon bổ rẻ, chắc chắn sẽ giới thiệu bạn bè ghé thử
        </p>
    </Panel>
</template>
