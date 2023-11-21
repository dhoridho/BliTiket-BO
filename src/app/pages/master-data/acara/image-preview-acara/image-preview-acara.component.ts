import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-image-preview-acara',
  templateUrl: './image-preview-acara.component.html',
  styleUrls: ['./image-preview-acara.component.scss']
})
export class ImagePreviewAcaraComponent implements OnInit {
  imgPrev: any

  constructor(
    public dialogRef: MatDialogRef<ImagePreviewAcaraComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if(data){
      this.imgPrev = data;
    }
   }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close();
  }
}
