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
    return ['src','statemachines', 'animations', "play"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case "play": {
        Boolean(newValue) ? this.riveInstance.play() : this.riveInstance.stop()
        break;
      }
      case "statemachine": {
        if (newValue !== this.stateMachines) {
          this.load()
        }
      }
      case "animations": {
        if (newValue !== this.animations) {
          this.load()
        }
      }
      case "src": {
        if (newValue !== this.src) {
          this.load()
        }
      }
    }
  }
  
  load() {
    this.errorMessage?.remove();
    if (this.riveInstance) {
      this.riveInstance.cleanup();
      this.riveInstance = null
    }

    if (!this.getAttribute('src')) {
      this.errorMessage = document.createElement('p');
      p.innerText = `Missing "src" attribute`;
      this.shadowRoot.appendChild(this.errorMessage);
    }

    this.src = this.getAttribute("src")
    this.stateMachines = this.getAttribute("statemachine")
    this.animations = this.getAttribute("animations")


    this.riveInstance = new rive.Rive({
      src: this.src,
      // Or the path to a public Rive asset
      // src: '/public/example.riv',
      canvas: this.canvas,
      autoplay: Boolean(this.getAttribute("play")),
      stateMachines: this.stateMachines?.split(",").map(s => s.trim()),
      animations: this.animations?.split(",").map(s => s.trim()),
    });
  }
}
customElements.define('rive-animation', RiveAnimation);
