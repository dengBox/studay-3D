<template>
  <div id="create-three" ref="renderWrap"></div>
</template>

<script>
// <script lang="ts">
import { Scene, PerspectiveCamera, WebGLRenderer, BoxGeometry, MeshBasicMaterial, Mesh } from 'three'

import { defineComponent } from 'vue'
const scene = new Scene()
const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

const renderer = new WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)

export default defineComponent({
  setup () {
    return {}
  },
  mounted () {
    this.$refs.renderWrap.appendChild(renderer.domElement)
    const geometry = new BoxGeometry()
    const material = new MeshBasicMaterial({ color: 0x00ff00 })
    const cube = new Mesh(geometry, material)
    scene.add(cube)

    camera.position.z = 5

    const animate = function () {
      requestAnimationFrame(animate)

      cube.rotation.x += 0.01
      cube.rotation.y += 0.01

      renderer.render(scene, camera)
    }

    animate()
  }
})
</script>

<style scoped lang="scss">
</style>
