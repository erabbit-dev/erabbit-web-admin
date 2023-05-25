<script setup lang="ts">
import avatar from '@/assets/avatar.png'
import { ClusterOutlined, ShopOutlined, TagOutlined } from '@ant-design/icons-vue'
import { Dayjs } from 'dayjs'
import { ref } from 'vue'
import DashboardChart from './components/DashboardChart.vue'

const value = ref<Dayjs>()

const listData: { type: 'success' | 'warning'; content: string }[] = [
  { type: 'warning', content: '10,000' },
  { type: 'success', content: '13,000' }
]
</script>

<template>
  <div class="dashboard-page">
    <a-row :gutter="16">
      <a-col :span="16">
        <a-page-header :avatar="{ src: avatar }" title="Admin" :sub-title="$t('dashboard.welcome')">
          <template #extra>
            <a-button key="3">
              <template #icon> <TagOutlined /> </template
            ></a-button>
            <a-button key="2">
              <template #icon> <ClusterOutlined /> </template
            ></a-button>
            <a-button key="1" type="primary">
              <template #icon>
                <ShopOutlined />
              </template>
            </a-button>
          </template>
        </a-page-header>
        <a-card class="da-data" style="margin-bottom: 16px">
          <a-row>
            <a-col :span="6">
              <a-statistic :title="$t('dashboard.active')" :value="3456" />
            </a-col>
            <a-col :span="6">
              <a-statistic :title="$t('dashboard.total')" :precision="2" :value="112893" />
            </a-col>
            <a-col :span="6">
              <a-statistic :title="$t('dashboard.comment')" :value="1128"> </a-statistic>
            </a-col>
            <a-col :span="6">
              <a-statistic :title="$t('dashboard.rating')" :value="98" class="demo-class">
                <template #suffix>
                  <span>%</span>
                </template>
              </a-statistic>
            </a-col>
          </a-row>
        </a-card>
        <a-card>
          <a-calendar v-model:value="value">
            <template #dateCellRender="{ current }">
              <ul class="events" v-if="current.date() === 12 || current.date() === 2">
                <li v-for="item in listData" :key="item.content">
                  <a-badge :status="item.type" :text="item.content" />
                </li>
              </ul>
            </template>
          </a-calendar>
        </a-card>
      </a-col>
      <a-col :span="8">
        <a-row :gutter="16">
          <a-col :span="24">
            <a-card>
              <div class="da-img"></div>
            </a-card>
          </a-col>
          <a-col :span="24">
            <DashboardChart />
          </a-col>
        </a-row>
      </a-col>
    </a-row>
  </div>
</template>

<style scoped lang="scss">
.ant-page-header {
  background-color: transparent;
}

.ant-card,
.ant-calendar {
  border-radius: 4px;
  color: #333;
}

.da-data {
  text-align: center;

  :deep(.ant-statistic-content) {
    color: var(--er-primary);
  }
}

.da-img {
  height: 280px;
  padding: 20px;
  background: url('@/assets/illustration.svg') no-repeat center / contain;
}

.events {
  padding: 10px;
  list-style: none;
}
</style>
