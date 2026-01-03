<template>
    <section class="about-section mb-10">
        <h2 class="text-h4 font-weight-bold mb-6">👩🏻‍💻 About Me</h2>

        <v-container>
            <v-row class="about-wrapper" align="center">

                <!-- 왼쪽: 사진만 -->
                <v-col cols="12" md="6" class="text-center mb-6 mb-md-0">
                    <v-img src="/image/memoji.png" class="profile-image" alt="지연 미모티콘" contain />
                </v-col>

                <!-- 오른쪽: 소개 + 프로필 -->
                <v-col cols="12" md="6" class="about-text-col">

                    <div class="about-text-group">
                        <!-- 소개 한 줄 -->
                        <p class="intro-line">
                            디자인과 개발을 함께 배우고 있는 웹 디자이너
                            <strong class="accent-name">지연</strong>입니다 🐧
                        </p>

                        <!-- 프로필 -->
                        <div class="profile-block">
                            <ul class="profile-list">
                                <li class="profile-item">
                                    <v-icon color="#2C3E50" size="18" class="mr-2">
                                        mdi-checkbox-marked-circle-outline
                                    </v-icon>
                                    <span>
                                        <strong class="profile-accent">UI 설계와 시각 요소 제작</strong>을 중심으로 작업하고 있어요
                                    </span>
                                </li>

                                <li class="profile-item">
                                    <v-icon color="#2C3E50" size="18" class="mr-2">
                                        mdi-checkbox-marked-circle-outline
                                    </v-icon>
                                    <span>
                                        <strong class="profile-accent">홍보 이미지·카드형 콘텐츠·기본 영상 편집</strong>을 다루고 있어요
                                    </span>
                                </li>

                                <li class="profile-item">
                                    <v-icon color="#2C3E50" size="18" class="mr-2">
                                        mdi-checkbox-marked-circle-outline
                                    </v-icon>
                                    <span>
                                        <strong class="profile-accent">시맨틱 마크업·반응형 레이아웃</strong>으로 웹을 구현하고 있어요
                                    </span>
                                </li>

                                <li class="profile-item">
                                    <v-icon color="#2C3E50" size="18" class="mr-2">
                                        mdi-checkbox-marked-circle-outline
                                    </v-icon>
                                    <span>
                                        Vue로 <strong class="profile-accent">프론트엔드 기초</strong>를 쌓고, React·Python도 배우고 있어요
                                    </span>
                                </li>

                                <li class="profile-item">
                                    <v-icon color="#2C3E50" size="18" class="mr-2">
                                        mdi-checkbox-marked-circle-outline
                                    </v-icon>
                                    <span>
                                        작업 과정에서 <strong class="profile-accent">정돈·디테일·일관성</strong>을 중요하게 생각해요
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>

                </v-col>
            </v-row>
        </v-container>
    </section>
</template>

<script>
export default {
    name: "AboutSection",
};
</script>

<style scoped>
/* ============= 타이틀, 폰트 ============= */
.about-section h2 {
    font-family: "SUITE-Bold", sans-serif;
}

.intro-line,
.profile-item span {
    font-family: "SUITE-Regular", sans-serif;
}

/* 이름 강조 */
.accent-name {
    color: #E29500;
}

.profile-accent {
    color: #4F5D75;
}

/* ============= 기본 레이아웃 ============= */
.about-wrapper {
    flex-wrap: wrap;
    align-items: center;
}

/* 오른쪽 텍스트 영역 컨테이너 */
.about-text-col {
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-width: 520px;
    margin: 0 auto;
    padding-left: 8px;
}

.about-text-group {
    max-width: 480px;
    width: 100%;
    margin: 0 auto;
    text-align: left;
}

/* 왼쪽 이미지 */
.profile-image {
    max-width: 220px;
    margin: 0 auto;
}

/* 소개 한 줄 문장 */
.intro-line {
    font-size: 1rem;
    line-height: 1.6;
    color: #2c3e50;
    margin-bottom: 16px;
    text-align: left;
}

/* 프로필 전체 블록 */
.profile-block {
    width: 100%;
}

/* 프로필 리스트 */
.profile-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.profile-item {
    display: flex;
    align-items: flex-start;
    font-size: 0.92rem;
    line-height: 1.6;
}

/* ============= 모바일 ============= */
@media (max-width: 959px) {
    .about-text-col {
        padding-left: 0;
        margin: 0 auto;
        align-items: center;
        text-align: center;
    }

    .profile-image {
        max-width: 150px;
        margin-bottom: 12px;
    }

    .about-text-group {
        max-width: 350px;
        margin: 0 auto;
        text-align: center;
    }

    .intro-line {
        font-size: 0.85rem;
        margin-bottom: 14px;
        text-align: left;
    }

    .profile-list {
        align-items: flex-start;
    }

    .profile-item {
        width: 100%;
        text-align: left;
        font-size: 0.8rem;
    }
}
</style>
