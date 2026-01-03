<template>
    <v-container class="work-projects-section">
        <!-- 타이틀 -->
        <h2 class="text-h5 font-weight-bold mb-6">📂 Work Projects</h2>

        <!-- ================= 카테고리 토글 ================= -->
        <div class="category-toggle mb-8">
            <button v-for="category in categories" :key="category.value" type="button" class="category-pill"
                :class="{ 'category-pill--active': selectedCategory === category.value }"
                @click="selectedCategory = category.value">
                {{ category.label }}
            </button>
        </div>

        <!-- ================= 배너 카테고리 전용 멀티 슬라이더 ================= -->
        <div v-if="selectedCategory === 'banner' && bannerGroups.length" class="mb-8">
            <div v-for="group in bannerGroups" :key="group.key" class="mb-8">
                <!-- 그룹 라벨 -->
                <div class="banner-group-header">
                    <span class="banner-label">{{ group.label }}</span>
                </div>

                <v-sheet class="banner-slider" rounded="lg" elevation="2">
                    <v-window v-model="bannerIndexes[group.key]" show-arrows>
                        <v-window-item v-for="(slide, i) in group.slides" :key="i" :value="i">
                            <v-img :src="resolveImage(slide.image)" :alt="slide.title" class="banner-image"
                                :class="`banner-image--${group.key}`" cover>
                                <!-- 텍스트 오버레이 (CSS에서 숨김 처리됨) -->
                                <div class="banner-caption">
                                    <div class="banner-title">{{ slide.title }}</div>
                                    <div class="banner-desc">{{ slide.description }}</div>
                                </div>
                            </v-img>
                        </v-window-item>
                    </v-window>

                    <!-- 인디케이터 -->
                    <div class="banner-dots">
                        <button v-for="(_, i) in group.slides" :key="i" type="button" class="slider-dot"
                            :class="{ 'slider-dot--active': bannerIndexes[group.key] === i }"
                            @click="bannerIndexes[group.key] = i" />
                    </div>
                </v-sheet>
            </div>
        </div>

        <!-- ================= Masonry 레이아웃 ================= -->
        <div v-if="masonryProjects.length" class="projects-masonry">
            <div v-for="(project, index) in masonryProjects" :key="index" class="masonry-item"
                :class="['type-' + project.type, { 'photo-only': isPhotoOnlyCategory }]">
                <!-- 이미지 -->
                <v-img :src="resolveImage(project.image)" :alt="project.title" class="masonry-image"
                    :class="{ 'masonry-image--photo-only': isPhotoOnlyCategory }" cover />

                <!-- 사진/마케팅 전용 호버 오버레이 -->
                <div v-if="isPhotoOnlyCategory" class="masonry-hover-overlay">
                    <div class="overlay-text">{{ project.description }}</div>
                </div>

                <!-- 그 외 카테고리: 정보 출력 -->
                <div v-else class="masonry-info">
                    <div class="masonry-title">{{ project.title }}</div>
                    <div class="masonry-desc">{{ project.description }}</div>

                    <div class="masonry-meta">
                        <span v-if="project.role">{{ project.role }}</span>
                        <span v-if="project.role && (project.date || project.year)"> · </span>
                        <span v-if="project.date">{{ project.year }}</span>
                    </div>

                    <div v-if="project.tags?.length" class="masonry-tags">
                        <span v-for="(tag, tIndex) in project.tags" :key="tIndex" class="masonry-tag">
                            {{ tag }}
                        </span>
                    </div>
                </div>
            </div>
        </div>

        <!-- ================= 결과 없음 안내 ================= -->
        <div v-if="selectedCategory !== 'banner' && masonryProjects.length === 0"
            class="text-body-2 text-center py-10 text-grey-darken-1">
            해당 카테고리에 등록된 작업이 아직 없어요
        </div>
    </v-container>
</template>

<script>
// data/index.js에서 합쳐진 workProjects를 가져옴
import { workProjects } from "@/data";

