import { Component, OnInit } from '@angular/core';
import { iTodo } from '../../interfaces/todo';
import { TodosvcService } from '../../services/todosvc.service';
import { UsersvcService } from '../../services/usersvc.service';
import { iTodosUsers } from '../../interfaces/todos-users';
import { iUser } from '../../interfaces/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  todosUtenti: iTodosUsers[] = [];

  constructor(
    private todoService: TodosvcService,
    private userService: UsersvcService
  ) {}

  ngOnInit(): void {
    const users: iUser[] = this.userService.getUsers();
    this.todosUtenti = this.todoService.getTodosUsers(users);
  }

  toggleTodo(todo: iTodo): void {
    todo.completed = !todo.completed;
    this.todoService.updateTodo(todo);
  }
}
