import { Input, Output, EventEmitter, Component, TemplateRef, ViewChild } from '@angular/core';
import { Todo } from '../todo';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { CustomValidators } from './custom-validators';
import {MatSelectModule} from '@angular/material/select';

@Component({
  selector: 'add-modal',
  templateUrl: './add-modal.component.html'
})
export class AddModalComponent {
  public todoForm: FormGroup;

  closeResult?: string;

  @Input() todo!: Todo;
  @Output() addTodo = new EventEmitter<Todo>();
  @ViewChild('addModal') addModal!: TemplateRef<any>;

  // set the structure and validators for the todo form
  constructor(private modalService: NgbModal, public fb: FormBuilder) {
    this.todoForm = this.fb.group({
      id: '',
      what: ['', [Validators.required, Validators.maxLength(255)]],
      category: ['', [Validators.required, Validators.maxLength(100)]],
      who: ['', [Validators.required]],
      whence: [null, [CustomValidators.todoDate]],
      done: ['N', [Validators.required, Validators.maxLength(1), CustomValidators.yOrN]]
    });

    this.todoForm.get('who')?.setValue("Ana");

  }

  // reset the reactive form
  resetForm(): void {
    this.todoForm.reset();
  }

  // expose controls for reactive validation
  get todoFormControl() {
    return this.todoForm.controls;
  }

  // handle the add modal
  public open(addModal: any) {

    // open the modal and handle the result
    this.modalService.open(addModal).result.then((result) => {
      this.closeResult = result;

      // make sure the Todo form is valid
      if(this.todoForm.valid) {
        // pass the todo values to the parent module to add
        this.addTodo.emit(this.todoForm.value);

        // reset the form for the next add action
        this.resetForm();
      }
    }, (reason) => {
      // edit modal dismissed
      this.closeResult = reason;

      // reset the form if cancel button pressed
      if(reason == 'No add')
        this.todoForm.reset();
    });
  }
}