export default {
    name: "WorkProjects",

    data() {
        return {
            categories: [
                { value: "all", label: "전체" },
                { value: "banner", label: "배너" },
                { value: "photo", label: "제품 사진" },
                { value: "detail", label: "상세페이지" },
                { value: "marketing", label: "마케팅" },
            ],
            selectedCategory: "all",
            bannerIndexes: {},
            projects: workProjects,
        };
    },

    computed: {
        // photo/marketing 은 카드 정보 숨기고 오버레이만
        isPhotoOnlyCategory() {
            return this.selectedCategory === "photo" || this.selectedCategory === "marketing";
        },

        // 정렬 우선순위
        sortedProjects() {
            const TYPE_PRIORITY = {
                banner: 1,
                photo: 2,
                detail: 3,
                marketing: 4,
            };

            const toTime = (p) => {
                if (!p?.date) return 0;
                const t = Date.parse(p.date);
                return Number.isNaN(t) ? 0 : t;
            };

            return [...this.projects].sort((a, b) => {
                const dateDiff = toTime(a) - toTime(b);
                if (dateDiff !== 0) return dateDiff;

                const orderDiff = (a.order ?? 0) - (b.order ?? 0);
                if (orderDiff !== 0) return orderDiff;

                const typeDiff = (TYPE_PRIORITY[a.type] ?? 999) - (TYPE_PRIORITY[b.type] ?? 999);
                if (typeDiff !== 0) return typeDiff;

                return String(a.title || "").localeCompare(String(b.title || ""));
            });
        },



        masonryProjects() {
            // banner 탭에서는 masonry 숨김
            if (this.selectedCategory === "banner") return [];

            // 전체(all) 탭에서는 banner 포함해서 전부 보여줌
            if (this.selectedCategory === "all") {
                return this.sortedProjects;
            }

            return this.sortedProjects.filter((p) => p.type === this.selectedCategory);
        },

        // 배너 슬라이더 그룹
        bannerGroups() {
            const bannerProjects = this.sortedProjects.filter((p) => p.type === "banner");

            const promotionSlides = bannerProjects.filter((p) => (p.image || "").startsWith("promo ("));
            const mainSlides = bannerProjects.filter((p) => (p.image || "").startsWith("main ("));
            const freeSlides = bannerProjects.filter((p) => (p.image || "").startsWith("free ("));

            return [
                { key: "promotion", label: "프로모션", slides: promotionSlides },
                { key: "main", label: "상단 이미지", slides: mainSlides },
                { key: "free", label: "자유 배너", slides: freeSlides },
            ].filter((g) => g.slides.length > 0);
        },
    },

    watch: {
        // bannerGroups가 변하면 v-window 인덱스 상태를 안전하게 유지
        bannerGroups: {
            immediate: true,
            handler(newGroups) {
                const nextKeys = newGroups.map((g) => g.key);

                newGroups.forEach((g) => {
                    if (this.bannerIndexes[g.key] == null) this.bannerIndexes[g.key] = 0;
                });

                Object.keys(this.bannerIndexes).forEach((key) => {
                    if (!nextKeys.includes(key)) delete this.bannerIndexes[key];
                });
            },
        },
    },

    mounted() {
        window.scrollTo({ top: 0, behavior: "auto" });
    },

    methods: {
        resolveImage(fileName) {
            if (!fileName) return "";

            const rawBase = import.meta.env.BASE_URL || "/";
            const base = rawBase.endsWith("/") ? rawBase.slice(0, -1) : rawBase;

            return `${base}/image/work/${fileName}`;
        },
    },
};
</script>

<style scoped>
/* ================= 폰트 ================= */
.work-projects-section h2 {
    font-family: "SUITE-Bold", sans-serif;
}

.work-projects-section p,
.work-projects-section div {
    font-family: "SUITE-Regular", sans-serif;
}

