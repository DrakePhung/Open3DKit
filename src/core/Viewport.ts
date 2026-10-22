/** Browser adapter owning the renderer, camera, navigation, and resize lifecycle. */
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import type { SceneDocument } from './SceneDocument';
import { disposeObjects } from './disposeObjects';
export class Viewport {
  private renderer: THREE.WebGLRenderer;
  private camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
  private scene = new THREE.Scene();
  private controls: OrbitControls;
  private resize: ResizeObserver;
  private grid: THREE.GridHelper;
  private disposed = false;
  constructor(container: HTMLElement, private document: SceneDocument) {
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    const theme = getComputedStyle(container);
    this.scene.background = new THREE.Color(theme.getPropertyValue('--viewport-background').trim() || '#edf1e7');
    this.grid = new THREE.GridHelper(20, 20,
      new THREE.Color(theme.getPropertyValue('--grid-center').trim() || '#9aaf99'),
      new THREE.Color(theme.getPropertyValue('--grid-lines').trim() || '#d2dccb'));

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.resetCamera();
    this.scene.add(document.root, this.grid, new THREE.HemisphereLight(0xffffff, 0x444466, 3));
    const light = new THREE.DirectionalLight(0xffffff, 3);
    light.position.set(4, 6, 3);
    this.scene.add(light);
    container.appendChild(this.renderer.domElement);
    this.resize = new ResizeObserver(() => {
      const { width, height } = container.getBoundingClientRect();
      if (!width || !height) return;
      this.renderer.setSize(width, height);
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
    });
    this.resize.observe(container);
    this.renderer.setAnimationLoop(() => { this.controls.update(); this.renderer.render(this.scene, this.camera); });
  }
  resetCamera(): void {
    this.controls.reset();
    this.camera.position.set(5, 4, 6);
    this.controls.target.set(0, 0.5, 0);
    this.controls.update();
  }
  dispose(): void {
    if (this.disposed) return;
    this.disposed = true;
    this.resize.disconnect();
    this.renderer.setAnimationLoop(null);
    this.controls.dispose();
    this.scene.remove(this.document.root);
    disposeObjects([this.grid]);
    this.renderer.dispose();
    this.renderer.domElement.remove();
  }
}
