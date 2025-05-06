<script setup>
import { ref } from "vue";
import { useToast } from "primevue/usetoast";
import Header from "./partials/Header.vue";

const toast = useToast();
</script>

<template>
    <Header />
    <div class="">
        <Stepper>
            <StepList
                ><Step value="1">Header I</Step>
                <Step value="2">Header II</Step>
                <Step value="3">Header III</Step>
            </StepList>
        </Stepper>
    </div>
</template>
