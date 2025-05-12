<script setup>
import { shallowRef, ref } from "vue";
import About from "./About.vue";
import Contact from "./Contact.vue";
import Media from "./Media.vue";
import Review from "./Review.vue";
import { useToast } from "primevue/usetoast";
import { useRouter } from "vue-router";

const router = useRouter();
const toast = useToast();

const tabs = shallowRef([
    { title: "Về Xan", content: About, value: 0 },
    { title: "Địa chỉ", content: Contact, value: 1 },
    { title: "Hình ảnh", content: Media, value: 2 },
    { title: "Review", content: Review, value: 3 },
]);

const activatedTab = ref(0);

const items = [
    {
        label: "Messenger",
        icon: "pi pi-facebook",
        command: () => {
            window.location.href = "https://m.me/xanbuffet";
        },
    },
    {
        label: "Tiktok",
        icon: "pi pi-tiktok",
        command: () => {
            window.location.href = "https://www.tiktok.com/@xanbuffetcomnha35k";
        },
    },
    {
        label: "Zalo",
        icon: "pi pi-whatsapp",
        command: () => {
            if (isMobile()) window.location.href = "https://zalo.me/0927733111";
            else window.location.href = "https://chat.zalo.me/?phone=0927733111";
        },
    },
];

const like = () => {
    window.open("https://www.facebook.com/share/18kbeBg9CH", "_blank");
};
const message = () => {
    if (isMobile()) window.location.href = "https://zalo.me/0927733111";
    else window.location.href = "https://chat.zalo.me/?phone=0927733111";
};

const isMobile = () => {
    var check = false;
    (function (a) {
        if (
            /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
                a
            ) ||
            /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
                a.substr(0, 4)
            )
        )
            check = true;
    })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
};
</script>

<template>
    <div class="cover-photo z-0">
        <img
            class="md:hidden mx-auto aspect-video w-full h-auto object-cover bg-[var(--p-surface-50)]"
            src="/images/xan-cover-169.png"
            alt="Cover photo - Xan"
        />
        <img
            class="md:block hidden mx-auto w-full h-auto bg-[var(--p-surface-50)]"
            src="/images/xan-cover-large.png"
            alt="Cover photo - Xan"
        />
    </div>
    <div class="px-2 pb-3 md:px-4 bg-[var(--p-content-background)]">
        <div class="z-10 flex flex-col md:flex-row items-start md:items-end">
            <div class="relative">
                <img
                    class="logo aspect-square w-40 md:w-44 rounded-full border-2 border-[var(--p-primary-color)] -mt-16"
                    src="/images/xan-logo.jpg"
                    alt="Profile photo - Xan"
                />
                <Badge class="absolute bottom-3 right-2 rounded-full" value="24/7" severity="success"></Badge>
            </div>
            <div class="title mt-2 md:mt-6 md:mb-4 md:ml-5 grow">
                <span class="font-bold text-2xl md:text-4xl text-nowrap">Xan Buffet Cơm Nhà</span>
                <div class="mt-2 flex flex-row items-center md:flex-col-reverse md:items-start gap-2">
                    <AvatarGroup>
                        <Avatar image="/images/avatar-1.jpg" shape="circle" />
                        <Avatar image="/images/avatar-2.jpg" shape="circle" />
                        <Avatar image="/images/avatar-3.jpg" shape="circle" />
                        <Avatar label="+2" shape="circle" />
                    </AvatarGroup>
                    <p class="text-[var(--p-surface-400)]">Ăn thả ga chỉ với 35k</p>
                </div>
            </div>
            <div
                class="action-btn md:mb-4 mt-4 md:mt-0 w-full md:w-fit grid grid-cols-9 gap-x-2.5 md:flex md:justify-end"
            >
                <Button
                    @click="like()"
                    label="Thích"
                    severity="primary"
                    icon="pi pi-thumbs-up-fill"
                    badge="35k"
                    variant="outlined"
                    class="fb-like mr-0 md:mr-4 col-span-3"
                />
                <SplitButton
                    @click="message()"
                    :model="items"
                    class="col-start-4 col-span-3 mr-0 md:mr-4"
                    label="Nhắn tin"
                    severity="info"
                    icon="pi pi-whatsapp"
                />
                <Button
                    @click="router.push('/order')"
                    class="col-span-3"
                    severity="success"
                    label="Đặt hàng"
                    icon="pi pi-shopping-cart"
                />
            </div>
        </div>
    </div>
    <div class="mt-3">
        <Tabs :value="activatedTab">
            <TabList>
                <Tab v-for="tab in tabs" :key="tab.title" :value="tab.value">{{ tab.title }}</Tab>
            </TabList>
            <TabPanels>
                <TabPanel v-for="tab in tabs" :key="tab.value" :value="tab.value">
                    <component :is="tab.content" />
                </TabPanel>
            </TabPanels>
        </Tabs>
    </div>
</template>
