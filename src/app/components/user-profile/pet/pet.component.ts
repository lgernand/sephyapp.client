import { Component, inject, Inject, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Pet } from '../../../models/pet';
import { PetService } from '../../../services/pet.service';
import { CommonModule } from '@angular/common';
import { FormControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-pet',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './pet.component.html',
  styleUrl: './pet.component.css'
})
export class PetComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  
  constructor(authService: AuthService, private petService: PetService) {

  }

  addPetForm = this.formBuilder.group({
    name: ['', Validators.required],
    dateOfBirth: [new Date(Date.now.toString()), Validators.required],
    gender: ['', Validators.required],
    species: ['', Validators.required],
    breed: ['', Validators.required]
  });

  pets: Pet[] = [];  

  ngOnInit(): void {
    this.petService.getPets().subscribe(response => {
      this.pets = response;
    });    
  }

  handleSubmit(): void {
    console.warn('submitting ' + this.addPetForm.value.name)
    let newPet: Pet = this.addPetForm.value as Pet;

    this.petService.createProfile(newPet).subscribe(() => {
      this.petService.getPets().subscribe(response => {
        this.pets = response;
        this.addPetForm.reset()
      })
    })
  }
}
