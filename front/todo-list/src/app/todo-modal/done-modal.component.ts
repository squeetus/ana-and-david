import { Input, Output, EventEmitter, Component, TemplateRef, ViewChild } from '@angular/core';
import { Todo } from '../todo';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { CustomValidators } from './custom-validators';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'done-modal',
  templateUrl: './done-modal.component.html'
})
export class DoneModalComponent {
  // public todoForm: FormGroup;

  // closeResult?: string;

  @Input() todo!: Todo;
  @Output() doneTodo = new EventEmitter<Todo>();
  // @ViewChild('editModal') doneModal!: TemplateRef<any>;

  faEdit = faEdit;

  // set the structure and validators for the todo form
  constructor(private modalService: NgbModal, public fb: FormBuilder) {
    // this.todoForm = this.fb.group({
    //   id: '',
    //   done: ['N', [Validators.required, Validators.maxLength(1), CustomValidators.yOrN]]
    // });
  }

  // expose controls for reactive validation
  // get todoFormControl() {
  //   return this.todoForm.controls;
  // }

  public toggleDone() {
    console.log('boop', this);
    // this.doneTodo.emit(this.value);
  }

  // // handle the done modal
  // public open(editModal: any) {
  //
  //   // bind the current todo to the form
  //   this.todoForm.patchValue(this.todo);
  //
  //   // open the modal and handle the result
  //   this.modalService.open(editModal).result.then((result) => {
  //     this.closeResult = result;
  //
  //     // make sure the Todo form is valid
  //     if(this.todoForm.valid) {
  //       // pass the todo values to the parent module to done
  //       this.doneTodo.emit(this.todoForm.value);
  //     }
  //   }, (reason) => {
  //     // edit modal dismissed
  //     this.closeResult = reason;
  //   });
  // }
}
