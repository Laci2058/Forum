import { Injectable } from '@angular/core';
import { MOCK_CATEGORIES } from '../mock-data/mock-data';
import { delay, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor() { }

  getMockCategories(){
    return of(MOCK_CATEGORIES).pipe(delay(20));
  }
}
