import seaImg from "../../img/module-4/win-primary-images/sea-calf-2.png";
import iceImg from "../../img/module-4/win-primary-images/ice.png";

const images = [
  {
    url: () => {
      const img = new Image();
      img.src = seaImg;
      return img;
    },
    size: { w: 600, h: 600 },
    position: {
      x: window.innerWidth / 2 - 300,
      y: window.innerHeight / 2 - 190,
    },
  },
  {
    url: () => {
      const img = new Image();
      img.src = iceImg;
      return img;
    },
    size: { w: 408, h: 167 },
    position: { x: window.innerWidth / 2 - 204, y: window.innerHeight / 1.6 },
  },
];

let requestAnimationFrameId;
let imageTranslateX = 0;

function animate() {
  const canvas = document.getElementById("result_animation_1");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  if (canvas.getContext) {
    const ctx = canvas.getContext("2d");
    ctx.globalCompositeOperation = "destination-over"; //z-index

    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    console.log("animate");

    images.forEach((image) => {
      ctx.drawImage(
        image.url(),
        image.position.x + imageTranslateX,
        image.position.y,
        image.size.w,
        image.size.h
      );
    });

    if (imageTranslateX < 500) {
      requestAnimationFrameId = window.requestAnimationFrame(animate);
      imageTranslateX += 2;
    } else {
      cancelAnimationFrame(requestAnimationFrameId);
    }
  }
}

function init() {
  requestAnimationFrameId = window.requestAnimationFrame(animate);
}

init();
export default animate;
