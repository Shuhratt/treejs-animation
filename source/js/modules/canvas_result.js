import seaImg from "../../img/module-4/win-primary-images/sea-calf-2.png";
import iceImg from "../../img/module-4/win-primary-images/ice.png";

function rotateCtx(ctx, angle, cx, cy) {
  ctx.translate(cx, cy);
  ctx.rotate((Math.PI / 180) * angle);
  ctx.translate(-cx, -cy);
}

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

// Для анимации сохраняем на каждый кадр предыдущее состояние
let imageTranslateY = -300; // первый кадр начинается с низа

let END = false;

const scenario = {
  walrus: {
    translateUp: true,
    translateDown: false,
    rotate: 10,
  },
};

const LINE_UP = 50;
const CORD_Y = 3; // на сколько нужно смещать картинку

function animate() {
  const canvas = document.getElementById("result_animation_1");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  if (canvas.getContext) {
    const ctx = canvas.getContext("2d");
    ctx.globalCompositeOperation = "destination-over"; //z-index
    console.info("animate");

    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    images.forEach((image) => {
      // ctx.save();
      const cordY = image.position.y - imageTranslateY;

      rotateCtx(
        ctx,
        scenario.walrus.rotate,
        image.position.x + image.size.w / 2,
        cordY + image.size.h / 2
      );
      ctx.drawImage(
        image.url(),
        image.position.x,
        cordY,
        image.size.w,
        image.size.h
      );
      // ctx.restore();
    });

    if (!END) {
      if (scenario.walrus.translateUp) {
        // сценарий вверх морж
        imageTranslateY += CORD_Y;
      }

      if (imageTranslateY > LINE_UP) {
        // когда дошли до вверха
        scenario.walrus.translateUp = false;
        scenario.walrus.translateDown = true;
      }

      if (scenario.walrus.translateDown) {
        //сценарий вниз морж
        imageTranslateY -= CORD_Y;
        scenario.walrus.rotate -= 0.6;

        if (imageTranslateY === 0) {
          scenario.walrus.translateDown = false;
          END = true;
        }
      }

      requestAnimationFrameId = window.requestAnimationFrame(animate);
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
