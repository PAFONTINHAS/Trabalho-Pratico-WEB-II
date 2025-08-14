import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Solicitar } from "./pages/cliente/solicitar/solicitar";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Solicitar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('MM-TADS');
}
