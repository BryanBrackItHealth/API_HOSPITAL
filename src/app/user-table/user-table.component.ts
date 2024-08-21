import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../user.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent implements OnInit {
  users: any[] = [];
  userForm: FormGroup;
  showForm: boolean = false;
  editingUser: any = null;
  displayedColumns: string[] = [ 'idDocumentType', 'documentNumber', 'firstName', 'lastName', 'birthDate', 'idGender', 'address', 'contactNumber', 'actions'];

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    public dialog: MatDialog
  ) {
    this.userForm = this.fb.group({
      patientID: [null],
      idDocumentType: [0],
      documentNumber: [''],
      firstName: [''],
      lastName: [''],
      birthDate: [''],
      idGender: [''],
      address: [''],
      contactNumber: ['']
    });
  }

  options: { value: number, viewValue: string }[] = [
    { value: 1, viewValue: 'Cedula de ciudadania' },
    { value: 2, viewValue: 'Cedula de extranjeria' },
    { value: 3, viewValue: 'Pasaporte' }
  ];

  optionsGender: { value: number, viewValue: string }[] = [
    { value: 1, viewValue: 'Masculino' },
    { value: 2, viewValue: 'Femenino' },
    { value: 2, viewValue: 'Otro' }
  ];

  ngOnInit(): void {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
    if (!this.showForm) {
      this.resetForm();
    }
  }

  editUser(user: any): void {
    this.editingUser = user;
    this.userForm.patchValue({
      patientID: user.patientID,
      idDocumentType: user.idDocumentType,
      documentNumber: user.documentNumber,
      firstName: user.firstName,
      lastName: user.lastName,
      birthDate: user.birthDate,
      idGender: user.idGender,
      address: user.address,
      contactNumber: user.contactNumber
    });
    this.showForm = true;
  }

  saveUser(): void {
    if (this.userForm.valid) {
      if (this.editingUser) {
        this.userService.updateUser(this.editingUser.patientID, this.userForm.value).subscribe(updatedUser => {
          const index = this.users.findIndex(user => user.patientID === updatedUser.patientID);
          if (index > -1) {
            this.users[index] = updatedUser;
          }
          this.resetForm();
          this.showForm = false;
        });
      } else {
        this.userService.addUser(this.userForm.value).subscribe(newUser => {
          this.users.push(newUser);
          this.resetForm();
          this.showForm = false;
        });
      }
    }
  }

  confirmDelete(user: any): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: { name: user.firstName }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteUser(user.patientID);
      }
    });
  }

  deleteUser(patientID: number): void {
    this.userService.deleteUser(patientID).subscribe(() => {
      this.users = this.users.filter(user => user.patientID !== patientID);
    });
  }

  resetForm(): void {
    this.userForm.reset();
    this.editingUser = null;
  }
}