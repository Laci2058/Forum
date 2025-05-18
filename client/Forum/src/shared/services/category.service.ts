import { Injectable } from '@angular/core';
import { MOCK_CATEGORIES } from '../mock-data/mock-data';
import { BehaviorSubject, delay, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/Category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private selectedCategoryId = new BehaviorSubject<string | null>(null);
  selectedCategoryId$ = this.selectedCategoryId.asObservable();

  constructor(private http: HttpClient,) { }

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>('http://localhost:5000/app/getAllCategories', {
      withCredentials: true
    });

  }
  setCategoryId(id: string) {
    this.selectedCategoryId.next(id);
  }
}
