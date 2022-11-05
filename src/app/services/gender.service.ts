import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Gender} from "../models/api/gender-model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GenderService {

  private genderApi ="https://localhost:44357/";

  constructor(private httpClient: HttpClient) { }

  getGenders():Observable<Gender[]> {
   return this.httpClient.get<Gender[]>(this.genderApi+"Genders");
  }
}
