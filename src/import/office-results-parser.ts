import parse, { LineType } from './line-parser';
import OfficeResults from '../types/office-results';

export default (lines: string): OfficeResults  => lines.split('\n').map(parse).reduce(
    (cache, lineData: LineType) => {
        if (lineData.agent.id) {
            return {
                agents: {
                    ...cache.agents,
                    [lineData.agent.id]: lineData.agent,
                },
                offices: {
                    ...cache.offices,
                    [lineData.office.id]: lineData.office,
                }
            };
        }
        return cache;
    },    
    {agents: {}, offices: {}}
);
