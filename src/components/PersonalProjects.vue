<template>
    <v-container class="personal-projects-section">
        <!-- 타이틀 -->
        <h2 class="text-h5 font-weight-bold mb-6">📂 Personal Projects</h2>

        <!-- ================= 카테고리 토글 ================= -->
        <div class="category-toggle mb-8">
            <button type="button" class="category-pill" :class="{ 'category-pill--active': selectedCategory === 'all' }"
                @click="selectedCategory = 'all'">
                전체
            </button>

            <button type="button" class="category-pill"
                :class="{ 'category-pill--active': selectedCategory === 'design' }"
                @click="selectedCategory = 'design'">
                디자인
            </button>

            <button type="button" class="category-pill"
                :class="{ 'category-pill--active': selectedCategory === 'video' }" @click="selectedCategory = 'video'">
                영상
            </button>

            <button type="button" class="category-pill" :class="{ 'category-pill--active': selectedCategory === 'web' }"
                @click="selectedCategory = 'web'">
                웹개발
            </button>
        </div>

        <!-- ================= Masonry 레이아웃 ================= -->
        <div v-if="filteredProjects.length" class="projects-masonry">
            <div v-for="(project, index) in filteredProjects" :key="index" class="masonry-item"
                :class="'type-' + (Array.isArray(project.category) ? project.category[0] : project.category)">
                <!-- 썸네일 이미지 -->
                <v-img :src="project.image" :alt="project.title" class="masonry-image" cover />

                <!-- 카드 내용 -->
                <div class="masonry-info">
                    <!-- 역할/타입 -->
                    <div v-if="project.type" class="masonry-type">
                        {{ project.type }}
                    </div>

                    <!-- 타이틀 -->
                    <div class="masonry-title">
                        {{ project.title }}
                    </div>

                    <!-- 설명 -->
                    <div class="masonry-desc">
                        {{ project.description }}
                    </div>

                    <!-- 사용 툴 -->
                    <div v-if="project.tools && project.tools.length" class="masonry-tools">
                        <span v-for="(tool, i) in project.tools" :key="i" class="masonry-tag"
                            :style="{ borderColor: tool.color }">
                            {{ tool.name }}
                        </span>
                    </div>

                    <!-- 링크/버튼 -->
                    <div class="masonry-links">
                        <v-btn v-if="project.github" :href="project.github" target="_blank" class="masonry-btn">
                            💻 홈페이지
                        </v-btn>

                        <v-btn v-if="project.pdf" :href="project.pdf" target="_blank" class="masonry-btn">
                            📄 문서
                        </v-btn>

                        <v-btn v-if="project.video || project.youtube" class="masonry-btn"
                            @click="openVideoModal(project)">
                            🎥 영상
                        </v-btn>
                    </div>
                </div>
            </div>
        </div>

        <!-- 필터 결과 없을 때 -->
        <div v-else class="text-body-2 text-center py-10 text-grey-darken-1">
            해당 카테고리에 등록된 작업이 아직 없어요.
        </div>

        <!-- ================= 영상 모달 ================= -->
        <v-dialog v-model="videoDialog" max-width="800px">
            <v-card>
                <v-card-title class="text-h6 mt-4">
                    🎥 {{ selectedTitle }} - 영상 보기
                </v-card-title>

                <v-card-text>
                    <!-- 로컬 mp4 영상 -->
                    <video v-if="selectedVideo && isLocalVideo(selectedVideo)" :src="selectedVideo" controls autoplay
                        style="width: 100%; height: auto"></video>

                    <!-- 유튜브 영상 -->
                    <iframe v-else-if="selectedVideo" :src="getYoutubeEmbedUrl(selectedVideo)" frameborder="0"
                        allowfullscreen style="width: 100%; height: 450px"></iframe>
                </v-card-text>

                <v-card-actions>
                    <v-spacer />
                    <v-btn text @click="videoDialog = false">닫기</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
