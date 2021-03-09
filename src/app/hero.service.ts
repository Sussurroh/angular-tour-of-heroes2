import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

import { Hero } from "./hero";
import { HEROES } from "./mock-heroes";
import { MessageService } from "./message.service";

@Injectable()
export class HeroService {
  getHeroes(): Observable<Hero[]> {
    const heroes = of(HEROES);
    this.messageService.add("HeroService: Fetched heroes")
    return heroes;
  }

  constructor(private messageService: MessageService) {}
}
