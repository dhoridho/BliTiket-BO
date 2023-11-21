import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-image-preview-wisata',
  templateUrl: './image-preview-wisata.component.html',
  styleUrls: ['./image-preview-wisata.component.scss']
})
export class ImagePreviewWisataComponent implements OnInit {
  imgPrev: any

  constructor(
    public dialogRef: MatDialogRef<ImagePreviewWisataComponent>,
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