export default {
    name: 'PersonalProjects',

    data() {
        const base = import.meta.env.BASE_URL;

        return {
            // 선택된 프로젝트 카테고리
            selectedCategory: 'all',

            // 영상 모달 상태
            videoDialog: false,
            selectedVideo: null,
            selectedTitle: '',

            // 이미지/영상 base 경로
            base,

            // 프로젝트 목록
            projects: [
                {
                    title: 'PLANLOG',
                    description: '할 일 관리에 최적화된 UI 디자인',
                    type: '기획 · UI · 디자인',
                    tools: [{ name: 'Photoshop', color: '#31A8FF' }],
                    category: 'design',
                    image: base + 'image/planlog.png',
                    github: 'https://delay-11.github.io/planlog-ui-design/',
                },
                {
                    title: '그대안의블루',
                    description: '청년 우울증을 주제로 한 카드뉴스 콘텐츠',
                    type: '특정 카드 디자인',
                    tools: [{ name: 'Illustrator', color: '#FF9A00' }],
                    category: 'design',
                    image: base + 'image/the_blue_inside_you.png',
                    pdf: base + 'image/the_blue_inside_you.pdf',
                },
                {
                    title: '더글로리 Fanmade MV',
                    description:
                        '고통을 마주한 두 인물이 서로의 구원이 되어가는 여정을 감정선 중심으로 재구성한 뮤직비디오',
                    type: '디자인·전체 영상 컷편집',
                    tools: [{ name: 'After Effects', color: '#9999FF' }],
                    category: 'video',
                    image: base + 'image/theglory.png',
                    youtube: 'https://youtu.be/_hN_94FQ_dk',
                },
                {
                    title: 'SUBWAY',
                    description: '브랜드의 신선함을 시각적으로 표현한 광고 영상',
                    type: '일러스트 · 일부 영상 제작',
                    tools: [
                        { name: 'Illustrator', color: '#FF9A00' },
                        { name: 'After Effects', color: '#9999FF' },
                        { name: 'HTML', color: '#E34F26' },
                        { name: 'CSS', color: '#1572B6' },
                    ],
                    category: ['design', 'video'],
                    image: base + 'image/subway.png',
                    video: base + 'video/subway.mp4',
                    github: 'https://delay-11.github.io/subway-brand-design/',
                },
                {
                    title: '식품안전나라',
                    description: '식품안전정보원 공모전에 출품한 공식 홍보 영상',
                    type: '일러스트 · 일부 영상 제작',
                    tools: [
                        { name: 'Illustrator', color: '#FF9A00' },
                        { name: 'After Effects', color: '#9999FF' },
                    ],
                    category: 'video',
                    image: base + 'image/food.png',
                    video: base + 'video/food.mp4',
                },
                {
                    title: 'Attitude - 키네틱 타이포그래피',
                    description: '가사의 흐름을 시각화한 키네틱 타이포 모션 영상',
                    type: '일부 가사 구간 제작',
                    tools: [{ name: 'After Effects', color: '#9999FF' }],
                    category: 'video',
                    image: base + 'image/attitude.png',
                    video: base + 'video/attitude.mp4',
                },
                {
                    title: 'addct',
                    description: '기존 홈페이지를 나만의 스타일로 리디자인',
                    type: '기획 · 디자인 · 제작',
                    tools: [
                        { name: 'HTML', color: '#E34F26' },
                        { name: 'CSS', color: '#1572B6' },
                        { name: 'Bootstrap', color: '#7952B3' },
                    ],
                    category: 'web',
                    image: base + 'image/addct.png',
                    github: 'https://delay-11.github.io/addct-redesign/',
                },
                {
                    title: 'Antenna',
                    description: '음악 레이블의 정체성을 시각적으로 재해석한 페이지',
                    type: '특정 페이지 제작',
                    tools: [
                        { name: 'HTML', color: '#E34F26' },
                        { name: 'CSS', color: '#1572B6' },
                        { name: 'SCSS', color: '#CD6799' },
                    ],
                    category: 'web',
                    image: base + 'image/antenna.png',
                    github: 'https://delay-11.github.io/antenna-redesign/',
                },
                {
                    title: '미드림성형외과',
                    description: '의료기관 홈페이지를 현대적 스타일로 리디자인',
                    type: '특정 페이지 제작',
                    tools: [
                        { name: 'Vue', color: '#42B883' },
                        { name: 'CSS', color: '#1572B6' },
                        { name: 'SCSS', color: '#CD6799' },
                        { name: 'Figma', color: '#A259FF' },
                    ],
                    category: 'web',
                    image: base + 'image/meedream.png',
                    github: 'https://delay-11.github.io/meedream-redesign/',
                },
                {
                    title: '10CM 5.0 떡메모지',
                    description:
                        '공식 일러스트를 굿즈 형태로 변환한 90×90mm 떡메모지 (비상업적·비공식 팬메이드)',
                    type: '굿즈 기획 · 제작',
                    tools: [{ name: 'Illustrator', color: '#FF9A00' }],
                    category: 'design',
                    image: base + 'image/10cm_memo.png',
                    pdf: base + 'image/10cm_memo.pdf',
                },
                {
                    title: '공부 기록 사이트',
                    description: '공부한 내용을 기록하고 웹사이트로 구현한 홈페이지',
                    type: '개인 학습 기록 · 제작',
                    tools: [
                        { name: 'HTML', color: '#E34F26' },
                        { name: 'CSS', color: '#1572B6' },
                        { name: 'Bootstrap', color: '#7952B3' },
                    ],
                    category: 'web',
                    image: base + 'image/devsign-notes.png',
                    github: 'https://delay-11.github.io/devsign-notes/',
                },
            ],
        };
    },

    computed: {
        // 카테고리 필터링
        filteredProjects() {
            if (this.selectedCategory === 'all') return this.projects;

            return this.projects.filter((project) => {
                if (Array.isArray(project.category)) {
                    return project.category.includes(this.selectedCategory);
                }
                return project.category === this.selectedCategory;
            });
        },
    },

    mounted() {
        // 개인 작업 섹션 진입 시 항상 최상단에서 시작
        window.scrollTo({
            top: 0,
            behavior: 'auto',
        });
    },

    methods: {
        // 영상 모달 오픈
        openVideoModal(project) {
            this.selectedVideo = project.video || project.youtube;
            this.selectedTitle = project.title;
            this.videoDialog = true;
        },

        // 로컬 mp4 여부 체크
        isLocalVideo(link) {
            return link && link.endsWith('.mp4');
        },

        // 유튜브 링크를 embed URL로 변환
        getYoutubeEmbedUrl(link) {
            const videoId = link.split('youtu.be/')[1]?.split('?')[0];
            return `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`;
        },
    },
};
</script>

