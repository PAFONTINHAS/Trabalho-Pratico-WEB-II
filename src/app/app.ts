import { Component, signal, ElementRef, HostListener, QueryList, ViewChildren, OnInit } from '@angular/core'; // Removi ApplicationConfig que não era usado
import { RouterOutlet, Router, RouterModule, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';
import { LoginService } from './services/login-service/login';
import { Usuario } from './shared/models/usuario.model';

type TipoUsuarioVisual = 'cliente' | 'funcionario' | null;

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit { 
  protected readonly title = signal('MM-TADS');
  openDropdown: string | null = null;
  
  mostrarNavbar: boolean = true;
  saudacao: string = ''; 

  constructor(private loginService: LoginService, private router: Router) {}

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

  get usuarioLogado(): Usuario | null {
    return this.loginService.usuarioLogado;
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }

  temPermissao(...perfis: string[]): boolean {
    let usu = this.usuarioLogado;
    if (usu && perfis.length > 0) {
      for (let p of perfis) {
        if (usu.perfil.indexOf(p) != -1) {
          return true;
        }
      }
    }
    return false;
  }

  toggleDropdown(event: MouseEvent, dropdownName: string): void {
    event.stopPropagation();
    this.openDropdown = this.openDropdown === dropdownName ? null : dropdownName;
  }
  
  closeAllDropdowns(): void {
    this.openDropdown = null;
  }

  tipoUsuarioAtual: TipoUsuarioVisual = null;

  ngOnInit() {
    this.definirSaudacao(); 

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      const url = event.urlAfterRedirects;
    });
  }

  private definirSaudacao(): void {
    const hora = new Date().getHours();
    
    if (hora >= 5 && hora < 12) {
      this.saudacao = "Bom dia";
    } else if (hora >= 12 && hora < 18) {
      this.saudacao = "Boa tarde";
    } else {
      this.saudacao = "Boa noite";
    }
  }
}