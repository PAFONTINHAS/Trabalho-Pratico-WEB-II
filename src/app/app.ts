import { Component, signal, ElementRef, HostListener, QueryList, ViewChildren } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('MM-TADS');

  openDropdown: string | null = null;

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
}
