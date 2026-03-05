<script lang="ts" setup>
import { useTitle } from "@vueuse/core";

useTitle("Friends | IceyWu");
useHead({
	title: "Friends | IceyWu",
	meta: [
		{
			hid: "description",
			name: "description",
			content: "友情链接 - 一些有趣的朋友们",
		},
	],
});

interface FriendLink {
	name: string;
	url: string;
	avatar: string;
	desc: string;
}

const friends = reactive<FriendLink[]>([
	{
		name: "Giovan",
		url: "https://www.giovan.cn",
		avatar:
			"https://serve.giovan.cn/uploads/1769860396165-143ef0bb240aa25d.jpeg",
		desc: "万事顺意",
	},
]);
</script>

<template>
  <div mxa w-65ch>
    <PageHeader title="Friends" description="一些有趣的朋友们，链接彼此的数字花园。" />

    <div class="friends-grid">
      <a
        v-for="(friend, index) in friends"
        :key="friend.name"
        :href="friend.url"
        target="_blank"
        rel="noopener noreferrer"
        class="friend-card"
        :style="{ animationDelay: `${index * 0.08}s` }"
      >
        <!-- 角落装饰 -->
        <div class="card-corner top-left" />
        <div class="card-corner top-right" />

        <!-- 头像 -->
        <div class="friend-avatar-wrap">
          <svg class="avatar-ring" viewBox="0 0 80 80" fill="none">
            <circle cx="40" cy="40" r="36" stroke="currentColor" stroke-width="0.8" stroke-dasharray="4 3" />
          </svg>
          <img
            :src="friend.avatar"
            :alt="friend.name"
            class="friend-avatar"
            loading="lazy"
          >
        </div>

        <!-- 信息 -->
        <div class="friend-info">
          <h3 class="friend-name">
            {{ friend.name }}
            <svg class="link-icon" viewBox="0 0 12 12" fill="none">
              <path d="M3 3 L9 3 L9 9 M9 3 L3 9" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" />
            </svg>
          </h3>
          <p class="friend-desc">{{ friend.desc }}</p>
        </div>

        <!-- 底部装饰曲线 -->
        <svg class="card-deco" viewBox="0 0 120 20">
          <path d="M5,15 Q30,5 60,10 T115,8" fill="none" stroke="currentColor" stroke-width="0.8" />
        </svg>
      </a>
    </div>

    <!-- 申请友链提示 -->
    <div class="apply-section">
      <svg class="apply-deco" viewBox="0 0 200 12" preserveAspectRatio="none">
        <path d="M0 6 Q50 3, 100 6 T200 6" stroke="currentColor" stroke-width="0.8" fill="none" stroke-dasharray="4 3" />
      </svg>
      <p class="apply-text">
        想要交换友链？欢迎通过
        <a href="https://github.com/iceywu" target="_blank" class="apply-link">
          <span>GitHub</span>
          <svg class="inline-icon" viewBox="0 0 12 12" fill="none">
            <path d="M3 3 L9 3 L9 9 M9 3 L3 9" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" />
          </svg>
        </a>
        联系我 ✉
      </p>
    </div>
  </div>
</template>

<style scoped>
.friends-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.25rem;
  margin: 2.5rem 0;
}

.friend-card {
  position: relative;
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem;
  border: 1px dashed rgba(128,128,128,0.2);
  text-decoration: none;
  color: inherit;
  transition: all 0.3s;
  animation: fadeIn 0.5s ease-out both;
  overflow: hidden;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.friend-card:hover {
  border-style: solid;
  border-color: rgba(128,128,128,0.3);
  background: rgba(128,128,128,0.02);
}

.card-corner {
  position: absolute;
  width: 16px;
  height: 16px;
}
.card-corner.top-left {
  top: 0;
  left: 0;
  border-right: 1px dashed rgba(128,128,128,0.15);
  border-bottom: 1px dashed rgba(128,128,128,0.15);
}
.card-corner.top-right {
  top: 0;
  right: 0;
  border-left: 1px dashed rgba(128,128,128,0.15);
  border-bottom: 1px dashed rgba(128,128,128,0.15);
}

.friend-avatar-wrap {
  position: relative;
  flex-shrink: 0;
  width: 56px;
  height: 56px;
}

.avatar-ring {
  position: absolute;
  inset: -4px;
  width: calc(100% + 8px);
  height: calc(100% + 8px);
  opacity: 0.2;
  transition: opacity 0.3s;
}

.friend-card:hover .avatar-ring {
  opacity: 0.5;
}

.friend-avatar {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  object-fit: cover;
  filter: grayscale(20%);
  transition: all 0.3s;
}

.friend-card:hover .friend-avatar {
  filter: grayscale(0%);
  transform: scale(1.05);
}

.friend-info {
  flex: 1;
  min-width: 0;
}

.friend-name {
  font-size: 1.05rem;
  font-weight: 400;
  font-family: Caveat, 'Ma Shan Zheng', cursive;
  margin: 0 0 0.25rem;
  display: flex;
  align-items: center;
  gap: 0.35rem;
}

.link-icon {
  width: 11px;
  height: 11px;
  opacity: 0;
  transition: all 0.3s;
  transform: translateY(1px);
}

.friend-card:hover .link-icon {
  opacity: 0.5;
}

.friend-desc {
  font-size: 0.85rem;
  font-family: 'Ma Shan Zheng', 'ZCOOL XiaoWei', Caveat, cursive;
  opacity: 0.45;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card-deco {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 80px;
  height: 20px;
  opacity: 0.08;
}

.apply-section {
  text-align: center;
  margin: 1rem 0 3rem;
  position: relative;
}

.apply-deco {
  width: 100%;
  height: 12px;
  opacity: 0.12;
  margin-bottom: 1.5rem;
}

.apply-text {
  font-family: 'Ma Shan Zheng', 'ZCOOL XiaoWei', Caveat, cursive;
  font-size: 0.95rem;
  opacity: 0.5;
}

.apply-link {
  display: inline-flex;
  align-items: center;
  gap: 0.15rem;
  color: inherit;
  border-bottom: 1px dashed currentColor;
  text-decoration: none;
  opacity: 0.8;
  transition: opacity 0.3s;
}

.apply-link:hover {
  opacity: 1;
}

.inline-icon {
  width: 10px;
  height: 10px;
  opacity: 0.5;
}

@media (max-width: 640px) {
  .friends-grid {
    grid-template-columns: 1fr;
  }
}
</style>