<style scoped>
/* 섹션 타이틀 - SUITE-Bold 적용 */
.personal-projects-section h2 {
    font-family: 'SUITE-Bold', sans-serif;
}

/* 섹션 내 텍스트 - SUITE-Regular */
.personal-projects-section p,
.personal-projects-section .v-btn,
.personal-projects-section .v-card-title,
.personal-projects-section .v-card-text,
.personal-projects-section .v-card-actions {
    font-family: 'SUITE-Regular', sans-serif;
}

/* ================= 카테고리 pill ================= */
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
    transition:
        background-color 0.15s ease,
        color 0.15s ease,
        border-color 0.15s ease,
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

/* ================= Masonry 레이아웃 ================= */
.projects-masonry {
    column-count: 2;
    column-gap: 16px;
}

/* 넓은 화면에서 컬럼 수 증가 */
@media (min-width: 960px) {
    .projects-masonry {
        column-count: 3;
    }
}

/* Masonry 아이템 */
.masonry-item {
    break-inside: avoid;
    margin-bottom: 16px;
    border-radius: 16px;
    overflow: hidden;
    background-color: #f7f7fa;
    box-shadow: 0 2px 6px rgba(15, 23, 42, 0.08);
    padding: 10px;
}

/* 썸네일 */
.masonry-image {
    width: 100%;
    display: block;
    border-radius: 12px;
}

/* 텍스트 영역 */
.masonry-info {
    padding: 12px 10px 12px;
}

.masonry-type {
    font-size: 0.75rem;
    color: #6b7280;
    margin-bottom: 4px;
}

.masonry-title {
    font-size: 0.9rem;
    font-weight: 700;
    margin-bottom: 4px;
}

.masonry-desc {
    font-size: 0.8rem;
    color: #4b5563;
    margin-bottom: 6px;
}

/* 툴/태그 */
.masonry-tools {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
    margin-bottom: 6px;
}

.masonry-tag {
    font-size: 0.7rem;
    padding: 2px 6px;
    border-radius: 999px;
    background-color: #ffffff;
    border: 1px solid #e5e7eb;
}

/* 링크 영역 */
.masonry-links {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
    margin-top: 4px;
}

.masonry-btn {
    border-radius: 999px !important;
    border: 1px solid #d0d4e4 !important;
    padding: 4px 12px !important;
    font-size: 0.78rem !important;
    background-color: white !important;
    color: #4f5d75 !important;
    transition: 0.15s ease;
    text-transform: none;
}

.masonry-btn:hover {
    transform: translateY(-1px);
    border-color: #4f5d75 !important;
    background-color: #4f5d75 !important;
    color: white !important;
}
</style>
