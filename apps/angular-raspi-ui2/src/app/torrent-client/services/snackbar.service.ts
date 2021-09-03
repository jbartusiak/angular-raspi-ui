import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  constructor(private snakbar: MatSnackBar) {
  }

  show = (message: string, duration: number = 2000) => {
    this.snakbar.open(message, 'x', {duration});
  };
}
