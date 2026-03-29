<template>
  <div>
    <!-- 섹션들 -->
    <v-container class="py-10">
      <div id="about">
        <AboutSection />
      </div>
      <div id="skills">
        <SkillSection />
      </div>
      <div id="projects">
        <ProjectSection />
      </div>
      <div id="contact">
        <ContactSection />
      </div>
    </v-container>
  </div>
</template>

<script>
import AboutSection from "@/components/AboutSection.vue";
import SkillSection from "@/components/SkillSection.vue";
import ContactSection from "@/components/ContactSection.vue";

export default {
  components: {
    AboutSection,
    SkillSection,
    ContactSection,
  },
};
</script>