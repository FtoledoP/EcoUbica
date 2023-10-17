import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ColorsService {

  private renderer: Renderer2;

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  setPrimaryColor(color: string) {
    this.renderer.setStyle(document.documentElement, '--color-primary', color);
  }

  setSecondaryColor(color: string) {
    this.renderer.setStyle(document.documentElement, '--color-secondary', color);
  }

  setTertiaryColor(color: string) {
    this.renderer.setStyle(document.documentElement, '--color-tertiary', color);
  }


}
