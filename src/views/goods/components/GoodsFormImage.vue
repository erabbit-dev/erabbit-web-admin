<script setup lang="ts">
import { PlusOutlined } from '@ant-design/icons-vue'
import { ref } from 'vue'

const pcFileList = ref<any[]>([])

const handlePreview = (file: any) => {
  console.log(file)
}

const formModel = ref()
</script>

<template>
  <div class="goods-form-image">
    <a-form :labelCol="{ span: 3 }">
      <a-form-item label="商品属性">
        <p class="form-text">
          商品主图大小不能超过3MB；700*700 以上图片上传后商品详情页自动提供放大镜功能
        </p>
        <a-upload
          v-model:file-list="pcFileList"
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          list-type="picture-card"
          @preview="handlePreview"
          class="mt-3"
        >
          <div class="text-gray-400" v-if="pcFileList.length < 10">
            <PlusOutlined class="mb-2 text-18" />
            <div class="text">上传图片</div>
            <div class="text">(1/10)</div>
          </div>
        </a-upload>
      </a-form-item>
      <a-form-item label="主图视频">
        <a-radio-group v-model:value="formModel">
          <a-radio class="leading-8" :value="1">1:1</a-radio>
          <a-radio class="leading-8" :value="2">16:9</a-radio>
        </a-radio-group>
        <div class="flex items-center mt-3">
          <a-upload
            v-model:file-list="pcFileList"
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            list-type="picture-card"
            @preview="handlePreview"
            :show-upload-list="false"
            class="mr-4 max-w-min one-card"
          >
            <div class="text-gray-400" v-if="pcFileList.length < 10">
              <PlusOutlined class="mb-2 text-18" />
              <div class="text">上传视频</div>
            </div>
          </a-upload>
          <div class="text-12">
            <p class="form-text">1.尺寸：此处可使用1：1或16：9比例视频</p>
            <p class="form-text">2.时长：≤60s，建议30秒以内短视频可优先在爱逛街等推荐频道展现</p>
            <p class="form-text">3.内容：突出商品1-2个核心卖点，不建议电子相册式的图片翻页视频</p>
          </div>
        </div>
      </a-form-item>
      <a-form-item label="商品描述">
        <a-textarea :rows="5" placeholder="请输入" :maxlength="500" show-count></a-textarea>
      </a-form-item>
      <a-form-item label="商品图片">
        <a-upload
          v-model:file-list="pcFileList"
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          list-type="picture-card"
          @preview="handlePreview"
        >
          <div class="text-gray-400" v-if="pcFileList.length < 10">
            <PlusOutlined class="mb-2 text-18" />
            <div class="text">上传图片</div>
            <div class="text">(1/20)</div>
          </div>
        </a-upload>
      </a-form-item>
    </a-form>
  </div>
</template>

<style lang="scss" scoped>
.goods-form-image {
  max-width: var(--er-max-width);
  padding: 20px 60px;

  .one-card {
    :deep(.ant-upload) {
      margin: 0;
    }
  }
}
</style>
