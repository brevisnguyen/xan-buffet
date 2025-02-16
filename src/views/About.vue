<script setup></script>

<template>
    <div class="post">
        <div class="avatar flex items-center">
            <Avatar size="large" class="border" image="/images/xan-logo.jpg" shape="circle" />
            <div class="ml-3">
                <h2 class="font-bold">Xan Buffet Cơm Nhà</h2>
                <p class="text-xs">7h</p>
            </div>
        </div>
        <div class="content mt-2">
            <p class="indent-4">
                “Là một đứa con trong gia đình Việt, Xan hiểu lắm giá trị của một bữa cơm ngon sau những giờ làm việc,
                học tập mệt nhoài. Đôi lúc cần gì nhiều đâu, chỉ cơm trắng canh rau, mà như được nạp 1000% năng lượng.
                Xan cơm nhà - Xan cơm bình dân - có thể chẳng là sơn hào hải vị, nhưng nó có thể là “vị nhà”, là “vị mẹ
                nấu”, là bữa cơm từ tấm bé theo ta, bình dị - đủ đầy”
            </p>
            <div class="grid grid-cols-2 grid-rows-2 gap-3 mt-3">
                <img class="aspect-square object-cover" src="/images/m-1.jpg" />
                <img class="aspect-square object-cover" src="/images/m-2.jpg" />
                <img class="aspect-square object-cover" src="/images/m-3.jpg" />
                <img class="aspect-square object-cover" src="/images/m-4.jpg" />
            </div>
        </div>
    </div>
    <Divider />
    <div class="post">
        <div class="avatar flex items-center">
            <Avatar size="large" class="border" image="/images/xan-logo.jpg" shape="circle" />
            <div class="ml-3">
                <h2 class="font-bold">Xan Buffet Cơm Nhà</h2>
                <p class="text-xs">16/2</p>
            </div>
        </div>
        <div class="content mt-2">
            <p class="">Hôm nay Xan cúng các cụ.</p>
            <div class="grid grid-cols-2 grid-rows-2 gap-2 mt-3">
                <img class="row-span-1 col-span-2 h-auto w-full object-cover aspect-video" src="/images/3/anh-1.jpg" />
                <img class="aspect-square object-cover" src="/images/3/anh-2.jpg" />
                <img class="aspect-square object-cover" src="/images/3/anh-3.jpg" />
            </div>
        </div>
    </div>
    <Divider />
    <div class="post">
        <div class="avatar flex items-center">
            <Avatar size="large" class="border" image="/images/xan-logo.jpg" shape="circle" />
            <div class="ml-3">
                <h2 class="font-bold">Xan Buffet Cơm Nhà</h2>
                <p class="text-xs">12h</p>
            </div>
        </div>
        <div class="content mt-2">
            <p class="">Chúng tớ Xan đã có biển hiệu rồi, quá ứng ý luôn.</p>
            <div class="grid grid-cols-2 grid-rows-2 gap-2 mt-3">
                <img class="row-span-2 col-span-1 h-full w-auto object-cover" src="/images/2/anh-1.jpg" />
                <img class="aspect-square object-cover" src="/images/2/anh-2.jpg" />
                <img class="aspect-square object-cover" src="/images/2/anh-3.jpg" />
            </div>
        </div>
    </div>
    <Divider />
    <div class="post">
        <div class="avatar flex items-center">
            <Avatar class="border" image="/images/xan-logo.jpg" shape="circle" />
            <div class="ml-3">
                <h2 class="font-bold">Xan Buffet Cơm Nhà</h2>
                <p class="text-xs">1 day ago</p>
            </div>
        </div>
        <div class="content mt-4">
            <p class="text-sm mb-2">
                Cùng xem Xan đã thay đổi như thế nào trong 14 ngày. Ảnh bên phải được chụp lúc 21/1 và ảnh bên phải là
                4/2.
            </p>
            <div>
                <ImageCompare class="aspect-[3/4] max-h-[800px] object-cover">
                    <template #left>
                        <img src="/images/1/anh-1.jpg" />
                    </template>
                    <template #right>
                        <img src="/images/1/anh-2.jpg" />
                    </template>
                </ImageCompare>
            </div>
        </div>
    </div>
</template>
