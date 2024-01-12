import AgentRoleType from '../types/agent-role';
import AgentType from '../types/agent'

export default class Agent {
    id: string;
    email: string;
    name: string;
    phone: string;
    office: string;
    role: AgentRoleType;

    constructor(fields: AgentType) {
        this.id = fields.id;
        this.email = fields.email;
        this.name = fields.name;
        this.phone = fields.phone;
        this.office = fields.office;
        this.role = fields.role;
    }
}
