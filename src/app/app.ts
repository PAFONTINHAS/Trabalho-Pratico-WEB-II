import { Component, signal, ElementRef, HostListener, QueryList, ViewChildren, OnInit, ApplicationConfig } from '@angular/core';
import { RouterOutlet, Router, RouterModule, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';

type TipoUsuarioVisual = 'cliente' | 'funcionario' | null;

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})


export class App {
  protected readonly title = signal('MM-TADS');
  openDropdown: string | null = null;
  
  mostrarNavbar: boolean = true;

  @ViewChildren('dropdownContainer') dropdownContainers!: QueryList<ElementRef>;

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const clickedInside = this.dropdownContainers.some(
      (ref) => ref.nativeElement.contains(event.target)
    );

    if (!clickedInside) {
      this.closeAllDropdowns();
    }
  }

  toggleDropdown(event: MouseEvent, dropdownName: string): void {
    event.stopPropagation();
    this.openDropdown = this.openDropdown === dropdownName ? null : dropdownName;
  }
  
  closeAllDropdowns(): void {
    this.openDropdown = null;
  }

  tipoUsuarioAtual: TipoUsuarioVisual = null;

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      const url = event.urlAfterRedirects;

      if (url.startsWith('/cliente')) {
        this.tipoUsuarioAtual = 'cliente';
      } else if (url.startsWith('/funcionario')) {
        this.tipoUsuarioAtual = 'funcionario';
      } else {
        this.tipoUsuarioAtual = null;
      }
    });
  }

   alternarVisualizacao() {
    if (this.tipoUsuarioAtual === 'cliente') {
      this.tipoUsuarioAtual = 'funcionario';
      this.router.navigate(['/funcionario']);
    } else if (this.tipoUsuarioAtual === 'funcionario') {
      this.tipoUsuarioAtual = 'cliente';
      this.router.navigate(['/cliente']);
    }
  }
}
