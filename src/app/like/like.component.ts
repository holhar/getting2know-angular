import { Component, Input } from '@angular/core';

@Component({
  selector: 'like',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.css']
})
export class LikeComponent {
  @Input('likesCount') likesCount: number = 0;
  @Input('isActive') isActive: boolean = false;

  onClick() {
    this.isActive = !this.isActive;
    if (!this.isActive) {
      this.likesCount--;
    } else {
      this.likesCount++;
    }
  }

}
