import Agent from '../models/agent';
import Office from '../models/office';

type OfficeResults = {
  agents: Record<string, Agent>;
  offices: Record<string, Office>;
};

export default OfficeResults;
