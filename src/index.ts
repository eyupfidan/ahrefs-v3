import { DomainRating } from './endpoints/DomainRating';
import { BacklinkStats } from './endpoints/BacklinkStats';

export class SiteExplorer {
    domainRating: DomainRating;
    backlinkStats: BacklinkStats;

    constructor(token: string) {
        this.domainRating = new DomainRating(token);
        this.backlinkStats = new BacklinkStats(token);
    }
}
