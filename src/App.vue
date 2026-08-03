<template>
  <v-app>
    <!-- 상단 AppBar -->
    <v-app-bar app color="white" dense flat class="site-appbar">
      <!-- 로고: 클릭 시 항상 맨 위로 -->
      <v-toolbar-title class="pl-5 pr-0 d-none d-md-flex" @click="scrollToTop" style="cursor: pointer; margin: 0;">
        <v-img src="/image/yeon.png" alt="YEON 로고" contain height="50" width="auto" class="ma-0" />
      </v-toolbar-title>

      <!-- 상단 탭 메뉴 -->
      <div class="tab-wrapper-center">
        <v-tabs v-model="selectedTab" background-color="transparent" align-tabs="center" slider-color="#2f5de3"
          class="tab-bar-center">
          <v-tab class="nav-tab" :class="{ 'active-tab': selectedTab === 'about' }" value="about"
            @click="navigateAndScroll('about')">
            👩🏻‍💻 소개
          </v-tab>

          <v-tab class="nav-tab" :class="{ 'active-tab': selectedTab === 'skills' }" value="skills"
            @click="navigateAndScroll('skills')">
            🛠️ 스킬
          </v-tab>

          <v-tab class="nav-tab" :class="{ 'active-tab': selectedTab === 'projects' }" value="projects"
            @click="navigateAndScroll('projects')">
            📁 프로젝트
          </v-tab>

          <v-tab class="nav-tab" :class="{ 'active-tab': selectedTab === 'contact' }" value="contact"
            @click="navigateAndScroll('contact')">
            📬 연락처
          </v-tab>
        </v-tabs>
      </div>
    </v-app-bar>

    <!-- 본문 영역 -->
    <v-main>
      <router-view />
    </v-main>

    <!-- 푸터 -->
    <section id="contact" class="contact-footer">
      <div class="footer-copy">
        © YEON 2025. Unauthorized use of any works in this portfolio is prohibited.
      </div>
    </section>

    <!-- 플로팅 네비 버튼들: Back + Top -->
    <div class="floating-nav-buttons" v-show="showTopBtn">
      <!-- 뒤로가기: 홈(/)이 아닐 때만 표시 -->
      <v-btn v-if="$route.path !== '/'" class="floating-btn" elevation="3" icon @click="goBack">
        <v-icon color="#ffffff">mdi-chevron-left</v-icon>
      </v-btn>

      <!-- TOP 버튼 -->
      <v-btn class="floating-btn" elevation="3" icon @click="scrollToTop">
        <v-icon color="#ffffff">mdi-chevron-up</v-icon>
      </v-btn>
    </div>
  </v-app>
</template>

