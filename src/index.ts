import { DomainRating } from './endpoints/DomainRating';

export class SiteExplorer {
    domainRating: DomainRating;

    constructor(token: string) {
        this.domainRating = new DomainRating(token);
    }
}
