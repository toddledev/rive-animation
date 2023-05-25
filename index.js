import rive from "https://cdn.skypack.dev/@rive-app/canvas@1.0.102";
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
class RiveAnimation extends HTMLElement {
  constructor() {
    super();
    const id = new Array(6)
      .map(() => chars.charAt(Math.floor(Math.random() * chars.length)))
      .join('');
    this.attachShadow({ mode: 'open' });
   
    this.canvas = document.createElement('canvas');
    this.canvas.setAttribute('width', this.getAttribute('width') ?? '500');
    this.canvas.setAttribute('height', this.getAttribute('height') ?? '500');
    this.shadowRoot.appendChild(this.canvas);
    this.load();
    
  }
  static get observedAttributes() {
    return ['src','statemachines', 'animations', "autoplay"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.load();
  }
  
  load() {
    this.errorMessage?.remove();
    if (this.riveInstance) {
      this.riveInstance.cleanup();
    }

    if (!this.getAttribute('src')) {
      this.errorMessage = document.createElement('p');
      p.innerText = `Missing "src" attribute`;
      this.shadowRoot.appendChild(this.errorMessage);
    }

    

    this.riveInstance = new rive.Rive({
      src: this.getAttribute('src'),
      // Or the path to a public Rive asset
      // src: '/public/example.riv',
      canvas: this.canvas,
      autoplay: Boolean(this.getAttribute("autoplay")),
      stateMachines: this.getAttribute("statemachine")?.split(",").map(s => s.trim()),
      animations: this.getAttribute("animations")?.split(",").map(s => s.trim()),
    });
  }
}
customElements.define('rive-animation', RiveAnimation);
