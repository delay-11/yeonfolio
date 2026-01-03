// src/data/index.js
import { workBanner } from "./banner.js";
import { workPhoto } from "./photo.js";
import { workDetail } from "./detail.js";
import { workMarketing } from "./marketing.js";

export const workProjects = [
  ...workBanner,
  ...workPhoto,
  ...workMarketing,
  ...workDetail,
];
