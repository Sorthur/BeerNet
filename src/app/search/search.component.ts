import { AfterViewChecked, Component, DoCheck, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, DoCheck {
    activeTab: number = 0;
    constructor(private route: ActivatedRoute) { }

    ngDoCheck(): void {
        this.route.url.subscribe(() => {
            let childUrlName = this.route.snapshot.firstChild?.url[0].path;
            console.log(`childUrlName: ${childUrlName}`)
            if (childUrlName === "beer") {
                this.activeTab = 0;
            } else if (childUrlName === "brewery") {
                this.activeTab = 1;
            } else {
                this.activeTab = 2;
            }
        }).unsubscribe();
    }

    ngOnInit(): void { }
}