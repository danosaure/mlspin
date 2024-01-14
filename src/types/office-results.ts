import AgentType from '../types/agent';
import OfficeType from '../types/office';

type OfficeResults = {
  agents: Record<string, AgentType>;
  offices: Record<string, OfficeType>;
};

export default OfficeResults;