<script>
export default {
  data() {
    const path = this.$route.path;

    return {
      selectedTab:
        path === '/'
          ? 'about'
          : path === '/personal' || path === '/work'
            ? 'projects'
            : null,

      // 플로팅 Top/Back 버튼 노출 여부
      showTopBtn: false,

      // 홈 섹션 id 목록
      sectionIds: ['about', 'skills', 'projects', 'contact'],
    };
  },

  computed: {
    // 개인/회사 프로젝트 상세 페이지 여부
    isProjectPage() {
      const path = this.$route.path;
      return path === '/personal' || path === '/work';
    },
  },

  mounted() {
    window.addEventListener('scroll', this.handleScroll);

    // 홈에 있을 때는 현재 섹션 기준으로 탭 활성화 맞춰주기
    if (this.$route.path === '/') {
      this.$nextTick(() => {
        this.updateActiveSection();
      });
    }

    // 프로젝트 상세 페이지로 처음 진입했을 때는 스크롤 안 해도 버튼 노출
    if (this.isProjectPage) {
      this.showTopBtn = true;
    }
  },

  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  },

  methods: {
    // TOP 버튼: 항상 페이지 맨 위로
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },

    // 상단 탭 클릭 → 섹션 이동
    navigateAndScroll(id) {
      // 탭 하이라이트 먼저 변경
      this.selectedTab = id;

      if (this.$route.path !== '/') {
        // 홈이 아니면 → 홈으로 가면서 해당 섹션까지 스크롤
        this.$router.push({ path: '/', query: { scrollTo: id } });
      } else {
        // 이미 홈이면 바로 스크롤
        this.scrollToSection(id);
      }
    },

    /**
     * 섹션으로 스크롤
     * @param {string} id - 섹션 id
     * @param {boolean} instant - true면 애니메이션 없이 바로 이동 (뒤로가기용)
     */
    scrollToSection(id, instant = false) {
      this.$nextTick(() => {
        const el = document.getElementById(id);
        if (!el) return;

        const behavior = instant ? 'auto' : 'smooth';

        // About는 무조건 페이지 최상단으로
        if (id === 'about') {
          window.scrollTo({ top: 0, behavior });
          return;
        }

        // 나머지 섹션은 AppBar 높이만큼 보정해서 스크롤
        const appBar = document.querySelector('.v-app-bar');
        const appBarHeight = appBar ? appBar.offsetHeight : 0;
        const extraOffset = 16;

        const targetY =
          el.getBoundingClientRect().top +
          window.scrollY -
          appBarHeight -
          extraOffset;

        window.scrollTo({
          top: targetY,
          behavior,
        });
      });
    },

    // 스크롤 감지 → 플로팅 버튼 노출 + 홈일 때 탭 상태 갱신
    handleScroll() {
      // 개인/회사 프로젝트 페이지에서는 스크롤 여부와 무관하게 항상 버튼 노출
      if (this.isProjectPage) {
        this.showTopBtn = true;
      } else {
        // 그 외 페이지에서는 일정 스크롤 이상일 때만 버튼 노출
        this.showTopBtn = window.scrollY > 300;
      }

      // 홈이 아닐 땐 섹션 탭 활성화는 건드리지 않음
      if (this.$route.path !== '/') return;

      this.updateActiveSection();
    },

    // 현재 화면에 보이는 섹션 기준으로 selectedTab 업데이트
    updateActiveSection() {
      if (this.$route.path !== '/') {
        this.selectedTab = null;
        return;
      }

      const appBar = document.querySelector('.v-app-bar');
      const appBarHeight = appBar ? appBar.offsetHeight : 0;
      const checkLine = appBarHeight + 120; // 화면 상단에서 조금 내려온 기준선

      let currentSection = 'about'; // 기본값

      this.sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;

        const rect = el.getBoundingClientRect();
        const top = rect.top;
        const bottom = rect.bottom;

        // 섹션이 기준선을 지나고 있으면 현재 섹션으로 판단
        if (top <= checkLine && bottom > checkLine) {
          currentSection = id;
        }
      });

      if (this.selectedTab !== currentSection) {
        this.selectedTab = currentSection;
      }
    },

    // 뒤로가기: 홈으로 가되, 프로젝트 섹션을 "바로" 보여주기
    goBack() {
      // fromBack=1 플래그를 같이 보내서,
      // 나중에 scrollToSection에서 instant 모드로 이동
      this.$router.push({
        path: '/',
        query: { scrollTo: 'projects', fromBack: '1' },
      });
    },
  },

  watch: {
    // /?scrollTo=... 로 들어왔을 때 처리
    '$route.query.scrollTo'(val) {
      if (val) {
        this.selectedTab = val;

        // 뒤로가기에서 온 건지 체크
        const isFromBack = this.$route.query.fromBack === '1';

        // 뒤로가기라면 instant(=true)로 호출 → 애니 없이 바로 고정
        this.scrollToSection(val, isFromBack);
      }
    },

    // 라우트 변경 시: 탭/버튼 상태 정리 + 스크롤 위치 조정
    '$route.path'(newPath) {
      if (newPath === '/') {
        // 홈으로 돌아오면 현재 스크롤 기준으로 탭/버튼 상태 다시 계산
        this.$nextTick(() => this.updateActiveSection());
        this.showTopBtn = window.scrollY > 300;
        return;
      }

      // 🔹 홈이 아닐 때
      if (newPath === '/personal' || newPath === '/work') {
        // 수정 이유: 개인/회사 프로젝트 페이지에서는 상단 "프로젝트" 탭이
        //           계속 활성화된 상태로 보이도록 하기 위함
        this.selectedTab = 'projects';
        this.showTopBtn = true;
      } else {
        this.selectedTab = null;
        this.showTopBtn = false;
      }

      // 개인 작업물 페이지로 이동 시 항상 최상단에서 시작
      if (newPath === '/personal') {
        this.$nextTick(() => {
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'auto',
          });
        });
      }
    },
  },
};
</script>

<style scoped>
/* 섹션 상단 여백 확보 */
[id] {
  scroll-margin-top: 100px;
}

/* 상단 메뉴 중앙 정렬 */
.tab-wrapper-center {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
}

.tab-bar-center {
  min-width: max-content;
}

/* AppBar 하단 보더 */
.site-appbar {
  border-bottom: 1px solid var(--color-border);
}

/* 탭 메뉴 기본 스타일 */
.nav-tab {
  font-family: 'SUITE-Bold', sans-serif;
  font-weight: 700;
  letter-spacing: -0.3px;
  color: var(--color-ink-soft);
  opacity: 1;
  border-radius: 0;
  padding: 4px 14px;
  transition: color 0.25s ease;
}

/* 활성 탭 */
.active-tab {
  color: var(--color-accent);
  background-color: transparent;
  box-shadow: none;
}

/* 탭 슬라이더 두껍게 */
:deep(.v-tabs-slider) {
  height: 3px;
  border-radius: 999px;
}

/* 플로팅 버튼 묶음 */
.floating-nav-buttons {
  position: fixed;
  bottom: 28px;
  right: 28px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 999;
}

/* 플로팅 버튼 스타일 */
.floating-btn {
  backdrop-filter: blur(6px);
  background-color: rgba(28, 27, 23, 0.75) !important;
  transition: background-color 0.3s ease;
}

.floating-btn:hover {
  background-color: rgba(28, 27, 23, 0.92) !important;
}

/* 푸터 */
.contact-footer {
  width: 100%;
  background-color: var(--color-bg);
  color: var(--color-ink-soft);
  text-align: center;
  padding: 40px 0;
  border-top: 1px solid var(--color-border);
}

.footer-copy {
  font-family: 'SUITE-Regular', sans-serif;
  font-size: 0.8rem;
  opacity: 0.85;
}
</style>
