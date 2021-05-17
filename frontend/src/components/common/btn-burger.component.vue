<template>
  <div class="menu-icon menu-icon-svg" id="btn-burger" @click="openNav">
    <span></span>
    <svg x="0" y="0" width="54px" height="54px" viewBox="0 0 54 54">
      <path
        d="M16.500,27.000 C16.500,27.000 24.939,27.000 38.500,27.000 C52.061,27.000 49.945,15.648 46.510,11.367 C41.928,5.656 34.891,2.000 27.000,2.000 C13.193,2.000 2.000,13.193 2.000,27.000 C2.000,40.807 13.193,52.000 27.000,52.000 C40.807,52.000 52.000,40.807 52.000,27.000 C52.000,13.000 40.837,2.000 27.000,2.000 "
      ></path>
    </svg>
  </div>
</template>

<style lang="scss" scoped>
.menu-icon {
  margin: 25px auto;
}

.menu-icon {
  position: relative;
  width: 54px;
  height: 54px;
  border-radius: 50%;
}
.menu-icon span {
  position: absolute;
  top: 50%;
  left: 50%;
  display: block;
  width: 22px;
  height: 2px;
  background-color: #fff;
  -webkit-transform: translateX(-50%) translateY(-50%);
  -ms-transform: translateX(-50%) translateY(-50%);
  transform: translateX(-50%) translateY(-50%);
}
.menu-icon span::before,
.menu-icon span::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 22px;
  height: 2px;
  background-color: #fff;
  -webkit-transform: translateY(-6px);
  -ms-transform: translateY(-6px);
  transform: translateY(-6px);
  -webkit-transition: -webkit-transform 0.5s;
  transition: transform 0.5s;
}
.menu-icon span::after {
  -webkit-transform: translateY(6px);
  -ms-transform: translateY(6px);
  transform: translateY(6px);
}
.menu-icon:hover span::before {
  -webkit-transform: translateY(-8px);
  -ms-transform: translateY(-8px);
  transform: translateY(-8px);
}
.menu-icon:hover span::after {
  -webkit-transform: translateY(8px);
  -ms-transform: translateY(8px);
  transform: translateY(8px);
}

.menu-icon-svg span {
  -webkit-transition: background 0.5s steps(1, end);
  transition: background 0.5s steps(1, end);
}
.menu-icon-svg span::before,
.menu-icon-svg span::after {
  -webkit-transform-origin: 100% 50%;
  -ms-transform-origin: 100% 50%;
  transform-origin: 100% 50%;
}
.menu-icon-svg svg {
  opacity: 0;
  fill: transparent;
  stroke-width: 2px;
  stroke: #fff;
  stroke-dasharray: 22 230;
  -webkit-transition: stroke-dasharray 0.5s, stroke-dashoffset 0.5s,
    opacity 0.5s steps(1, end);
  transition: stroke-dasharray 0.5s, stroke-dashoffset 0.5s,
    opacity 0.5s steps(1, end);
}
.menu-icon-svg.is-opened span {
  -webkit-transition: background 0.5s steps(1, start);
  transition: background 0.5s steps(1, start);
  background-color: transparent;
}
.menu-icon-svg.is-opened span::before {
  -webkit-transform: translateX(-3px) translateY(-8px) rotate(-45deg);
  -ms-transform: translateX(-3px) translateY(-8px) rotate(-45deg);
  transform: translateX(-3px) translateY(-8px) rotate(-45deg);
}
.menu-icon-svg.is-opened span::after {
  -webkit-transform: translateX(-3px) translateY(8px) rotate(45deg);
  -ms-transform: translateX(-3px) translateY(8px) rotate(45deg);
  transform: translateX(-3px) translateY(8px) rotate(45deg);
}
.menu-icon-svg.is-opened svg {
  opacity: 1;
  -webkit-transition: opacity 0.5s steps(1, start);
  transition: opacity 0.5s steps(1, start);
  -webkit-animation: pathanimation 0.5s linear;
  animation: pathanimation 0.5s linear;
  -webkit-animation-fill-mode: forwards;
  animation-fill-mode: forwards;
}
.menu-icon-svg.is-closed svg {
  -webkit-animation: pathanimation-out 0.5s linear;
  animation: pathanimation-out 0.5s linear;
}

@-webkit-keyframes pathanimation {
  40% {
    stroke-dasharray: 22 230;
  }

  60% {
    stroke-dashoffset: -65;
  }

  100% {
    stroke-dashoffset: -65;
    stroke-dasharray: 160;
  }
}

@keyframes pathanimation {
  40% {
    stroke-dasharray: 22 230;
  }

  60% {
    stroke-dashoffset: -65;
  }

  100% {
    stroke-dashoffset: -65;
    stroke-dasharray: 160;
  }
}

@-webkit-keyframes pathanimation-out {
  100% {
    stroke-dashoffset: 0;
  }

  60% {
    stroke-dasharray: 22 230;
  }

  40% {
    stroke-dashoffset: -65;
  }

  0% {
    stroke-dashoffset: -65;
    stroke-dasharray: 160;
  }
}

@keyframes pathanimation-out {
  100% {
    stroke-dashoffset: 0;
  }

  60% {
    stroke-dasharray: 22 230;
  }

  40% {
    stroke-dashoffset: -65;
  }

  0% {
    stroke-dashoffset: -65;
    stroke-dasharray: 160;
  }
}
</style>