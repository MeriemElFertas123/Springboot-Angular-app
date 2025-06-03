import { Component } from '@angular/core';
import { SideBarAdminComponent } from "../../side-bar-admin/side-bar-admin.component";
import { Enseignant } from '../../../model/model';
import { ActivatedRoute, Router } from '@angular/router';
import { EnseignantService } from '../../../service/enseignant.service';
import { error } from 'console';
import { CommonModule, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-enseignant-edit',
  imports: [CommonModule,SideBarAdminComponent,NgIf,FormsModule],
  templateUrl: './enseignant-edit.component.html',
  styleUrl: './enseignant-edit.component.css'
})
export class EnseignantEditComponent {

  // Pour stocker l'enseignant à modifier
  enseignant:any={
        nom: '',
        prenom: '',
        email: '',
        telephone:'',
        password:'',
        genre:'',
        specialite: '',
        image: null
  }

  constructor(
    private route:ActivatedRoute,
    private enseignantService:EnseignantService,
    private router:Router
  ){}

  hidePassword=true;

  imageFile:File | null = null ; // Pour stocker le fichier image sélectionné 
  onFileSelected(event:any):void{
    this.imageFile=event.target.files[0] as File;
  }


  ngOnInit():void{
    const id=this.route.snapshot.paramMap.get('id');
    if(id){
      this.loadEnseignant(+id);
    }
  }

  loadEnseignant(id:number):void{
    this.enseignantService.getEnseignantById(id).subscribe({
      next:(enseignant) => {
        this.enseignant=enseignant;
      },
      error:(err)=>{
        console.error("Erreur lors du chargement de l'enseignant");
      }
    });
  }


  onSubmit(){
    if(this.enseignant.id){
      const formData: FormData = new FormData();
      formData.append('nom', this.enseignant.nom);
      formData.append('prenom', this.enseignant.prenom);
      formData.append('email', this.enseignant.email);
      formData.append('password', this.enseignant.password);
      formData.append('telephone', this.enseignant.telephone);
      formData.append('genre', this.enseignant.genre);
      formData.append('specialite', this.enseignant.specialite);

      if(this.imageFile){
        formData.append('image',this.imageFile)
      }
      else if (this.enseignant.image) {
        formData.append('image', this.enseignant.image);
      }


     this.enseignantService.updateEnseignant(this.enseignant.id,formData).subscribe({
      next:()=>{
        this.router.navigate(['/enseignants/list']);
      },
      error: (err) => {
        console.error('Erreur lors de la mise à jour de l\'enseignant',err);
      }
     })
    }
  }

}
 