/* ================= 카테고리 토글 ================= */
.category-toggle {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

.category-pill {
    border-radius: 9999px;
    border: 1px solid #d0d4e4;
    padding: 6px 14px;
    background-color: #ffffff;
    font-size: 0.85rem;
    cursor: pointer;
    transition: background-color 0.15s ease, color 0.15s ease, border-color 0.15s ease,
        transform 0.1s ease;
}

.category-pill:hover {
    transform: translateY(-1px);
    border-color: #4f5d75;
}

.category-pill--active {
    background-color: #4f5d75;
    color: #ffffff;
    border-color: #4f5d75;
}

/* ================= 배너 그룹 헤더 ================= */
.banner-group-header {
    margin-bottom: 6px;
    padding-left: 4px;
}

.banner-label {
    font-size: 0.8rem;
    color: #6b7280;
}

/* ================= 배너 슬라이더 ================= */
.banner-slider {
    padding: 0 !important;
    border-radius: 20px;
    overflow: hidden;
    position: relative;
}

/* ================= 배너 이미지 ================= */
.banner-image {
    width: 100%;
    object-fit: contain;
    background-color: #ffffff;
}

/* 실제 이미지 해상도 기준 비율 적용 */
.banner-image--promotion {
    aspect-ratio: 1920 / 400;
}

.banner-image--main {
    aspect-ratio: 1280 / 400;
}

.banner-image--free {
    aspect-ratio: 1280 / 200;
}

/* 텍스트 오버레이 */
.banner-caption {
    position: absolute;
    left: 32px;
    bottom: 28px;
    max-width: 60%;
    color: #ffffff;
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
}

.banner-title {
    font-size: 1.3rem;
    font-weight: 700;
    margin-bottom: 4px;
}

.banner-desc {
    font-size: 0.9rem;
    opacity: 0.9;
}

/* 슬라이더에서 캡션 숨김 */
.banner-slider .banner-caption {
    display: none !important;
}

/* 인디케이터 */
.banner-dots {
    position: absolute;
    left: 50%;
    bottom: 12px;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
}

.slider-dot {
    width: 6px;
    height: 6px;
    border-radius: 999px;
    border: none;
    margin: 0 3px;
    padding: 0;
    background-color: rgba(255, 255, 255, 0.4);
    cursor: pointer;
}

.slider-dot--active {
    width: 14px;
    background-color: rgba(255, 255, 255, 0.9);
}

/* ================= Masonry 레이아웃 ================= */
.projects-masonry {
    column-count: 2;
    column-gap: 16px;
}

@media (min-width: 960px) {
    .projects-masonry {
        column-count: 3;
    }
}

@media (min-width: 1280px) {
    .projects-masonry {
        column-count: 4;
    }
}

.masonry-item {
    break-inside: avoid;
    margin-bottom: 16px;
    border-radius: 16px;
    overflow: hidden;
    background-color: #f7f7fa;
    box-shadow: 0 2px 6px rgba(15, 23, 42, 0.08);
    display: flex;
    flex-direction: column;
    position: relative;
}

.masonry-image {
    width: 100%;
    display: block;
}

/* 텍스트 영역 */
.masonry-info {
    padding: 10px 12px 12px;
}

.masonry-title {
    font-size: 0.9rem;
    font-weight: 700;
    margin-bottom: 2px;
}

.masonry-desc {
    font-size: 0.8rem;
    color: #4b5563;
    margin-bottom: 6px;
}

.masonry-meta {
    font-size: 0.75rem;
    color: #6b7280;
    margin-bottom: 4px;
}

.masonry-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
}

.masonry-tag {
    font-size: 0.7rem;
    padding: 2px 6px;
    border-radius: 999px;
    background-color: #ffffff;
    border: 1px solid #e5e7eb;
}

/* ================= 제품 사진/마케팅 전용 ================= */
.masonry-item.photo-only {
    background-color: transparent;
    box-shadow: none;
    border-radius: 16px;
    overflow: hidden;
}

.masonry-image--photo-only {
    border-radius: 16px;
    transition: transform 0.25s ease;
}

.masonry-item.photo-only:hover .masonry-image--photo-only {
    transform: scale(1.08);
}

/* 호버 오버레이 */
.masonry-hover-overlay {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: flex-end;
    justify-content: flex-start;
    padding: 0 12px 10px;
    pointer-events: none;
}

.overlay-text {
    background-color: rgba(0, 0, 0, 0.55);
    color: #fff;
    font-size: 0.8rem;
    padding: 4px 10px;
    border-radius: 999px;
    max-width: 90%;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    opacity: 0;
    transform: translateY(6px);
    transition: opacity 0.25s ease, transform 0.25s ease;
}

.masonry-item.photo-only:hover .overlay-text {
    opacity: 1;
    transform: translateY(0);
}
</style>
