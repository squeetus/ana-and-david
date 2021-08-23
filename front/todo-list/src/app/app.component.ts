import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Todo } from './todo';
import { Alert } from './alerts/alert';
import { TodoService } from './todo.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm }   from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Options } from '@angular-slider/ngx-slider';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TODO LIST';

  // allTodos will keep track of the master list
  public allTodos: Todo[] = [];
  // filteredTodos will always be a subset of allTodos
  public filteredTodos: Todo[] = [];

  // bind an observable for use with the alert component
  addAlert: Subject<Alert> = new Subject();

  /*
    ngx-slider options
  */
  // public minVal: number = 1900;
  // public maxVal: number = 2100;
  // sliderOptions: Options = {
  //   floor: this.minVal,
  //   ceil: this.maxVal,
  //   showTicks: true
  // };

  /*
    mat-table options
  */
  // configure mat-table column bindings
  public todoAttributes: string[] = ['What', 'Category', 'Whomst', 'Done?', 'Created'];
  // prepare the data source for mat-table
  public dataSource =  new MatTableDataSource<Todo>();
  // declare sorting functionality for the table rows
  @ViewChild(MatSort) sort: any;



  // inject a todo service into the module
  constructor(private todoService: TodoService) {}

  // get all todos on initialization of this module
  ngOnInit() {
    this.getTodos();
  }


  // load all todos from the todo service
  public getTodos(): void {
      this.todoService.getTodos().subscribe(
        (res: Todo[]) => {
          this.allTodos = res;
          this.filteredTodos = this.allTodos;

          // bind song data and sorting to the mat-table dataSource
          this.dataSource.data = this.filteredTodos;
          this.dataSource.sort = this.sort;

          // bind song date range to the slider and reset filter
          // const newOptions: Options = Object.assign({}, this.sliderOptions);
          // newOptions.floor = Math.min(...this.filteredSongs.map(song => +song.release_date.slice(0,4)));
          // newOptions.ceil = Math.max(...this.filteredSongs.map(song => +song.release_date.slice(0,4)));
          //
          // if(this.filteredSongs.length <= 2) {
          //   newOptions.disabled = true;
          //   newOptions.hideLimitLabels = true;
          //   newOptions.hidePointerLabels = true;
          // } else {
          //   newOptions.disabled = false;
          //   newOptions.hideLimitLabels = false;
          //   newOptions.hidePointerLabels = false;
          // // }
          //
          // this.sliderOptions = newOptions;
          // this.minVal = newOptions.floor;
          // this.maxVal = newOptions.ceil;


        },
        (err: HttpErrorResponse) => {
          console.warn(err.message);
          this.addAlert.next({
            type: 'danger',
            message: err.message,
          });
        }
      );
  }

  // pass a new todo for the todo service to add
  public addTodo(todo: Todo): void {
    this.todoService.addTodo(todo).subscribe(
      (res: any) => {
        console.log(res);
        this.addAlert.next({
          type: 'success',
          message: res.message,
        });
        this.getTodos();
      },
      (err: HttpErrorResponse) => {
        console.warn(err.message);
        this.addAlert.next({
          type: 'danger',
          message: err.message,
        });
      }
    );
  }

  // pass a song for the song service to update
  public updateTodo(todo: Todo): void {
    console.log(todo);
    this.todoService.markDone(todo).subscribe(
      (res: any) => {
        console.log(res);
        this.addAlert.next({
          type: 'success',
          message: res.message,
        });
        this.getTodos();
      },
      (err: HttpErrorResponse) => {
        console.warn(err.message);
        this.addAlert.next({
          type: 'danger',
          message: err.message,
        });
      }
    );
  }
  //
  // // limit the rate of fire for filter updates
  // public doFilter = this.throttle(() => this.filter());
  //
  // // filter the song table based on the release year
  // public filter(): void {
  //   this.filteredSongs = this.allSongs.filter((song) => {
  //     let year = +song.release_date.slice(0,4);
  //     return (year >= this.minVal && year <= this.maxVal) ? true : false;
  //   });
  //   this.dataSource.data = this.filteredSongs;
  // }
  //
  // // throttle a function so it fires at most 5 times a second
  // private throttle(func: any) {
  //   var lastTime = 0;
  //   return function () {
  //       var now = new Date().getTime();
  //       if (now - lastTime >= 200) {
  //           func();
  //           lastTime = now;
  //       }
  //   };
  // }

}
