<template>
    <canvas ref='canvas'></canvas>  
</template>

<script>
import Bgs from "../images/1.jpg";
import { imgToBase64, uploadBase64 } from "@/api/index";

export default {
  computed: {
    canvas() {
      return this.$refs.canvas;
    },
    context() {
      return this.$refs.canvas.getContext("2d");
    }
  },
  methods: {
    // 封装图片加载
    loadImage(src) {
      return new Promise((resolve, reject) => {
        let img = new Image();
        img.src = src;
        img.onload = () => {
          resolve(img);
        };
        img.onerrpr = () => {
          reject();
        };
      });
    }
  },
  async mounted() {
    let { canvas, context } = this;
    // 绘制背景
    let img = await this.loadImage(Bgs);

    canvas.width = img.width;
    canvas.height = img.height;
    context.drawImage(
      img,
      0,
      0,
      img.width,
      img.height,
      0,
      0,
      img.width,
      img.height
    );

    // 绘制圆形头像
    let imgs = "https://avatars3.githubusercontent.com/u/41977063?s=460&v=4";
    let response = await imgToBase64(imgs);
    console.log(response);
    let userImg = await this.loadImage(response.data.base64);
    console.log(userImg);

    //圆
    context.save();
    context.arc(140, 794, 45, 0, 2 * Math.PI);
    context.clip();
    context.drawImage(userImg, 97, 750, 90, 90);

    //圆边框
    context.beginPath();
    context.lineWidth = 6;
    context.strokeStyle = "#8db287";
    context.arc(142, 794, 44, 0, 360, false);
    context.stroke();
    context.closePath();

    context.restore();
    context.font = "30px Arial";
    context.fillStyle = "green";
    context.fillText("陈豆豆", 97, 870);

    // 图片分享
    let base64 = canvas.toDataURL("image/jpeg");
    const upload = await uploadBase64(base64);
    console.log("upload...", upload);
  }
};
</script>

<style>
canvas {
  width: 100%;
}
</style>