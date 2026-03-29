// src/data/index.js
import { workBanner } from "./banner.js";
import { workDetail } from "./detail.js";
import { workMarketing } from "./marketing.js";

export const workProjects = [
  ...workBanner,
  ...workMarketing,
  ...workDetail,
];
