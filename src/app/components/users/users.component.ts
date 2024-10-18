import { Component, OnInit } from '@angular/core';
import { iTodosUsers } from '../../interfaces/todos-users';
import { TodosvcService } from '../../services/todosvc.service';
import { UsersvcService } from '../../services/usersvc.service';
import { iUser } from '../../interfaces/user';
import { iTodo } from '../../interfaces/todo';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent implements OnInit {
  todosUtenti: iTodosUsers[] = [];
  utentiUnici: iUser[] = [];
  search: string = '';

  constructor(
    private todoService: TodosvcService,
    private userService: UsersvcService
  ) {}
  ngOnInit(): void {
    const users: iUser[] = this.userService.getUsers();
    this.todosUtenti = this.todoService.getTodosUsers(users);
    this.utentiUnici = this.userService.getUniqueUsers(this.todosUtenti);
  }
  getFilteredUsers(): iUser[] {
    if (!this.search) {
      return this.utentiUnici;
    }
    const ricercaLowerCase = this.search.toLowerCase();
    return this.utentiUnici.filter(
      (user) =>
        user.firstName.toLowerCase().includes(ricercaLowerCase) ||
        user.lastName.toLowerCase().includes(ricercaLowerCase)
    );
  }
  getUserTasks(userId: number): iTodosUsers[] {
    return this.todosUtenti.filter((t) => t.user.id === userId);
  }
  toggleTodo(todo: iTodo): void {
    todo.completed = !todo.completed;
    this.todoService.updateTodo(todo);
  }
}
