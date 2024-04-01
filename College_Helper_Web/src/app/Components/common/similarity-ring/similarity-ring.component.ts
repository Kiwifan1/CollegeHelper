import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-similarity-ring',
  templateUrl: './similarity-ring.component.html',
  styleUrl: './similarity-ring.component.scss',
})
export class SimilarityRingComponent implements OnInit {
  @Input() similarity!: number; // normalized from 0 to 1

  constructor() {}

  ngOnInit(): void {
    this.similarity = this.similarity * 100;
    this.similarity = Math.round(this.similarity * 100) / 100;
  }
}
