<template>
    <!-- 연락처 푸터 -->
    <section id="contact" class="contact-footer">
        <div class="footer-inner">
            <v-icon size="48" class="mb-1">
                mdi-email-outline
            </v-icon>

            <!-- 메인 문구 -->
            <h3 class="footer-title mb-8">
                이 홈페이지는 개인 포트폴리용 홈페이지입니다
            </h3>

            <!-- 소개 + 작업 범위 -->
            <p class="footer-subtitle mb-5">
                UI·웹 디자인 기반으로 다양한 작업을 하고 있어요
            </p>
            <p class="footer-subtitle mb-8">
                웹사이트·랜딩 페이지, 상세페이지·배너<br>
                브랜드 이미지 작업 등<br>
                디지털 디자인 위주로 작업합니다
            </p>

            <!-- 위치 + 응답 안내 -->
            <p class="footer-note mb-8">
                📍 의정부 / 서울권 작업 가능<br>
                평일 기준 24시간 이내 회신 드립니다
            </p>

            <!-- 연락 버튼 -->
            <div class="footer-buttons mb-8">
                <v-btn type="button" variant="outlined" class="footer-btn" href="sms:">
                    <v-icon start size="20">mdi-chat</v-icon>
                    문자 보내기
                </v-btn>

                <v-btn type="button" variant="outlined" class="footer-btn" href="mailto:">
                    <v-icon start size="20">mdi-email</v-icon>
                    이메일 보내기
                </v-btn>
            </div>
        </div>
    </section>
</template>


<style scoped>
/* Contact */
.contact-footer {
    width: 100%;
    background-color: #4f5d75;
    color: #ffffff;
    text-align: center;
    padding: 60px 0;
    border-radius: 30px;
    margin: 40px 0;
}

.footer-inner {
    max-width: 900px;
    margin: 0 auto;
    padding: 0 20px;
}

/* 푸터 텍스트 스타일 */
.footer-title {
    font-family: 'SUITE-Bold', sans-serif;
    font-size: 1rem;
}

.footer-subtitle {
    font-family: 'SUITE-Regular', sans-serif;
    font-size: 0.8rem;
    opacity: 0.9;
}

.footer-note {
    font-family: 'SUITE-Regular', sans-serif;
    font-size: 0.9rem;
    opacity: 0.9;
}

/* 버튼 영역 */
.footer-buttons {
    display: flex;
    justify-content: center;
    gap: 12px;
    flex-wrap: wrap;
}

.footer-btn {
    font-family: 'SUITE-Regular', sans-serif;
    border-color: rgba(255, 255, 255, 0.7) !important;
    color: #ffffff !important;
    border-radius: 999px !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    gap: 6px;

    border-radius: 999px !important;
    padding: 10px 22px !important;
}

.footer-btn:hover {
    border-color: #ffffff !important;
    background-color: rgba(255, 255, 255, 0.08) !important;
}
</style>
