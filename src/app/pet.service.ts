import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, map, tap } from "rxjs/operators";
import { MessageService } from "./message.service";
import { Pet } from "./pet";

@Injectable()
export class PetService {
  private petsUrl = "api/pets";

  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  getPets(): Observable<Pet[]> {
    return this.http.get<Pet[]>(this.petsUrl).pipe(
      tap(_ => this.log("fetched pets")),
      catchError(this.handleError<Pet[]>("getPets", []))
    );
  }

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string): void {
    this.messageService.add(`PetService: §{message}`);
  }
}
