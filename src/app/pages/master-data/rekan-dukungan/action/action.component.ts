import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RulesSweetAlert } from 'src/app/@core/model/global-swal-model';
import { RekanDukunganModel } from 'src/app/@core/model/rekan-dukungan.model';
import { sweetAlert } from 'src/app/inheritComponent/helper/helper';
import { RekanDukunganService } from 'src/app/services/master-data/rekan-dukungann/rekan-dukungan.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss']
})
export class ActionComponentRekan implements OnInit {
  rekanData = new RekanDukunganModel();
  fileToUpload: File;
  image: string;
  filename: string;
  imgUrl = environment.APIIMAGE;

  constructor(
    private rekanDukunganService: RekanDukunganService,
    public dialogRef: MatDialogRef<ActionComponentRekan>,
    @Inject(MAT_DIALOG_DATA) public data: RekanDukunganModel
  ) { 
    if(data){
      this.rekanData = data;
    }
  }

  ngOnInit(): void {
  }

  submitData = () => {
    let validation = false;
    let text = '';
    if (!this.rekanData.name){
      validation = true;
      text = 'Nama harus diisi';
    }else if (!this.fileToUpload){
      validation = true;
      text = 'Logo harus diisi';
    }
    if (validation){
      const rulesAlert: RulesSweetAlert = {
        title: 'Failed',
        text,
        icon: 'error',
        showCancelButton: false
    };
      sweetAlert(rulesAlert);
      return;
    }
    const formData = new FormData();
    formData.append('file_logo', this.fileToUpload);
    formData.append('name', this.rekanData.name);
    if(this.rekanData.id){
      this.rekanDukunganService.Update(formData, this.rekanData.id).subscribe(
        (resp) => {
          if(resp){
            this.dialogRef.close('Mengubah data');
          }
        }
      );
    }else{
      this.rekanDukunganService.save(formData).subscribe(
        (resp) => {
          if(resp){
            this.dialogRef.close('Menambah data');
          }
        }
      );
    }
  }

  openFile = () => {
    document.getElementById('upload')!.click();
  }

  onFileChange(event: any): void {
    const reader = new FileReader();
    if (event.target.files.length > 0) {
      if (event.target.files && event.target.files[0]) {
        this.fileToUpload = event.target.files.item(0);
        this.filename = event.target.files[0].name;
        const [file] = event.target.files;
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.image = reader.result as string;
        };
      }
    }
  }
}
