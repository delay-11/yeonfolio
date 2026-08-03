<template>
    <section class="project-section" id="projects">
        <h2 class="text-h4 font-weight-bold mb-6 d-flex align-center">
            <span class="mr-2">📁</span>
            Projects
        </h2>

        <v-card class="pa-6 skill-group-card" elevation="2" hover @click="goPersonal">
            <div class="text-subtitle-1 font-weight-bold mb-2">
                Personal Projects
            </div>
            <div class="text-body-2 mb-4">
                UI 디자인, 영상, 웹 개발 등
                직접 진행한 다양한 개인 작업 모음
            </div>

            <div class="mb-4">
                <v-chip size="small" class="mr-2 mb-2" variant="outlined">
                    Design · Video · Web
                </v-chip>
            </div>

            <div class="d-flex justify-end">
                <v-btn color="#4b4fe0" variant="flat" rounded="pill">
                    개인 프로젝트 보러가기
                </v-btn>
            </div>
        </v-card>
    </section>
</template>


<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const goPersonal = () => router.push("/personal");
</script>


<style scoped>
/* 섹션 타이틀 - SUITE-Bold 적용 */
.project-section h2 {
    font-family: "SUITE-Bold", sans-serif;
}

/* 섹션 외 본문 폰트 - SUITE-Regular */
.project-section .text-subtitle-1,
.project-section .text-body-2,
.project-section .v-chip,
.project-section .v-btn {
    font-family: "SUITE-Regular", sans-serif;
}

.skill-group-card {
    position: relative;
    border-radius: 18px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
    transition: border-color 0.25s ease, box-shadow 0.25s ease;
    background: #fff;
}
</style>
