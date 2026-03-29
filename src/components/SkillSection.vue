<template>
    <section class="skill-section mb-10">
        <h2 class="text-h4 font-weight-bold mb-6">🛠️ My Skills</h2>

        <!-- 역할/업무 기준 스킬 카드 그리드 -->
        <v-row dense>
            <v-col v-for="(group, index) in skillGroups" :key="index" cols="12" sm="6" md="6" class="mb-1">
                <v-card class="pa-6 h-100 skill-group-card" elevation="2" :style="{
                    '--card-accent-color': group.iconColor
                }">
                    <!-- 아이콘 + 타이틀 영역 -->
                    <div class="d-flex align-center mb-3">
                        <div class="icon-badge" :style="{ borderColor: group.iconColor + '33' }">
                            <v-icon :style="{ color: group.iconColor }" size="26">
                                {{ group.icon }}
                            </v-icon>
                        </div>
                        <h3 class="text-h6 font-weight-bold mb-0 ml-3 group-title">
                            {{ group.title }}
                        </h3>
                    </div>

                    <!-- 설명 -->
                    <p class="text-body-2 mb-4 group-desc">
                        {{ group.desc }}
                    </p>

                    <!-- 관련 스킬 칩 -->
                    <div class="d-flex flex-wrap">
                        <v-chip v-for="(skill, i) in group.skills" :key="i" class="ma-1 skill-chip" variant="outlined"
                            size="small" :style="{
                                borderColor: skill.colorCode,
                                color: skill.colorCode,
                            }">
                            {{ skill.name }}
                            <!-- 공부중 스킬 뱃지 -->
                            <span v-if="skill.learning" class="learning-label">
                                공부중
                            </span>
                        </v-chip>
                    </div>
                </v-card>
            </v-col>
        </v-row>
    </section>
</template>

<script>
export default {
    name: "SkillSection",
    data() {
        return {
            // 역할 기준 그룹화
            skillGroups: [
                {
                    title: "UI · 시각 디자인",
                    icon: "mdi-palette",
                    iconColor: "#A259FF",
                    desc:
                        "UI 화면을 정돈된 구조로 설계하고, 필요한 시각 요소들을 차분하게 제작",
                    skills: [
                        {
                            name: "Photoshop",
                            colorCode: "#31A8FF",
                        },
                        {
                            name: "Illustrator",
                            colorCode: "#FF9A00",
                        },
                        {
                            name: "Figma",
                            colorCode: "#A259FF",
                        },
                    ],
                },
                {
                    title: "영상 · 모션 그래픽",
                    icon: "mdi-movie-open",
                    iconColor: "#9999FF",
                    desc:
                        "영상 편집과 간단한 모션 작업을 통해 장면이 자연스럽게 이어지도록 구성",
                    skills: [
                        {
                            name: "After Effects",
                            colorCode: "#9999FF",
                        },
                        {
                            name: "Premiere Pro",
                            colorCode: "#9999CC",
                            learning: true, // ✅ 공부중 표시
                        },
                    ],
                },
                {
                    title: "웹 퍼블리싱",
                    icon: "mdi-language-html5",
                    iconColor: "#E34F26",
                    desc:
                        "시맨틱 마크업과 반응형 레이아웃을 중심으로 디자인을 웹 페이지로 정돈해 구현",
                    skills: [
                        {
                            name: "HTML",
                            colorCode: "#E34F26",
                        },
                        {
                            name: "CSS",
                            colorCode: "#1572B6",
                        },
                        {
                            name: "SCSS",
                            colorCode: "#CD6799",
                        },
                        {
                            name: "Bootstrap",
                            colorCode: "#7952B3",
                        },
                    ],
                },
                {
                    title: "프론트엔드 & 개발",
                    icon: "mdi-code-tags",
                    iconColor: "#42B883",
                    desc:
                        "Vue를 중심으로 컴포넌트 기반 구조를 익히고, React와 Python 기초를 꾸준히 학습",
                    skills: [
                        {
                            name: "Vue",
                            colorCode: "#42B883",
                            learning: true,
                        },
                        {
                            name: "React",
                            colorCode: "#61DAFB",
                            learning: true,
                        },
                        {
                            name: "Python",
                            colorCode: "#3776AB",
                            learning: true,
                        },
                    ],
                },
            ],
        };
    },
};
</script>

<style scoped>
/* 섹션 타이틀 - SUITE-Bold 적용 */
.skill-section h2 {
    font-family: "SUITE-Bold", sans-serif;
    font-weight: 700;
}

/* 카드 내부 폰트 - SUITE-Regular */
.skill-section .skill-group-card,
.skill-section .skill-group-card * {
    font-family: "SUITE-Regular", sans-serif;
}

/* 그룹 카드 스타일 */
.skill-group-card {
    position: relative;
    border-radius: 18px;
    border: 2px solid #e5e5e5;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
    transition: border-color 0.25s ease, box-shadow 0.25s ease;
    background: #fff;
}

.skill-group-card:hover {
    border-color: var(--card-accent-color, #e5e5e5);
    box-shadow: 0 10px 22px rgba(0, 0, 0, 0.08);
}

/* 아이콘 배지 */
.icon-badge {
    width: 40px;
    height: 40px;
    border-radius: 999px;
    border: 2px solid rgba(0, 0, 0, 0.06);
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #ffffff;
}

/* 타이틀,설명 타이포 정리 */
.group-title {
    font-size: 1.05rem;
}

.group-desc {
    font-size: 0.9rem;
    line-height: 1.6;
    color: #555;
}

/* 칩 스타일 */
.skill-chip {
    font-size: 0.78rem;
    font-weight: 500;
    border-width: 1.5px;
    border-radius: 999px;
    letter-spacing: 0.02em;
    background-color: #ffffff;
}

/* 공부중 뱃지 */
.learning-label {
    margin-left: 4px;
    padding: 1px 4px;
    font-size: 0.7rem;
    font-weight: 600;
    border-radius: 999px;
    background-color: rgba(244, 67, 54, 0.08);
    color: #f44336;
}
</style>
