import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: false,
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent {
  @Input() title!: string;
  @Input() image?: string;
  @Input() id!: number;
  @Input() subtitle?: string;
  @Input() images?: string[] = [];
  @Input() details!: { label: string; value: string | number }[];
}
