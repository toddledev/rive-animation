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
    this.canvas.style.width = "100%"
    this.canvas.style.height = "100%"

    this.shadowRoot.appendChild(this.canvas);
    this.load();
    
  }

  static get observedAttributes() {
    return ['source','statemachines', 'animations', "play"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case "play": {
        (newValue !== null && newValue !== undefined) ? this.riveInstance?.play(newValue !== "" ? newValue : undefined) : this.riveInstance?.pause()
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
      case "source": {
        if (newValue !== this.source) {
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

    if (!this.getAttribute('source')) {
     return
    }

    this.source = this.getAttribute("source")
    this.stateMachines = this.getAttribute("statemachine")
    this.animations = this.getAttribute("animations")

    this.riveInstance = new rive.Rive({
      src: this.source,
      // Or the path to a public Rive asset
      // src: '/public/example.riv',
      canvas: this.canvas,
      autoplay: this.hasAttribute("play"),
      stateMachines: this.stateMachines?.split(",").map(s => s.trim()),
      animations: this.animations?.split(",").map(s => s.trim()),
      onLoad: () => {
        this.riveInstance.resizeDrawingSurfaceToCanvas();
      },
    });
  }
}
customElements.define('rive-animation', RiveAnimation);

