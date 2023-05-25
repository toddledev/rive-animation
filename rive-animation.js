import rive from "https://cdn.skypack.dev/@rive-app/canvas@1.0.102";
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
class RiveAnimation extends HTMLElement {
  constructor() {
    super();
    const id = new Array(6)
      .map(() => chars.charAt(Math.floor(Math.random() * chars.length)))
      .join('');
    this.attachShadow({ mode: 'open' });
    if (!this.getAttribute('src')) {
      const p = document.createElement('p');
      p.innerText = `Missing "src" attribute`;
      this.shadowRoot.appendChild(p);
      return;
    }
    this.renderCanvas();
  }
  renderCanvas() {
    const canvas = document.createElement('canvas');
    canvas.setAttribute('width', this.getAttribute('width') ?? '500');
    canvas.setAttribute('height', this.getAttribute('height') ?? '500');

    this.shadowRoot.appendChild(canvas);

    this.riveInstance = new rive.Rive({
      src: this.getAttribute('src'),
      // Or the path to a public Rive asset
      // src: '/public/example.riv',
      canvas: canvas,
      autoplay: Boolean(this.getAttribute("autoplay")),
      stateMachines: this.getAttribute("statemachine")?.split(",").map(s => s.trim()),
      animations: this.getAttribute("animations")?.split(",").map(s => s.trim()),
    });
  }
}
customElements.define('rive-animation', RiveAnimation);
