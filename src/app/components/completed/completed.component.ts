import { Component, OnInit } from '@angular/core';
import { iTodosUsers } from '../../interfaces/todos-users';
import { TodosvcService } from '../../services/todosvc.service';
import { UsersvcService } from '../../services/usersvc.service';
import { iUser } from '../../interfaces/user';

@Component({
  selector: 'app-completed',
  templateUrl: './completed.component.html',
  styleUrl: './completed.component.scss',
})
export class CompletedComponent implements OnInit {
  todosUtenti: iTodosUsers[] = [];

  constructor(
    private todoService: TodosvcService,
    private userService: UsersvcService
  ) {}
  ngOnInit(): void {
    const users: iUser[] = this.userService.getUsers();
    this.todosUtenti = this.todoService
      .getTodosUsers(users)
      .filter((element) => element.todo.completed === true);
  }
}
