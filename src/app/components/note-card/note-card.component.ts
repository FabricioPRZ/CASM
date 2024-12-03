import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-note-card',
  standalone: true,
  imports: [],
  templateUrl: './note-card.component.html',
  styleUrl: './note-card.component.scss'
})
export class NoteCardComponent {
  @Input() title: string = '';
  @Input() description: string = '' ;
  @Output() share = new EventEmitter<{ title: string, description: string }>();

  shareNote(): void {
    this.share.emit({ title: this.title, description: this.description });
  }
}
